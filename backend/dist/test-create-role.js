"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./generated/prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
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
    const created = await client.role.create({
        data: { name: 'Role de verification', code: 'VERIF_TMP', description: 'temporaire' },
    });
    console.log('créé : id =', created.id, '| longueur =', created.id.length, '| code =', created.code);
    await client.role.delete({ where: { id: created.id } });
    console.log('supprimé :', created.code);
    await client.$disconnect();
}
main().catch((e) => {
    console.error('ERREUR', e.message);
    process.exit(1);
});
//# sourceMappingURL=test-create-role.js.map