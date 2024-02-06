import { SessionId } from './user-session-store.interface';

export interface IUserSession {
  id: SessionId;
  login: string;
  connectionId: string;
}
