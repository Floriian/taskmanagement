import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const req: Express.Request = ctx.switchToHttp().getRequest();

    if (data) return req.user['team'][data];

    return req.user;
  },
);