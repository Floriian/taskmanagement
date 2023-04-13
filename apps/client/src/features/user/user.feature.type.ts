import { TUser } from '../../types';

export type UserFeature = Omit<TUser, 'team'>;
