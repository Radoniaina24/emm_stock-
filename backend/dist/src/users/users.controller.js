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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const current_user_decorator_js_1 = require("../common/decorators/current-user.decorator.js");
const jwt_auth_guard_js_1 = require("../auth/guards/jwt-auth.guard.js");
const update_profile_dto_js_1 = require("./dto/update-profile.dto.js");
const users_service_js_1 = require("./users.service.js");
let UsersController = class UsersController {
    users;
    constructor(users) {
        this.users = users;
    }
    getMe(userId) {
        return this.users.getMe(userId);
    }
    updateProfile(userId, dto) {
        return this.users.updateProfile(userId, dto);
    }
    uploadAvatar(userId, file) {
        return this.users.uploadAvatar(userId, file);
    }
    deleteAvatar(userId) {
        return this.users.deleteAvatar(userId);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)("me"),
    (0, swagger_1.ApiOperation)({ summary: "Profil complet (user + user_profiles)" }),
    (0, swagger_1.ApiOkResponse)({ description: "Utilisateur authentifié avec profil" }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: "Non authentifié" }),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMe", null);
__decorate([
    (0, common_1.Patch)("me/profile"),
    (0, swagger_1.ApiOperation)({ summary: "Mettre à jour les informations personnelles" }),
    (0, swagger_1.ApiBody)({ type: update_profile_dto_js_1.UpdateProfileDto }),
    (0, swagger_1.ApiOkResponse)({ description: "Profil mis à jour" }),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_profile_dto_js_1.UpdateProfileDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)("me/avatar"),
    (0, swagger_1.ApiOperation)({ summary: "Uploader / remplacer la photo de profil" }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            required: ["file"],
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                    description: "Image JPG, PNG ou WebP (max 2 Mo)",
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({ description: "Profil mis à jour avec la nouvelle photo" }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: 2 * 1024 * 1024 },
    })),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)("id")),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "uploadAvatar", null);
__decorate([
    (0, common_1.Delete)("me/avatar"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: "Supprimer la photo de profil" }),
    (0, swagger_1.ApiOkResponse)({ description: "Photo supprimée" }),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteAvatar", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)("users"),
    (0, swagger_1.ApiCookieAuth)("token"),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_js_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map