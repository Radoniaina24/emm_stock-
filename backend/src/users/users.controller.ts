import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger"
import { memoryStorage } from "multer"
import { CurrentUser } from "../common/decorators/current-user.decorator.js"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard.js"
import { UpdateProfileDto } from "./dto/update-profile.dto.js"
import { UsersService } from "./users.service.js"

@ApiTags("users")
@ApiCookieAuth("token")
@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get("me")
  @ApiOperation({ summary: "Profil complet (user + user_profiles)" })
  @ApiOkResponse({ description: "Utilisateur authentifié avec profil" })
  @ApiUnauthorizedResponse({ description: "Non authentifié" })
  getMe(@CurrentUser("id") userId: string) {
    return this.users.getMe(userId)
  }

  @Patch("me/profile")
  @ApiOperation({ summary: "Mettre à jour les informations personnelles" })
  @ApiBody({ type: UpdateProfileDto })
  @ApiOkResponse({ description: "Profil mis à jour" })
  updateProfile(
    @CurrentUser("id") userId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.users.updateProfile(userId, dto)
  }

  @Post("me/avatar")
  @ApiOperation({ summary: "Uploader / remplacer la photo de profil" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
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
  })
  @ApiOkResponse({ description: "Profil mis à jour avec la nouvelle photo" })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  uploadAvatar(
    @CurrentUser("id") userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.users.uploadAvatar(userId, file)
  }

  @Delete("me/avatar")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Supprimer la photo de profil" })
  @ApiOkResponse({ description: "Photo supprimée" })
  deleteAvatar(@CurrentUser("id") userId: string) {
    return this.users.deleteAvatar(userId)
  }
}
