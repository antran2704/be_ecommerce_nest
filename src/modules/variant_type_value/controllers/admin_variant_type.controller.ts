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

import { AdminVariantTypeValueService } from "../services/admin_variant_type.service";
import {
  AdminCreateVariantTypeValueRequestDto,
  AdminGetVariantTypeValueResponseDto,
  AdminGetVariantTypeValuesRequestDto,
  AdminUpdateVariantTypeValueRequestDto,
} from "../dtos/services";

@ApiBearerAuth()
@Controller("admin/variant-type-values")
@ApiTags("Admin.VariantTypeValue")
export class AdminVariantTypeValueController {
  constructor(
    private readonly variantValueService: AdminVariantTypeValueService,
  ) {}

  @Get()
  @Permissions([ENUM_PERMISSION.ADMIN_VARIANT_TYPE_VALUE_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponsePaginateDecorator(AdminGetVariantTypeValueResponseDto)
  async getVariantTypes(
    @Query(PaginationRequestPipe) query: AdminGetVariantTypeValuesRequestDto,
  ): Promise<
    GetSuccessWithPaginationResponse<AdminGetVariantTypeValueResponseDto>
  > {
    const { data, pagination } =
      await this.variantValueService.getVariantValues(query);

    return new GetSuccessWithPaginationResponse(data, pagination);
  }

  @Get("/:variant_value_id")
  @Permissions([ENUM_PERMISSION.ADMIN_VARIANT_TYPE_VALUE_VIEW])
  @UseGuards(PermissionGuard)
  @ApiOkResponseDecorator(AdminGetVariantTypeValueResponseDto)
  async getUser(
    @Param("variant_value_id") id: string,
  ): Promise<AdminGetVariantTypeValueResponseDto> {
    const data = await this.variantValueService.getVariantValueById(id);

    return data;
  }

  @Post()
  @ApiResponse({
    status: 201,
    example: new CreateSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_VARIANT_TYPE_VALUE_CREATE])
  @UseGuards(PermissionGuard)
  async createUser(
    @Body() payload: AdminCreateVariantTypeValueRequestDto,
  ): Promise<CreateSuccessResponse> {
    await this.variantValueService.createVariantValue(payload);
    return new CreateSuccessResponse();
  }

  @Patch("/:variant_value_id")
  @ApiResponse({
    status: 201,
    example: new UpdatedSuccessResponse(),
  })
  @Permissions([ENUM_PERMISSION.ADMIN_VARIANT_TYPE_VALUE_UPDATE])
  @UseGuards(PermissionGuard)
  async updateAdmin(
    @Param("variant_value_id") id: string,
    @Body() payload: AdminUpdateVariantTypeValueRequestDto,
  ) {
    await this.variantValueService.updateVariantValue(id, payload);

    return new UpdatedSuccessResponse();
  }

  @Delete("/:variant_value_id")
  @Permissions([ENUM_PERMISSION.ADMIN_VARIANT_TYPE_VALUE_DELETE])
  @UseGuards(PermissionGuard)
  @ApiResponse({
    status: 201,
    example: new DeletedSuccessResponse(),
  })
  async deleteUser(
    @Param("variant_value_id") id: string,
  ): Promise<DeletedSuccessResponse> {
    await this.variantValueService.deleteVariantValue(id);
    return new DeletedSuccessResponse();
  }
}
