import * as Redis from 'ioredis';
import { config } from '../../config';
export class RedisService extends Redis {
  constructor() {
    super(config.get('redis'));
  }
}
