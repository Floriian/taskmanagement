import { registerAs } from '@nestjs/config';

export const config = registerAs('app', () => ({}));
