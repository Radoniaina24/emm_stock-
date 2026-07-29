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
exports.PermissionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_js_1 = require("../auth/guards/jwt-auth.guard.js");
const create_permission_dto_js_1 = require("./dto/create-permission.dto.js");
const update_permission_dto_js_1 = require("./dto/update-permission.dto.js");
const permissions_service_js_1 = require("./permissions.service.js");
let PermissionsController = class PermissionsController {
    permissions;
    constructor(permissions) {
        this.permissions = permissions;
    }
    create(dto) {
        return this.permissions.create(dto);
    }
    findAll() {
        return this.permissions.findAll();
    }
    findOne(id) {
        return this.permissions.findOne(id);
    }
    update(id, dto) {
        return this.permissions.update(id, dto);
    }
    remove(id) {
        return this.permissions.remove(id);
    }
};
exports.PermissionsController = PermissionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer une permission' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Permission créée' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_permission_dto_js_1.CreatePermissionDto]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des permissions' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Liste des permissions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Détail d\'une permission' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Permission trouvée' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Modifier une permission' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Permission modifiée' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_permission_dto_js_1.UpdatePermissionDto]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer une permission' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Permission supprimée' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PermissionsController.prototype, "remove", null);
exports.PermissionsController = PermissionsController = __decorate([
    (0, swagger_1.ApiTags)('permissions'),
    (0, swagger_1.ApiCookieAuth)('token'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, common_1.Controller)('permissions'),
    __metadata("design:paramtypes", [permissions_service_js_1.PermissionsService])
], PermissionsController);
//# sourceMappingURL=permissions.controller.js.map