import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../types/user.payload';

export const GetWSUser = createParamDecorator(
  (data: UserPayload | undefined, ctx: ExecutionContext) => {
    const config: ConfigService = new ConfigService();
    const jwtService: JwtService = new JwtService({
      secret: config.get('JWT_SECRET'),
    });

    const client = ctx.switchToWs().getClient();
    const token: string = client.handshake.headers.authorization.split(' ')[1];
    console.log(token);

    const decode = jwtService.decode(token, {
      json: true,
      complete: true,
    });
    return decode['payload'][data];
  },
);
