import "dotenv/config"
import { join } from "path"
import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import type { NestExpressApplication } from "@nestjs/platform-express"
import cookieParser from "cookie-parser"
import { AppModule } from "./app.module.js"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.setGlobalPrefix("api")
  app.useStaticAssets(join(process.cwd(), "uploads"), { prefix: "/uploads" })
  app.use(cookieParser())
  app.enableCors({ origin: "http://localhost:5173", credentials: true })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  const swaggerConfig = new DocumentBuilder()
    .setTitle("StockFlow API")
    .setDescription("API de gestion de stock — documentation interactive")
    .setVersion("1.0")
    .addCookieAuth("token", {
      type: "apiKey",
      in: "cookie",
      name: "token",
      description: "JWT httpOnly défini par /auth/login ou /auth/register",
    })
    .addTag("auth", "Authentification (cookie JWT)")
    .addTag("users", "Profil utilisateur et avatar")
    .addTag("app", "Endpoints généraux")
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup("api/docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      withCredentials: true,
    },
    customSiteTitle: "StockFlow API Docs",
  })

  const port = process.env.PORT ?? 3000
  await app.listen(port)
  console.log(`Swagger: http://localhost:${port}/api/docs`)
}
bootstrap()
