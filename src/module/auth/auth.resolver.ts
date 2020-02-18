import { Resolver, Query, Args, Mutation, Context, GqlExecutionContext } from '@nestjs/graphql';
import { Inject, Req, Request, UseGuards } from '@nestjs/common';
import { AuthenticationError } from 'apollo-server-express';
import { LoginDto } from './input/login.dto';
import { UserEntity } from '../../common/entity/User.entity';
import * as bcrypt from 'bcrypt';
import { Tokens } from './output/Tokens';
import { JwtService } from '../jwt/jwt.service';
import { SessionEntity } from '../../common/entity/Session.entity';
import { ForbiddenError } from 'type-graphql';
import { AuthGuard } from '../../common/guards/auth.guard';
import { Ip, UserAgent } from '../../common/decorators';

@Resolver()
export class AuthResolver {
  @Inject()
  private jwtService: JwtService;

  @Mutation(returns => Tokens)
  async login(@Args('loginData') data: LoginDto, @Context() context, @Ip() ip: string): Promise<Tokens> {

    const user = await UserEntity.findOne({
      username: data.username,
    });
    const match = await bcrypt.compare(data.password, user.password);
    if (!match) {
      throw new AuthenticationError('username or password');
    }

    const accessToken = await this.jwtService.generateAccessToken(user);
    const refreshToken = await this.jwtService.generateRefreshToken(user, context.req);
    await new SessionEntity({
      active: true,
      device: [context.req.useragent.os, context.req.useragent.browser + ' ' + context.req.useragent.version].join(', '),
      ip,
      refreshToken,
      user,
    }).save();
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // @UseGuards(AuthGuard)
  @Query(returns => String)
  test(@UserAgent() agent: any, @Ip() ip: string) {
    // console.log(agent);
    // console.log(ip);

    return 'hello';
  }

  @Mutation(returns => Tokens)
  async refresh(@Args('refreshToken') token: string, @Context() context): Promise<Tokens> {
    const decode: any = this.jwtService.validateRefreshToken(token);
    if (!decode || decode.fp !== this.jwtService.getFingerprint(context.req)) {
      throw new ForbiddenError();
    }
    const session = await SessionEntity.findOne({
        refreshToken: token,
        active: true,
    }, {relations: ['user']});
    if (!session) {
      throw new ForbiddenError();
    }
    session.refreshToken = await this.jwtService.generateRefreshToken(session.user, context.req);
    await session.save();

    return {
      access_token: await this.jwtService.generateAccessToken(session.user),
      refresh_token: session.refreshToken,
    };
  }
}
