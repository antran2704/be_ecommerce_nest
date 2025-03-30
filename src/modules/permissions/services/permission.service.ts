import { Injectable } from "@nestjs/common";
import { setPermissionDictionary } from "../constants/permission.constant";
import { PermissionDictionary } from "~/common/permissions/permission.dictionary";
import { UpdatePermissionRequestDto } from "~/modules/role/dtos";
import { RoleService } from "~/modules/role/services/role.service";

@Injectable()
export class PermissionService {
  constructor(private readonly roleService: RoleService) {
    setPermissionDictionary();
  }

  getPermissions() {
    return PermissionDictionary.getPermissionDistionary();
  }

  async updatePermissions(roleId: string, payload: UpdatePermissionRequestDto) {
    await this.roleService.updatePermission(roleId, payload);
  }
}
