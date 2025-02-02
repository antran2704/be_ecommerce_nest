import { Injectable } from "@nestjs/common";
import { setPermissionDictionary } from "../constants/permission.constant";
import { PermissionDictionary } from "~/common/permissions/permission.dictionary";

@Injectable()
export class PermissionService {
  constructor() {
    setPermissionDictionary();
  }

  getPermissions() {
    return PermissionDictionary.getPermissionDistionary();
  }
}
