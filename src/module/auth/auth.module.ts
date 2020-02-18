import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../../config';

@Module({
  providers: [AuthResolver],
})
export class AuthModule {

}
