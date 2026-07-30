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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehousesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_js_1 = require("../auth/guards/jwt-auth.guard.js");
const warehouses_service_js_1 = require("./warehouses.service.js");
const create_warehouse_dto_js_1 = require("./dto/create-warehouse.dto.js");
const update_warehouse_dto_js_1 = require("./dto/update-warehouse.dto.js");
let WarehousesController = class WarehousesController {
    warehouses;
    constructor(warehouses) {
        this.warehouses = warehouses;
    }
    create(dto) {
        return this.warehouses.create(dto);
    }
    findAll() {
        return this.warehouses.findAll();
    }
    findOne(id) {
        return this.warehouses.findOne(id);
    }
    update(id, dto) {
        return this.warehouses.update(id, dto);
    }
    remove(id) {
        return this.warehouses.remove(id);
    }
};
exports.WarehousesController = WarehousesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un entrepôt' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Entrepôt créé' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_warehouse_dto_js_1.CreateWarehouseDto]),
    __metadata("design:returntype", void 0)
], WarehousesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des entrepôts' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Liste des entrepôts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WarehousesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Détail d\'un entrepôt' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Entrepôt trouvé' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WarehousesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Modifier un entrepôt' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Entrepôt modifié' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_warehouse_dto_js_1.UpdateWarehouseDto]),
    __metadata("design:returntype", void 0)
], WarehousesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un entrepôt' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Entrepôt supprimé' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WarehousesController.prototype, "remove", null);
exports.WarehousesController = WarehousesController = __decorate([
    (0, swagger_1.ApiTags)('warehouses'),
    (0, swagger_1.ApiCookieAuth)('token'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, common_1.Controller)('warehouses'),
    __metadata("design:paramtypes", [warehouses_service_js_1.WarehousesService])
], WarehousesController);
//# sourceMappingURL=warehouses.controller.js.map