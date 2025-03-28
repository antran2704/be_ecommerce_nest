import { Module } from "@nestjs/common";

import { AdminModule } from "../../modules/admin/admin.module";
import { AdminController } from "~/modules/admin/controller/admin.controller";
import { PermissionModule } from "~/modules/permissions/permission.module";
import { PermissionController } from "~/modules/permissions/controllers/permission.controller";
import { GroupRoleModule } from "~/modules/group_role/group_role.module";
import { GroupRoleController } from "~/modules/group_role/controllers/group_role.controller";
import { RoleController } from "~/modules/role/controllers/role.controller";
import { RoleModule } from "~/modules/role/role.module";
import { UserController } from "~/modules/user/controller/user.controller";
import { UserModule } from "~/modules/user/user.module";
import { UserMeController } from "~/modules/user/controller/user_me.controller";
import { AdminMeController } from "~/modules/admin/controller/admin_me.controller";
import { AdminCategoryModule } from "~/modules/category/admin_category.module";
import { AdminCategoryController } from "~/modules/category/controllers/admin_category.controller";
import { AdminVariantTypeModule } from "~/modules/variant_type/admin_variant_type.module";
import { AdminVariantTypeController } from "~/modules/variant_type/controllers/admin_variant_type.controller";
import { AdminVariantTypeValueModule } from "~/modules/variant_type_value/admin_variant_type.module";
import { AdminVariantTypeValueController } from "~/modules/variant_type_value/controllers/admin_variant_type.controller";
import { AdminProductModule } from "~/modules/product/admin_product.module";
import { AdminProductController } from "~/modules/product/controllers/admin_product.controller";
import { AdminInventoryModule } from "~/modules/inventory/admin_inventory.module";
import { AdminProductInventoryController } from "~/modules/inventory/controllers/admin_product_inventory.controller";
import { AdminVariantProductModule } from "~/modules/variant_product/admin_variant_product.module";
import { AdminVariantProductInventoryController } from "~/modules/inventory/controllers/admin_variant_product_inventory.controller";
import { AdminVariantProductController } from "~/modules/variant_product/controllers/admin_variant_product.controller";
import { AdminCartController } from "~/modules/cart/controllers/admin_cart.controller";
import { UserCartController } from "~/modules/cart/controllers/user_cart.controller";
import { CartModule } from "~/modules/cart/cart.module";
import { CartItemModule } from "~/modules/cart/cart_item.module";
import { UserCartItemController } from "~/modules/cart/controllers/user_cart_item.controller";

@Module({
  controllers: [
    AdminMeController,
    AdminController,
    UserMeController,
    UserController,
    PermissionController,
    GroupRoleController,
    RoleController,
    AdminCategoryController,
    AdminVariantTypeController,
    AdminVariantTypeValueController,
    AdminProductController,
    AdminVariantProductController,
    AdminProductInventoryController,
    AdminVariantProductInventoryController,
    AdminCartController,
    UserCartController,
    UserCartItemController,
  ],
  imports: [
    AdminModule,
    UserModule,
    PermissionModule,
    GroupRoleModule,
    RoleModule,
    AdminCategoryModule,
    AdminVariantTypeModule,
    AdminVariantTypeValueModule,
    AdminProductModule,
    AdminInventoryModule,
    AdminVariantProductModule,
    CartModule,
    CartItemModule,
  ],
})
export class InternalRouteModule {}
