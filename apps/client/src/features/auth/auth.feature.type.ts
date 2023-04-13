import { TUser } from '../../types';

export type AuthFeature = {
  loading: boolean;
  userInfo: TUser | undefined;
  userToken: string;
  error: unknown;
  success: boolean;
};
