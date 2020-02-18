import { Field, InputType } from 'type-graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class LoginDto {
  @Field()
  @IsString()
  username: string;

  @Field()
  @Length(6, 30)
  @IsString()
  password: string;
}
