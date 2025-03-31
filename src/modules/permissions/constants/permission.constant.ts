import { Permission } from "~/common/permissions/permission";
import {
  ENUM_PERMISSION,
  ENUM_PERMISSION_SUBJECT,
} from "../enums/permission.enum";
import { PermissionDictionary } from "~/common/permissions/permission.dictionary";
import { ENUM_PLATFORM_PERMISSION } from "../enums/platform.enum";

// Home Page Permission
const homePagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.ADMIN_DASHBOARD,
  ENUM_PERMISSION_SUBJECT.ADMIN_DASHBOARD,
);

homePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_DASHBOARD_VIEW,
  ENUM_PERMISSION.ADMIN_DASHBOARD_VIEW,
);

homePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_DASHBOARD_UPDATE,
  ENUM_PERMISSION.ADMIN_DASHBOARD_UPDATE,
);

// Admin Page Permission
const adminPagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.ADMIN_STAFF,
  ENUM_PERMISSION_SUBJECT.ADMIN_STAFF,
);

adminPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_STAFF_VIEW,
  ENUM_PERMISSION.ADMIN_STAFF_VIEW,
);

adminPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_STAFF_CREATE,
  ENUM_PERMISSION.ADMIN_STAFF_CREATE,
);

adminPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_STAFF_UPDATE,
  ENUM_PERMISSION.ADMIN_STAFF_UPDATE,
);

adminPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_STAFF_DELETE,
  ENUM_PERMISSION.ADMIN_STAFF_DELETE,
);

// User Page Permission
const userPagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.ADMIN_USER,
  ENUM_PERMISSION_SUBJECT.ADMIN_USER,
);

userPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_USER_VIEW,
  ENUM_PERMISSION.ADMIN_USER_VIEW,
);

userPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_USER_CREATE,
  ENUM_PERMISSION.ADMIN_USER_CREATE,
);

userPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_USER_UPDATE,
  ENUM_PERMISSION.ADMIN_USER_UPDATE,
);

userPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_USER_DELETE,
  ENUM_PERMISSION.ADMIN_USER_DELETE,
);

// Group Role Page Permission
const groupRolePagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.ADMIN_GROUP_ROLE,
  ENUM_PERMISSION_SUBJECT.ADMIN_GROUP_ROLE,
);

groupRolePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_GROUP_ROLE_VIEW,
  ENUM_PERMISSION.ADMIN_GROUP_ROLE_VIEW,
);

groupRolePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_GROUP_ROLE_CREATE,
  ENUM_PERMISSION.ADMIN_GROUP_ROLE_CREATE,
);

groupRolePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_GROUP_ROLE_UPDATE,
  ENUM_PERMISSION.ADMIN_GROUP_ROLE_UPDATE,
);

groupRolePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_GROUP_ROLE_DELETE,
  ENUM_PERMISSION.ADMIN_GROUP_ROLE_DELETE,
);

// Role Page Permission
const rolePagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.ADMIN_ROLE,
  ENUM_PERMISSION_SUBJECT.ADMIN_ROLE,
);

rolePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_ROLE_VIEW,
  ENUM_PERMISSION.ADMIN_ROLE_VIEW,
);

rolePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_ROLE_CREATE,
  ENUM_PERMISSION.ADMIN_ROLE_CREATE,
);

rolePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_ROLE_UPDATE,
  ENUM_PERMISSION.ADMIN_ROLE_UPDATE,
);

rolePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_ROLE_DELETE,
  ENUM_PERMISSION.ADMIN_ROLE_DELETE,
);

// Category Page Permission
const categoryPagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.ADMIN_CATEGORY,
  ENUM_PERMISSION_SUBJECT.ADMIN_CATEGORY,
);

categoryPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_CATEGORY_VIEW,
  ENUM_PERMISSION.ADMIN_CATEGORY_VIEW,
);

categoryPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_CATEGORY_CREATE,
  ENUM_PERMISSION.ADMIN_CATEGORY_CREATE,
);

categoryPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_CATEGORY_UPDATE,
  ENUM_PERMISSION.ADMIN_CATEGORY_UPDATE,
);

categoryPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_CATEGORY_DELETE,
  ENUM_PERMISSION.ADMIN_CATEGORY_DELETE,
);

// Variant Type Page Permission
const variantTypePagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.ADMIN_VARIANT_TYPE,
  ENUM_PERMISSION_SUBJECT.ADMIN_VARIANT_TYPE,
);

variantTypePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_VARIANT_TYPE_VIEW,
  ENUM_PERMISSION.ADMIN_VARIANT_TYPE_VIEW,
);

variantTypePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_VARIANT_TYPE_CREATE,
  ENUM_PERMISSION.ADMIN_VARIANT_TYPE_CREATE,
);

variantTypePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_VARIANT_TYPE_UPDATE,
  ENUM_PERMISSION.ADMIN_VARIANT_TYPE_UPDATE,
);

variantTypePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_VARIANT_TYPE_DELETE,
  ENUM_PERMISSION.ADMIN_VARIANT_TYPE_DELETE,
);

// Variant Type Value Page Permission
const variantTypeValuePagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.ADMIN_VARIANT_TYPE_VALUE,
  ENUM_PERMISSION_SUBJECT.ADMIN_VARIANT_TYPE_VALUE,
);

variantTypeValuePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_VARIANT_TYPE_VALUE_VIEW,
  ENUM_PERMISSION.ADMIN_VARIANT_TYPE_VALUE_VIEW,
);

variantTypeValuePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_VARIANT_TYPE_VALUE_CREATE,
  ENUM_PERMISSION.ADMIN_VARIANT_TYPE_VALUE_CREATE,
);

variantTypeValuePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_VARIANT_TYPE_VALUE_UPDATE,
  ENUM_PERMISSION.ADMIN_VARIANT_TYPE_VALUE_UPDATE,
);

variantTypeValuePagePermission.addChild(
  ENUM_PERMISSION.ADMIN_VARIANT_TYPE_VALUE_DELETE,
  ENUM_PERMISSION.ADMIN_VARIANT_TYPE_VALUE_DELETE,
);

// Product Page Permission
const productPagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.ADMIN_PRODUCT,
  ENUM_PERMISSION_SUBJECT.ADMIN_PRODUCT,
);

productPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_PRODUCT_VIEW,
  ENUM_PERMISSION.ADMIN_PRODUCT_VIEW,
);

productPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_PRODUCT_CREATE,
  ENUM_PERMISSION.ADMIN_PRODUCT_CREATE,
);

productPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_PRODUCT_UPDATE,
  ENUM_PERMISSION.ADMIN_PRODUCT_UPDATE,
);

productPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_PRODUCT_DELETE,
  ENUM_PERMISSION.ADMIN_PRODUCT_DELETE,
);

// Varaint Product Page Permission
const variantProductPagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.ADMIN_VARIANT_PRODUCT,
  ENUM_PERMISSION_SUBJECT.ADMIN_VARIANT_PRODUCT,
);

variantProductPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_VIEW,
  ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_VIEW,
);

variantProductPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_CREATE,
  ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_CREATE,
);

variantProductPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_UPDATE,
  ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_UPDATE,
);

variantProductPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_DELETE,
  ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_DELETE,
);

// Product Inventory Page Permission
const productInventoryPagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.ADMIN_PRODUCT_INVENTORY,
  ENUM_PERMISSION_SUBJECT.ADMIN_PRODUCT_INVENTORY,
);

productInventoryPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_PRODUCT_INVENTORY_VIEW,
  ENUM_PERMISSION.ADMIN_PRODUCT_INVENTORY_VIEW,
);

productInventoryPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_PRODUCT_INVENTORY_CREATE,
  ENUM_PERMISSION.ADMIN_PRODUCT_INVENTORY_CREATE,
);

productInventoryPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_PRODUCT_INVENTORY_UPDATE,
  ENUM_PERMISSION.ADMIN_PRODUCT_INVENTORY_UPDATE,
);

productInventoryPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_PRODUCT_INVENTORY_DELETE,
  ENUM_PERMISSION.ADMIN_PRODUCT_INVENTORY_DELETE,
);

// Variant Product Inventory Page Permission
const variantProductInventoryPagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.ADMIN_VARIANT_PRODUCT_INVENTORY,
  ENUM_PERMISSION_SUBJECT.ADMIN_VARIANT_PRODUCT_INVENTORY,
);

variantProductInventoryPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_INVENTORY_VIEW,
  ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_INVENTORY_VIEW,
);

variantProductInventoryPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_INVENTORY_CREATE,
  ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_INVENTORY_CREATE,
);

variantProductInventoryPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_INVENTORY_UPDATE,
  ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_INVENTORY_UPDATE,
);

variantProductInventoryPagePermission.addChild(
  ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_INVENTORY_DELETE,
  ENUM_PERMISSION.ADMIN_VARIANT_PRODUCT_INVENTORY_DELETE,
);

// Cart Permission
const cartPermission = new Permission(
  ENUM_PERMISSION_SUBJECT.ADMIN_CART,
  ENUM_PERMISSION_SUBJECT.ADMIN_CART,
);

cartPermission.addChild(
  ENUM_PERMISSION.ADMIN_CART_VIEW,
  ENUM_PERMISSION.ADMIN_CART_VIEW,
);

cartPermission.addChild(
  ENUM_PERMISSION.ADMIN_CART_CREATE,
  ENUM_PERMISSION.ADMIN_CART_CREATE,
);

cartPermission.addChild(
  ENUM_PERMISSION.ADMIN_CART_UPDATE,
  ENUM_PERMISSION.ADMIN_CART_UPDATE,
);

cartPermission.addChild(
  ENUM_PERMISSION.ADMIN_CART_DELETE,
  ENUM_PERMISSION.ADMIN_CART_DELETE,
);

export function setPermissionDictionary() {
  // Home Page
  PermissionDictionary.addPermission(
    ENUM_PLATFORM_PERMISSION.ADMIN,
    homePagePermission,
  );

  // Admin Page
  PermissionDictionary.addPermission(
    ENUM_PLATFORM_PERMISSION.ADMIN,
    adminPagePermission,
  );

  // User Page
  PermissionDictionary.addPermission(
    ENUM_PLATFORM_PERMISSION.ADMIN,
    userPagePermission,
  );

  // Group Role Page
  PermissionDictionary.addPermission(
    ENUM_PLATFORM_PERMISSION.ADMIN,
    groupRolePagePermission,
  );

  // Role Page
  PermissionDictionary.addPermission(
    ENUM_PLATFORM_PERMISSION.ADMIN,
    rolePagePermission,
  );

  // Category Page
  PermissionDictionary.addPermission(
    ENUM_PLATFORM_PERMISSION.ADMIN,
    categoryPagePermission,
  );

  // Variant Type Page
  PermissionDictionary.addPermission(
    ENUM_PLATFORM_PERMISSION.ADMIN,
    variantTypePagePermission,
  );

  // Variant Type Value Page
  PermissionDictionary.addPermission(
    ENUM_PLATFORM_PERMISSION.ADMIN,
    variantTypeValuePagePermission,
  );

  // Product Page
  PermissionDictionary.addPermission(
    ENUM_PLATFORM_PERMISSION.ADMIN,
    productPagePermission,
  );

  // Variant Product Page
  PermissionDictionary.addPermission(
    ENUM_PLATFORM_PERMISSION.ADMIN,
    variantProductPagePermission,
  );

  // Product Inventory Page
  PermissionDictionary.addPermission(
    ENUM_PLATFORM_PERMISSION.ADMIN,
    productInventoryPagePermission,
  );

  // Variant Product Inventory Page
  PermissionDictionary.addPermission(
    ENUM_PLATFORM_PERMISSION.ADMIN,
    variantProductInventoryPagePermission,
  );

  // Cart
  PermissionDictionary.addPermission(
    ENUM_PLATFORM_PERMISSION.ADMIN,
    cartPermission,
  );
}
