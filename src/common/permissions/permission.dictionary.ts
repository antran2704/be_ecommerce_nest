import { IPermissionDic } from "./interfaces/permission.interface";
import { Permission } from "./permission";

export class PermissionDictionary {
  private static PERMISSION_DICTIONARY: IPermissionDic = {};

  public static addPermission(title: string, permission: Permission) {
    if (!this.PERMISSION_DICTIONARY[title]) {
      this.PERMISSION_DICTIONARY[title] = [];
    }
    this.PERMISSION_DICTIONARY[title].push(permission);
  }

  public static getPermissionDistionary(): IPermissionDic {
    return this.PERMISSION_DICTIONARY;
  }
}
