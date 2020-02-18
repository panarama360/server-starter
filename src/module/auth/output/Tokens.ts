import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Tokens {
  @Field()
    // tslint:disable-next-line:variable-name
  access_token: string;
  @Field()
    // tslint:disable-next-line:variable-name
  refresh_token: string;
}
