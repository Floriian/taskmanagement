import { TTeam } from '../../types';

export type TeamFeature = Omit<TTeam, 'users'>;
