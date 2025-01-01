import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthCommonService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateToken(payload: any, options?: JwtSignOptions) {
    return this.jwtService.sign(payload, options);
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
