import { UserSessionInput } from '../dto/user-session.input';
import { UserSessionOutput } from '../dto/user-session.output';
import { SessionId } from './session-id';

export interface IUserSessionManager {
  createSession(session: UserSessionInput): Promise<void>;
  getSession(id: SessionId): Promise<UserSessionOutput>;
  removeSession(id: SessionId): Promise<void>;
  getByLogin(login: string): Promise<UserSessionOutput>;
}
