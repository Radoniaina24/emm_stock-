import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { PrismaService } from '../prisma/prisma.service.js';
import { generateEmployeeCode } from './employee-code.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import {
  toAuthUserDto,
  userWithProfileSelect,
} from './user.mapper.js';

const AVATARS_DIR = join(process.cwd(), 'uploads', 'avatars');
const MAX_SIZE = 2 * 1024 * 1024;
const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const existingEmail = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingEmail) throw new ConflictException('Cet email est déjà utilisé');

    const existingUsername = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (existingUsername) throw new ConflictException('Ce nom d\'utilisateur est déjà utilisé');

    let employeeCode = dto.employeeCode?.trim() ?? '';
    if (employeeCode) {
      const existingCode = await this.prisma.userProfile.findUnique({
        where: { employeeCode },
      });
      if (existingCode) throw new ConflictException('Ce matricule est déjà utilisé');
    } else {
      for (let attempt = 0; attempt < 10; attempt++) {
        employeeCode = await generateEmployeeCode(this.prisma);
        const taken = await this.prisma.userProfile.findUnique({
          where: { employeeCode },
        });
        if (!taken) break;
      }
    }

    const role = await this.prisma.role.findUnique({ where: { id: dto.roleId } });
    if (!role) throw new BadRequestException('Rôle introuvable');

    const department = await this.prisma.department.findUnique({ where: { id: dto.departmentId } });
    if (!department) throw new BadRequestException('Département introuvable');

    const jobTitle = await this.prisma.jobTitle.findUnique({ where: { id: dto.jobTitleId } });
    if (!jobTitle) throw new BadRequestException('Poste introuvable');

    if (dto.warehouseId) {
      const warehouse = await this.prisma.warehouse.findUnique({ where: { id: dto.warehouseId } });
      if (!warehouse) throw new BadRequestException('Entrepôt introuvable');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        password: hashed,
        roleId: dto.roleId,
        profile: {
          create: {
            employeeCode,
            firstName: dto.firstName,
            lastName: dto.lastName,
            displayName: `${dto.firstName} ${dto.lastName}`,
            departmentId: dto.departmentId,
            jobTitleId: dto.jobTitleId,
            warehouseId: dto.warehouseId ?? null,
          },
        },
      },
      select: userWithProfileSelect,
    });

    return toAuthUserDto(user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: userWithProfileSelect,
      orderBy: { createdAt: 'desc' },
    });
    return users.map((u) => toAuthUserDto(u));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userWithProfileSelect,
    });
    if (!user) throw new NotFoundException('Utilisateur introuvable');
    return toAuthUserDto(user);
  }

  async nextEmployeeCode() {
    return { employeeCode: await generateEmployeeCode(this.prisma) };
  }

  async remove(id: string, currentUserId: string) {
    if (id === currentUserId) {
      throw new BadRequestException('Vous ne pouvez pas supprimer votre propre compte');
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: { select: { profilePhoto: true } },
        role: { select: { code: true, isSystem: true } },
      },
    });
    if (!user) throw new NotFoundException('Utilisateur introuvable');

    if (user.role?.code === 'SUPER_ADMIN') {
      throw new BadRequestException('Impossible de supprimer un super administrateur');
    }

    const [{ _count: entries }, { _count: exits }, { _count: inventories }] = await Promise.all([
      this.prisma.entry.count({ where: { userId: id } }),
      this.prisma.exit.count({ where: { userId: id } }),
      this.prisma.inventory.count({ where: { userId: id } }),
    ]);

    if (entries > 0 || exits > 0 || inventories > 0) {
      const details = [
        entries > 0 ? `${entries} entrée(s)` : null,
        exits > 0 ? `${exits} sortie(s)` : null,
        inventories > 0 ? `${inventories} inventaire(s)` : null,
      ]
        .filter(Boolean)
        .join(', ');
      throw new ConflictException(
        `Impossible de supprimer cet utilisateur : il possède des opérations de stock liées (${details}). Désactivez-le plutôt.`,
      );
    }

    this.removeAvatarFile(user.profile?.profilePhoto);
    await this.prisma.user.delete({ where: { id } });

    return { success: true, id };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: userWithProfileSelect,
    });
    if (!user) throw new NotFoundException('Utilisateur introuvable');
    return toAuthUserDto(user);
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const existing = await this.prisma.userProfile.findUnique({
      where: { userId },
    });
    if (!existing) throw new NotFoundException('Profil introuvable');

    const emptyToNull = (value: string | undefined) => {
      if (value === undefined) return undefined;
      const trimmed = value.trim();
      return trimmed.length ? trimmed : null;
    };

    const required = (value: string | undefined, fallback: string) => {
      if (value === undefined) return undefined;
      const trimmed = value.trim();
      return trimmed.length ? trimmed : fallback;
    };

    const nextFirstName = required(dto.firstName, existing.firstName);
    const nextLastName = required(dto.lastName, existing.lastName);

    let displayName: string;
    if (dto.displayName !== undefined) {
      displayName =
        required(dto.displayName, existing.displayName) ?? existing.displayName;
    } else if (dto.firstName !== undefined || dto.lastName !== undefined) {
      displayName = `${nextFirstName} ${nextLastName}`.trim();
    } else {
      displayName = existing.displayName;
    }

    await this.prisma.userProfile.update({
      where: { userId },
      data: {
        firstName: nextFirstName,
        lastName: nextLastName,
        displayName,
        phone: emptyToNull(dto.phone),
        secondaryPhone: emptyToNull(dto.secondaryPhone),
        birthDate:
          dto.birthDate === undefined
            ? undefined
            : dto.birthDate.trim()
              ? new Date(dto.birthDate)
              : null,
        gender: emptyToNull(dto.gender),
        address: emptyToNull(dto.address),
        city: emptyToNull(dto.city),
        region: emptyToNull(dto.region),
        country: emptyToNull(dto.country),
        postalCode: emptyToNull(dto.postalCode),
        jobTitleId: emptyToNull(dto.jobTitle),
        departmentId: emptyToNull(dto.department),
        signature: emptyToNull(dto.signature),
      },
    });

    return this.getMe(userId);
  }

  async uploadAvatar(userId: string, file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Aucun fichier fourni');
    if (!ALLOWED_MIME.has(file.mimetype)) {
      throw new BadRequestException('Formats acceptés : JPG, PNG, WebP');
    }
    if (file.size > MAX_SIZE) {
      throw new BadRequestException('Fichier trop volumineux (max 2 Mo)');
    }

    if (!existsSync(AVATARS_DIR)) {
      mkdirSync(AVATARS_DIR, { recursive: true });
    }

    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
      select: { profilePhoto: true },
    });
    if (!profile) throw new NotFoundException('Profil introuvable');

    const filename = `${userId}-${Date.now()}.jpg`;
    writeFileSync(join(AVATARS_DIR, filename), file.buffer);

    const avatarUrl = `/uploads/avatars/${filename}`;
    this.removeAvatarFile(profile.profilePhoto);

    await this.prisma.userProfile.update({
      where: { userId },
      data: { profilePhoto: avatarUrl },
    });

    return this.getMe(userId);
  }

  async deleteAvatar(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
      select: { profilePhoto: true },
    });
    if (!profile) throw new NotFoundException('Profil introuvable');

    this.removeAvatarFile(profile.profilePhoto);

    await this.prisma.userProfile.update({
      where: { userId },
      data: { profilePhoto: null },
    });

    return this.getMe(userId);
  }

  private removeAvatarFile(avatarPath: string | null | undefined) {
    if (!avatarPath?.startsWith('/uploads/avatars/')) return;
    const filename = avatarPath.replace('/uploads/avatars/', '');
    const full = join(AVATARS_DIR, filename);
    if (existsSync(full)) {
      try {
        unlinkSync(full);
      } catch {
        // ignore
      }
    }
  }
}
