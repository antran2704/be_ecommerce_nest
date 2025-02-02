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
// Home Page Permission

export function setPermissionDictionary() {
  // Home Page
  PermissionDictionary.addPermission(
    ENUM_PLATFORM_PERMISSION.ADMIN,
    homePagePermission,
  );
}
