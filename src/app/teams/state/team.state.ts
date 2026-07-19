import { Team } from '../models/team.model';

export interface TeamState {
  teams: Team[];

  selectedTeamId: string | null;

  loading: boolean;

  error: string | null;
}
