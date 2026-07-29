"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRoleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_role_dto_js_1 = require("./create-role.dto.js");
class UpdateRoleDto extends (0, swagger_1.PartialType)(create_role_dto_js_1.CreateRoleDto) {
}
exports.UpdateRoleDto = UpdateRoleDto;
//# sourceMappingURL=update-role.dto.js.map