"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./generated/prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const employee_code_1 = require("./src/users/employee-code");
async function main() {
    const client = new client_1.PrismaClient({
        adapter: new adapter_mariadb_1.PrismaMariaDb({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'gestion_stock',
        }),
    });
    const code1 = await (0, employee_code_1.generateEmployeeCode)(client);
    console.log('premier matricule :', code1);
    const created = await client.userProfile.create({
        data: {
            id: 'tmp-' + Date.now(),
            userId: ':tmp-user',
            employeeCode: code1,
            firstName: 'Test',
            lastName: 'Auto',
            displayName: 'Test Auto',
        },
    });
    console.log('inséré :', created.employeeCode);
    const code2 = await (0, employee_code_1.generateEmployeeCode)(client);
    console.log('suivant matricule :', code2);
    await client.userProfile.delete({ where: { id: created.id } });
    console.log('nettoyé');
    await client.$disconnect();
}
main().catch((e) => {
    console.error('ERREUR', e.message);
    process.exit(1);
});
//# sourceMappingURL=test-emp-code.js.map