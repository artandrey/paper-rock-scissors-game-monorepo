import { IUser } from 'src/user-session/common/user.interface';
import { IUserSession } from './user-session.interface';

export type SessionId = string;

export interface IUserSessionStore {
  findUserSessionById(id: SessionId): Promise<IUserSession>;
  findUserSessionByLogin(login: string): Promise<IUserSession>;
  saveUserSession(user: IUser): Promise<void>;
  deleteUserSession(id: SessionId): Promise<void>;
}
