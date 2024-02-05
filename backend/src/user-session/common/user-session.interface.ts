import { IUser } from 'src/user-session/common/user.interface';
import { SessionId } from './user-session-store.interface';

export interface IUserSession {
  id: SessionId;
  login: string;
}
