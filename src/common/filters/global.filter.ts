import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import * as FormatError from 'easygraphql-format-error';
import { ApolloError, AuthenticationError } from 'apollo-server-express';

@Catch()
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    // return new AuthenticationError('must authenticate');
    return exception;
  }
}
