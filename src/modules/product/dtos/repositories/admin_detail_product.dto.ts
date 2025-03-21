import { ProductEntity } from "../../entities/product.entity";
import { IAdminOptionProduct } from "../../interfaces/admin_option_product.interface";

export default class AdminDetailProductDto extends ProductEntity {
  options: IAdminOptionProduct[];
}
