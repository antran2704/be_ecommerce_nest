import { Permission } from "~/common/permissions/permission";
import {
  ENUM_PERMISSION,
  ENUM_PERMISSION_SUBJECT,
} from "../enums/permission.enum";
import { PermissionDictionary } from "~/common/permissions/permission.dictionary";
import { ENUM_PLATFORM_PERMISSION } from "../enums/platform.enum";

// Home Page Permission
const homePagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.HOME,
  ENUM_PERMISSION_SUBJECT.HOME,
);

homePagePermission.addChild(
  ENUM_PERMISSION.HOME_VIEW,
  ENUM_PERMISSION.HOME_VIEW,
);

homePagePermission.addChild(
  ENUM_PERMISSION.HOME_UPDATE,
  ENUM_PERMISSION.HOME_UPDATE,
);

// Admin Page Permission
const adminPagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.STAFF,
  ENUM_PERMISSION_SUBJECT.STAFF,
);

adminPagePermission.addChild(
  ENUM_PERMISSION.STAFF_VIEW,
  ENUM_PERMISSION.STAFF_VIEW,
);

adminPagePermission.addChild(
  ENUM_PERMISSION.STAFF_CREATE,
  ENUM_PERMISSION.STAFF_CREATE,
);

adminPagePermission.addChild(
  ENUM_PERMISSION.STAFF_UPDATE,
  ENUM_PERMISSION.STAFF_UPDATE,
);

adminPagePermission.addChild(
  ENUM_PERMISSION.STAFF_DELETE,
  ENUM_PERMISSION.STAFF_DELETE,
);

// User Page Permission
const userPagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.USER,
  ENUM_PERMISSION_SUBJECT.USER,
);

userPagePermission.addChild(
  ENUM_PERMISSION.USER_VIEW,
  ENUM_PERMISSION.USER_VIEW,
);

userPagePermission.addChild(
  ENUM_PERMISSION.USER_CREATE,
  ENUM_PERMISSION.USER_CREATE,
);

userPagePermission.addChild(
  ENUM_PERMISSION.USER_UPDATE,
  ENUM_PERMISSION.USER_UPDATE,
);

userPagePermission.addChild(
  ENUM_PERMISSION.USER_DELETE,
  ENUM_PERMISSION.USER_DELETE,
);

// Group Role Page Permission
const groupRolePagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.GROUP_ROLE,
  ENUM_PERMISSION_SUBJECT.GROUP_ROLE,
);

groupRolePagePermission.addChild(
  ENUM_PERMISSION.GROUP_ROLE_VIEW,
  ENUM_PERMISSION.GROUP_ROLE_VIEW,
);

groupRolePagePermission.addChild(
  ENUM_PERMISSION.GROUP_ROLE_CREATE,
  ENUM_PERMISSION.GROUP_ROLE_CREATE,
);

groupRolePagePermission.addChild(
  ENUM_PERMISSION.GROUP_ROLE_UPDATE,
  ENUM_PERMISSION.GROUP_ROLE_UPDATE,
);

groupRolePagePermission.addChild(
  ENUM_PERMISSION.GROUP_ROLE_DELETE,
  ENUM_PERMISSION.GROUP_ROLE_DELETE,
);

// Role Page Permission
const rolePagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.ROLE,
  ENUM_PERMISSION_SUBJECT.ROLE,
);

rolePagePermission.addChild(
  ENUM_PERMISSION.ROLE_VIEW,
  ENUM_PERMISSION.ROLE_VIEW,
);

rolePagePermission.addChild(
  ENUM_PERMISSION.ROLE_CREATE,
  ENUM_PERMISSION.ROLE_CREATE,
);

rolePagePermission.addChild(
  ENUM_PERMISSION.ROLE_UPDATE,
  ENUM_PERMISSION.ROLE_UPDATE,
);

rolePagePermission.addChild(
  ENUM_PERMISSION.ROLE_DELETE,
  ENUM_PERMISSION.ROLE_DELETE,
);

// Category Page Permission
const categoryPagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.CATEGORY,
  ENUM_PERMISSION_SUBJECT.CATEGORY,
);

categoryPagePermission.addChild(
  ENUM_PERMISSION.CATEGORY_VIEW,
  ENUM_PERMISSION.CATEGORY_VIEW,
);

categoryPagePermission.addChild(
  ENUM_PERMISSION.CATEGORY_CREATE,
  ENUM_PERMISSION.CATEGORY_CREATE,
);

categoryPagePermission.addChild(
  ENUM_PERMISSION.CATEGORY_UPDATE,
  ENUM_PERMISSION.CATEGORY_UPDATE,
);

categoryPagePermission.addChild(
  ENUM_PERMISSION.CATEGORY_DELETE,
  ENUM_PERMISSION.CATEGORY_DELETE,
);

// Variant Type Page Permission
const variantTypePagePermission = new Permission(
  ENUM_PERMISSION_SUBJECT.VARIANT_TYPE,
  ENUM_PERMISSION_SUBJECT.VARIANT_TYPE,
);

variantTypePagePermission.addChild(
  ENUM_PERMISSION.VARIANT_TYPE_VIEW,
  ENUM_PERMISSION.VARIANT_TYPE_VIEW,
);

variantTypePagePermission.addChild(
  ENUM_PERMISSION.VARIANT_TYPE_CREATE,
  ENUM_PERMISSION.VARIANT_TYPE_CREATE,
);

variantTypePagePermission.addChild(
  ENUM_PERMISSION.VARIANT_TYPE_UPDATE,
  ENUM_PERMISSION.VARIANT_TYPE_UPDATE,
);

variantTypePagePermission.addChild(
  ENUM_PERMISSION.VARIANT_TYPE_DELETE,
  ENUM_PERMISSION.VARIANT_TYPE_DELETE,
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
}
