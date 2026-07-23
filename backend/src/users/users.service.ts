import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs"
import { join } from "path"
import { PrismaService } from "../prisma/prisma.service.js"
import { UpdateProfileDto } from "./dto/update-profile.dto.js"
import { toAuthUserDto, userWithProfileSelect } from "./user.mapper.js"

const AVATARS_DIR = join(process.cwd(), "uploads", "avatars")
const MAX_SIZE = 2 * 1024 * 1024
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"])

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: userWithProfileSelect,
    })
    if (!user) throw new NotFoundException("Utilisateur introuvable")
    return toAuthUserDto(user)
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const existing = await this.prisma.userProfile.findUnique({
      where: { userId },
    })
    if (!existing) throw new NotFoundException("Profil introuvable")

    const emptyToNull = (value: string | undefined) => {
      if (value === undefined) return undefined
      const trimmed = value.trim()
      return trimmed.length ? trimmed : null
    }

    const required = (value: string | undefined, fallback: string) => {
      if (value === undefined) return undefined
      const trimmed = value.trim()
      return trimmed.length ? trimmed : fallback
    }

    await this.prisma.userProfile.update({
      where: { userId },
      data: {
        firstName: required(dto.firstName, existing.firstName),
        lastName: required(dto.lastName, existing.lastName),
        displayName: required(dto.displayName, existing.displayName),
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
        jobTitle: emptyToNull(dto.jobTitle),
        department: emptyToNull(dto.department),
        signature: emptyToNull(dto.signature),
      },
    })

    return this.getMe(userId)
  }

  async uploadAvatar(userId: string, file: Express.Multer.File) {
    if (!file) throw new BadRequestException("Aucun fichier fourni")
    if (!ALLOWED_MIME.has(file.mimetype)) {
      throw new BadRequestException("Formats acceptés : JPG, PNG, WebP")
    }
    if (file.size > MAX_SIZE) {
      throw new BadRequestException("Fichier trop volumineux (max 2 Mo)")
    }

    if (!existsSync(AVATARS_DIR)) {
      mkdirSync(AVATARS_DIR, { recursive: true })
    }

    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
      select: { profilePhoto: true },
    })
    if (!profile) throw new NotFoundException("Profil introuvable")

    const filename = `${userId}-${Date.now()}.jpg`
    writeFileSync(join(AVATARS_DIR, filename), file.buffer)

    const avatarUrl = `/uploads/avatars/${filename}`
    this.removeAvatarFile(profile.profilePhoto)

    await this.prisma.userProfile.update({
      where: { userId },
      data: { profilePhoto: avatarUrl },
    })

    return this.getMe(userId)
  }

  async deleteAvatar(userId: string) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { userId },
      select: { profilePhoto: true },
    })
    if (!profile) throw new NotFoundException("Profil introuvable")

    this.removeAvatarFile(profile.profilePhoto)

    await this.prisma.userProfile.update({
      where: { userId },
      data: { profilePhoto: null },
    })

    return this.getMe(userId)
  }

  private removeAvatarFile(avatarPath: string | null | undefined) {
    if (!avatarPath?.startsWith("/uploads/avatars/")) return
    const filename = avatarPath.replace("/uploads/avatars/", "")
    const full = join(AVATARS_DIR, filename)
    if (existsSync(full)) {
      try {
        unlinkSync(full)
      } catch {
        // ignore
      }
    }
  }
}
