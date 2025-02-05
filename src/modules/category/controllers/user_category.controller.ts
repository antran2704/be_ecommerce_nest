import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiOkResponsePaginateDecorator } from "~/common/pagination/decorators/api-ok-response-paginate.decorator";
import { UserGetCategoryResponseDto } from "../dtos/services";
import { PaginationRequestPipe } from "~/common/request/pipes/pagination_request.pipe";
import {
  GetSuccessResponse,
  GetSuccessWithPaginationResponse,
} from "~/common/response/success.response";
import { UserCategoryService } from "../services/user_category.service";
import { PaginationSearchRequestDto } from "~/common/pagination/dtos";
import { ApiOkResponseDecorator } from "~/common/pagination/decorators/api-ok-response.decorator";

@Controller("categories")
@ApiTags("User.Category")
export class UserCategoryController {
  constructor(private readonly categoryService: UserCategoryService) {}

  // get categories
  @Get()
  @ApiOkResponsePaginateDecorator(UserGetCategoryResponseDto)
  async getCategories(
    @Query(PaginationRequestPipe) query: PaginationSearchRequestDto,
  ): Promise<GetSuccessWithPaginationResponse<UserGetCategoryResponseDto>> {
    const { data, pagination } =
      await this.categoryService.getCategories(query);

    return new GetSuccessWithPaginationResponse(data, pagination);
  }

  @Get("/:category_id/parents")
  @ApiOkResponseDecorator(UserGetCategoryResponseDto)
  async getParentCategories(
    @Param("category_id") id: string,
  ): Promise<GetSuccessResponse<UserGetCategoryResponseDto[]>> {
    const categories = await this.categoryService.getParentCategories(id);

    return new GetSuccessResponse(categories);
  }
}
