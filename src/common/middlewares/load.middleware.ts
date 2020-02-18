import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { config } from '../../config';
import { UserEntity } from '../entity/User.entity';

export class LoadMiddleware implements NestMiddleware {
  async use(req: any, res: Response, next: () => void) {
    const token = (req.headers.authorization || '').split(' ')[1];
    if (token) {
      try {
        const verify: {id: number} = jwt.verify(token, config.get('accessToken.publicKey')) as any;
        req.user = await UserEntity.findOne(verify.id);
      } catch (e) {
        Logger.error(e.message);
      }
    }
    next();
  }
}
