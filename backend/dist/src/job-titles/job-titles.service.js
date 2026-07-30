"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobTitlesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let JobTitlesService = class JobTitlesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.jobTitle.findUnique({
            where: { code: dto.code },
        });
        if (existing)
            throw new common_1.ConflictException('Ce code titre existe déjà');
        return this.prisma.jobTitle.create({ data: dto });
    }
    async findAll() {
        return this.prisma.jobTitle.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const jobTitle = await this.prisma.jobTitle.findUnique({
            where: { id },
        });
        if (!jobTitle)
            throw new common_1.NotFoundException('Titre introuvable');
        return jobTitle;
    }
    async update(id, dto) {
        const jobTitle = await this.prisma.jobTitle.findUnique({
            where: { id },
        });
        if (!jobTitle)
            throw new common_1.NotFoundException('Titre introuvable');
        if (dto.code && dto.code !== jobTitle.code) {
            const existing = await this.prisma.jobTitle.findUnique({
                where: { code: dto.code },
            });
            if (existing)
                throw new common_1.ConflictException('Ce code titre existe déjà');
        }
        return this.prisma.jobTitle.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const jobTitle = await this.prisma.jobTitle.findUnique({
            where: { id },
        });
        if (!jobTitle)
            throw new common_1.NotFoundException('Titre introuvable');
        await this.prisma.jobTitle.delete({ where: { id } });
    }
};
exports.JobTitlesService = JobTitlesService;
exports.JobTitlesService = JobTitlesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], JobTitlesService);
//# sourceMappingURL=job-titles.service.js.map