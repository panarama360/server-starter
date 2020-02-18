import { Global, Module } from '@nestjs/common';
import { PubSub } from './PubSub';
import { RedisService } from '../redis/RedisService';

@Global()
@Module({
  providers: [PubSub, RedisService],
  exports: [PubSub],
})
export class PubSubModule {

}
