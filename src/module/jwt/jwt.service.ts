import { Injectable, Request } from '@nestjs/common';
import { UserEntity } from '../../common/entity/User.entity';
import * as jwt from 'jsonwebtoken';
import { config } from '../../config';
import * as crypto from 'crypto';
@Injectable()
export class JwtService {
  async generateAccessToken(user: UserEntity): Promise<string> {
    const expiresIn = config.get('accessToken.expiresIn');
    const token = jwt.sign({
      id: user.id,
      role: user.role,
    }, config.get('accessToken.privateKey'), {
      expiresIn,
    });
    return token;
  }

  async generateRefreshToken(user: UserEntity, req: Request): Promise<string> {
    const expiresIn = config.get('refreshToken.expiresIn');
    const token = jwt.sign({
      id: user.id,
      role: user.role,
      fp: this.getFingerprint(req),
    }, config.get('refreshToken.privateKey'), {
      expiresIn,
    });
    return token;
  }

  getFingerprint(req: any) {
    return crypto.createHash('md5').update(JSON.stringify(req.useragent)).digest('hex');
  }

  validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, config.get('refreshToken.publicKey'));
    } catch (err) {
      return false;
    }
  }

  validateAccessToken(token: string) {
    try {
      return jwt.verify(token, config.get('accessToken.publicKey'));
    } catch (err) {
      return false;
    }
  }
}
