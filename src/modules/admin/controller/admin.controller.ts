import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiResponse,
} from "@nestjs/swagger";

import { AdminService } from "../services/admin.service";
import { JwtAuthGuard } from "src/common/auth/guards/jwt-auth.guard";
import { CreateAdminDto } from "../dtos/create_admin.dto";
import { CreateSuperAdminDto } from "../dtos/create_super_admin.dto";
import { CreateSuccessResponse } from "src/common/response/success.response";
import { GetAdminReponseDto } from "../dtos/get_admin_response.dto";
import { ApiOkResponsePaginateDecorator } from "src/common/pagination/decorators/api-ok-response-paginate.decorator";
import PaginationRequestDto from "src/common/pagination/dtos/pagination_request.dto";
import { PaginationRequestPipe } from "src/common/request/pipes/pagination_request.pipe";
import PaginationSearchRequestDto from "src/common/pagination/dtos/pagination_search_request.dto";

@ApiBearerAuth()
@Controller({
  version: "1",
  path: "admins",
})
export class AdminController {
  constructor(private readonly userService: AdminService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  @ApiOkResponsePaginateDecorator(GetAdminReponseDto)
  async getUsers(@Query(PaginationRequestPipe) query: PaginationSearchRequestDto) {
    return await this.userService.getAdmins(query);
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
