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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return true;
    }
  }

  async hashData(data: string) {
    const saltRounds = 10;
    const dataHash = await bcrypt.hash(data, saltRounds).then(function (hash) {
      return hash;
    });

    return dataHash;
  }

  async compareHashData(data: string, hashData: string) {
    const isValid = await bcrypt
      .compare(data, hashData)
      .then(function (result) {
        return result;
      });

    return isValid;
  }
}
