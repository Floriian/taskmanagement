import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '../types/user.payload';

export const GetUser = createParamDecorator(
  (data: UserPayload | undefined, ctx: ExecutionContext) => {
    const req: Express.Request = ctx.switchToHttp().getRequest();

    if (data) return req.user[data];

    return req.user;
  },
);
