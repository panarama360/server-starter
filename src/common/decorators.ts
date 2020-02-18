import { createParamDecorator } from '@nestjs/common';

export const Ip = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    return  ctx.req.headers['cf-connecting-ip'] || ctx.req.headers['x-forwarded-for'] || ctx.req.connection.remoteAddress;
  },
);

export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    return ctx.req.user;
  },
);

export const UserAgent = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    return ctx.req.useragent;
  },
);

export const PubSub = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    return ctx.pubSub;
  },
);
