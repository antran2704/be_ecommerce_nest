import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiProperty,
  ApiResponse,
  ApiResponseProperty,
} from "@nestjs/swagger";

import { AdminService } from "../services/admin.service";
import { JwtAuthGuard } from "src/common/auth/guards/jwt-auth.guard";
import { CreateAdminDto } from "../dtos/create_admin.dto";
import { CreateSuperAdminDto } from "../dtos/create_super_admin.dto";
import {
  CreateSuccessResponse,
  GetSuccessResponse,
} from "src/common/response/success.response";
import { GetAdminReponseDto } from "../dtos/get_admin_response.dto";

@ApiBearerAuth()
@Controller({
  version: "1",
  path: "admin",
})
export class AdminController {
  constructor(private readonly userService: AdminService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    example: new GetSuccessResponse<GetAdminReponseDto[]>([
      {
        email: "admin@gmail.com",
        name: "admin",
        isAdmin: true,
        isActive: true,
      },
    ]),
  })
  async getUsers(@Request() req) {
    return await this.userService.getAdmins();
  }

  @Post()
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  async createAdmin(@Body() payload: CreateAdminDto) {
    return await this.userService.createUser(payload);
  }

  @Post("/super-admin")
  async createSuperAdmin(@Body() payload: CreateSuperAdminDto) {
    return await this.userService.createSuperUser(payload);
  }
}
