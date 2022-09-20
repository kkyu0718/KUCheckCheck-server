import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ParseTokenPipe } from './pipes/decode-token.pipe';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { headers } = request;
    return headers['authorization'];
  },
);

export const DecodeToken = (additionalOptions?: any) =>
  Token(additionalOptions, ParseTokenPipe);
