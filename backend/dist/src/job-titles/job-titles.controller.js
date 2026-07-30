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
exports.JobTitlesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_js_1 = require("../auth/guards/jwt-auth.guard.js");
const job_titles_service_js_1 = require("./job-titles.service.js");
const create_job_title_dto_js_1 = require("./dto/create-job-title.dto.js");
const update_job_title_dto_js_1 = require("./dto/update-job-title.dto.js");
let JobTitlesController = class JobTitlesController {
    jobTitles;
    constructor(jobTitles) {
        this.jobTitles = jobTitles;
    }
    create(dto) {
        return this.jobTitles.create(dto);
    }
    findAll() {
        return this.jobTitles.findAll();
    }
    findOne(id) {
        return this.jobTitles.findOne(id);
    }
    update(id, dto) {
        return this.jobTitles.update(id, dto);
    }
    remove(id) {
        return this.jobTitles.remove(id);
    }
};
exports.JobTitlesController = JobTitlesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Créer un titre/fonction' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Titre créé' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_title_dto_js_1.CreateJobTitleDto]),
    __metadata("design:returntype", void 0)
], JobTitlesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Liste des titres/fonctions' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Liste des titres' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JobTitlesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Détail d\'un titre' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Titre trouvé' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobTitlesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Modifier un titre' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Titre modifié' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_job_title_dto_js_1.UpdateJobTitleDto]),
    __metadata("design:returntype", void 0)
], JobTitlesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Supprimer un titre' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Titre supprimé' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobTitlesController.prototype, "remove", null);
exports.JobTitlesController = JobTitlesController = __decorate([
    (0, swagger_1.ApiTags)('job-titles'),
    (0, swagger_1.ApiCookieAuth)('token'),
    (0, common_1.UseGuards)(jwt_auth_guard_js_1.JwtAuthGuard),
    (0, common_1.Controller)('job-titles'),
    __metadata("design:paramtypes", [job_titles_service_js_1.JobTitlesService])
], JobTitlesController);
//# sourceMappingURL=job-titles.controller.js.map