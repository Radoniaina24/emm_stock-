"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobTitlesModule = void 0;
const common_1 = require("@nestjs/common");
const job_titles_controller_js_1 = require("./job-titles.controller.js");
const job_titles_service_js_1 = require("./job-titles.service.js");
let JobTitlesModule = class JobTitlesModule {
};
exports.JobTitlesModule = JobTitlesModule;
exports.JobTitlesModule = JobTitlesModule = __decorate([
    (0, common_1.Module)({
        controllers: [job_titles_controller_js_1.JobTitlesController],
        providers: [job_titles_service_js_1.JobTitlesService],
    })
], JobTitlesModule);
//# sourceMappingURL=job-titles.module.js.map