import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/RedisService';

@Injectable()
export class PubSub extends RedisPubSub {
  constructor(private redis: RedisService) {
    super({
      publisher: redis,
      subscriber: redis,
    });
  }
}
