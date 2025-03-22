import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Permissions } from "~/common/auth/decorators/permission.decorator";
import { ENUM_PERMISSION } from "~/modules/permissions/enums/permission.enum";
import { PermissionGuard } from "~/common/auth/guards";
import { ApiOkResponsePaginateDecorator } from "~/common/pagination/decorators/api-ok-response-paginate.decorator";
import { PaginationRequestPipe } from "~/common/request/pipes/pagination_request.pipe";
import {
  CreateSuccessResponse,
  DeletedSuccessResponse,
  GetSuccessResponse,
  GetSuccessWithPaginationResponse,
  UpdatedSuccessResponse,
} from "~/common/response/success.response";
import { ApiOkResponseDecorator } from "~/common/pagination/decorators/api-ok-response.decorator";
import {
  AdminCreateVariantTypeRequestDto,
  AdminGetVariantTypeResponseDto,
  AdminUpdateVariantTypeRequestDto,
} from "../dtos/services";
import { PaginationSearchRequestDto } from "~/common/pagination/dtos";
import { AdminVariantTypeService } from "../services/admin_variant_type.service";

@ApiBearerAuth()
@Controller("admin/variant-types")
@ApiTags("Admin.VariantType")
export class AdminVariantTypeController {
  constructor(private readonly variantTypeService: AdminVariantTypeService) {}

  @Get()
  @Permissions([ENUM_PERMISSION.VARIANT_TYPE_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponsePaginateDecorator(AdminGetVariantTypeResponseDto)
  async getVariantTypes(
    @Query(PaginationRequestPipe) query: PaginationSearchRequestDto,
  ): Promise<GetSuccessWithPaginationResponse<AdminGetVariantTypeResponseDto>> {
    const { data, pagination } =
      await this.variantTypeService.getVariantTypes(query);

    return new GetSuccessWithPaginationResponse(data, pagination);
  }

  @Get("/:variant_type_id")
  @Permissions([ENUM_PERMISSION.VARIANT_TYPE_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponseDecorator(AdminGetVariantTypeResponseDto)
  async getUser(
    @Param("variant_type_id") id: string,
  ): Promise<GetSuccessResponse<AdminGetVariantTypeResponseDto>> {
    const data = await this.variantTypeService.getVariantTypeById(id);

    return new GetSuccessResponse(data);
  }

  @Post()
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.VARIANT_TYPE_CREATE])
  @UseGuards(PermissionGuard)
  async createUser(
    @Body() payload: AdminCreateVariantTypeRequestDto,
  ): Promise<CreateSuccessResponse> {
    await this.variantTypeService.createVariantType(payload);
    return new CreateSuccessResponse();
  }

  @Patch("/:variant_type_id")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.VARIANT_TYPE_UPDATE])
  @UseGuards(PermissionGuard)
  async updateAdmin(
    @Param("variant_type_id") id: string,
    @Body() payload: AdminUpdateVariantTypeRequestDto,
  ) {
    await this.variantTypeService.updateVariantType(id, payload);

    return new UpdatedSuccessResponse();
  }

  @Delete("/:variant_type_id")
  @Permissions([ENUM_PERMISSION.VARIANT_TYPE_DELETE])
  @UseGuards(PermissionGuard)
  @ApiResponse({
    status: 201,
    example: new DeletedSuccessResponse(),
  })
  async deleteUser(
    @Param("variant_type_id") id: string,
  ): Promise<DeletedSuccessResponse> {
    await this.variantTypeService.deleteVariantType(id);
    return new DeletedSuccessResponse();
  }
}
