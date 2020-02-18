import * as conf from 'dotenv';
import * as convict from 'convict';
if (process.env.NODE_ENV === 'development') {
  conf.config({path: '.env.development'});
} else {
  conf.config();
}

export const config = convict({
  environment: {
    doc: 'The applicaton environment',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV',
    arg: 'node_env',
  },
  port: {
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port',
  },
  redis: {
    env: 'REDIS',
    default: 'redis://127.0.0.1:6379',
  },
  refreshToken: {
    privateKey: {default: '123', env: 'REFRESH_TOKEN_PRIVATE'},
    publicKey: {default: '123', env: 'REFRESH_TOKEN_PUBLIC'},
    expiresIn: {default: 180 * 2, env: 'REFRESH_TOKEN_EXPIRES'},
  },
  accessToken: {
    privateKey: {default: '123', env: 'ACCESS_TOKEN_PRIVATE'},
    publicKey: {default: '123', env: 'ACCESS_TOKEN_PUBLIC'},
    expiresIn: {default: 180, env: 'ACCESS_TOKEN_EXPIRES'},
  },
  dev: {
    default: process.env.NODE_ENV === 'development',
  },
  prod: {
    default: process.env.NODE_ENV === 'production',
  },
  entities: {
    default: undefined,
    env: 'TYPEORM_ENTITIES',
  },
}).validate();

if (config.get('dev')) {
  // @ts-ignore
  const entityContext = require.context('.', true, /\.entity\.ts$/);
  config.set('entities', entityContext.keys().map(id => {
    const entityModule = entityContext(id);
    const [entity] = Object.values(entityModule);
    return entity;
  }));
}
