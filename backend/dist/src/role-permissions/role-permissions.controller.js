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
exports.RolePermissionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_js_1 = require("../auth/guards/jwt-auth.guard.js");
const role_permissions_service_js_1 = require("./role-permissions.service.js");
const sync_role_permissions_dto_js_1 = require("./dto/sync-role-permissions.dto.js");
let RolePermissionsController = class RolePermissionsController {
    service;
    constructor(service) {
        this.service = service;
    }
    find(roleId) {
        return this.service.find(roleId);
    }
    sync(roleId, dto) {
        return this.service.sync(roleId, dto.permissionIds);
    }
};
exports.RolePermissionsController = RolePermissionsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Permissions du rôle' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Permissions du rôle' }),
    __param(0, (0, common_1.Param)('roleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RolePermissionsController.prototype, "find", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({ summary: 'Synchroniser les permissions du rôle' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Permissions synchronisées' }),
    __param(0, (0, common_1.Param)('roleId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sync_role_permissions_dto_js_1.SyncRolePermissionsDto]),
    __metadata("design:returntype", void 0)
], RolePermissionsController.prototype, "sync", null);
exports.RolePermissionsController = RolePermissionsController = __decorate([
    (0, swagger_1.ApiTags)('role-permissions'),
    (0, swagger_1.ApiCookieAuth)('token'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, common_1.Controller)('roles/:roleId/permissions'),
    __metadata("design:paramtypes", [role_permissions_service_js_1.RolePermissionsService])
], RolePermissionsController);
//# sourceMappingURL=role-permissions.controller.js.map