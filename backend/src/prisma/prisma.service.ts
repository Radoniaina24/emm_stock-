import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from "@nestjs/common"
import { PrismaClient } from "../../generated/prisma/client.js"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"

function parseDatabaseUrl(url: string) {
  const parsed = new URL(url)
  return {
    host: parsed.hostname,
    port: parsed.port ? Number(parsed.port) : 3306,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname.replace(/^\//, "") || "gestion_stock",
  }
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name)

  constructor() {
    const connection = parseDatabaseUrl(
      process.env.DATABASE_URL ?? "mysql://root@localhost:3306/gestion_stock",
    )
    const adapter = new PrismaMariaDb({
      ...connection,
      allowPublicKeyRetrieval: true,
    })
    super({ adapter })
  }

  async onModuleInit() {
    await this.$connect()
    this.logger.log("Connected to database")
  }

  async onModuleDestroy() {
    await this.$disconnect()
    this.logger.log("Disconnected from database")
  }
}
