import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthCommonService {
  constructor(private jwtService: JwtService) {}

  generateToken<T>(payload: T, options?: JwtSignOptions) {
    return this.jwtService.sign(payload as any, options);
  }

  async verifyToken(token: string, options?: JwtVerifyOptions) {
    try {
      return await this.jwtService.verifyAsync(token, options);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async isTokenHasExpired(token: string, options?: JwtVerifyOptions) {
    try {
      await this.jwtService.verifyAsync(token, options);
      return false;
    } catch (error) {
      return true;
    }
  }

  async hashPassword(password: string) {
    const saltRounds = 10;
    const passwordHash = await bcrypt
      .hash(password, saltRounds)
      .then(function (hash) {
        return hash;
      });

    return passwordHash;
  }

  async comparePassword(password: string, hashPassword: string) {
    const isValid = await bcrypt
      .compare(password, hashPassword)
      .then(function (result) {
        return result;
      });

    return isValid;
  }
}
