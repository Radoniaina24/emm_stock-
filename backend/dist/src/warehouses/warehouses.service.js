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
exports.WarehousesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let WarehousesService = class WarehousesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.warehouse.create({ data: dto });
    }
    async findAll() {
        return this.prisma.warehouse.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const warehouse = await this.prisma.warehouse.findUnique({
            where: { id },
            include: { _count: { select: { zones: true, stocks: true } } },
        });
        if (!warehouse)
            throw new common_1.NotFoundException('Entrepôt introuvable');
        return warehouse;
    }
    async update(id, dto) {
        const warehouse = await this.prisma.warehouse.findUnique({
            where: { id },
        });
        if (!warehouse)
            throw new common_1.NotFoundException('Entrepôt introuvable');
        return this.prisma.warehouse.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const warehouse = await this.prisma.warehouse.findUnique({
            where: { id },
            include: { _count: { select: { zones: true, stocks: true, entries: true, exits: true } } },
        });
        if (!warehouse)
            throw new common_1.NotFoundException('Entrepôt introuvable');
        if (warehouse._count.zones > 0 || warehouse._count.stocks > 0 ||
            warehouse._count.entries > 0 || warehouse._count.exits > 0) {
            throw new common_1.BadRequestException('Impossible de supprimer un entrepôt avec des zones, stocks, entrées ou sorties associés');
        }
        await this.prisma.warehouse.delete({ where: { id } });
    }
};
exports.WarehousesService = WarehousesService;
exports.WarehousesService = WarehousesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], WarehousesService);
//# sourceMappingURL=warehouses.service.js.map