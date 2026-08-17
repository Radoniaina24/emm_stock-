import { PrismaService } from '../prisma/prisma.service.js';

export async function generateEmployeeCode(
  prisma: PrismaService,
): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `EMP-${year}-`;

  const last = await prisma.userProfile.findFirst({
    where: { employeeCode: { startsWith: prefix } },
    orderBy: { employeeCode: 'desc' },
    select: { employeeCode: true },
  });

  const seq = last
    ? Number.parseInt(last.employeeCode.slice(prefix.length), 10) || 0
    : 0;

  return `${prefix}${String(seq + 1).padStart(4, '0')}`;
}
