"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmployeeCode = generateEmployeeCode;
async function generateEmployeeCode(prisma) {
    const year = new Date().getFullYear();
    const prefix = `EMP-${year}-`;
    const last = await prisma.userProfile.findFirst({
        where: { employeeCode: { startsWith: prefix } },
        orderBy: { employeeCode: 'desc' },
        select: { employeeCode: true },
    });
    const seq = last ? Number.parseInt(last.employeeCode.slice(prefix.length), 10) || 0 : 0;
    return `${prefix}${String(seq + 1).padStart(4, '0')}`;
}
//# sourceMappingURL=employee-code.js.map