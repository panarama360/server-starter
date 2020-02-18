import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { config } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from './module/jwt/jwt.module';
import { PubSub } from './module/pubsub/PubSub';
import { PubSubModule } from './module/pubsub/pubSubModule';

@Module({
  imports: [
    AuthModule,
    JwtModule,
    PubSubModule,
    TypeOrmModule.forRoot({
      // @ts-ignore
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      port: process.env.TYPEORM_PORT,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: !!process.env.TYPEORM_SYNCHRONIZE,
      logging: !!process.env.TYPEORM_LOGGING,
      keepConnectionAlive: config.get('dev'),
      entities: config.get('dev') ? config.get('entities') : [process.env.TYPEORM_ENTITIES],
    }),
    GraphQLModule.forRootAsync({
      inject: [PubSub],
      useFactory: (pubSub: PubSub, client) => {
        return {
          installSubscriptionHandlers: true,
          debug: config.get('dev'),
          playground: config.get('dev'),
          autoSchemaFile: 'schema.gql',
          context: ({ req, res, connection }) => ({ req: connection ? connection.context : req, res, pubSub }),
          tracing: config.get('dev'),
          // subscriptions: {
          //   onDisconnect: (websocket, context) => OnDisconnect(new ClientRedis({url: config.get('redis')}))(websocket as any, context as any),
          //   onConnect: OnConnect,
          // },
        };
      },
    }),
  ],
})
export class AppModule {}
