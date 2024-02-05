import { SessionId } from './session-id';

export interface IUser {
  id: SessionId;
  login: string;
}
