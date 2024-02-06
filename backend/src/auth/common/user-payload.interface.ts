import { SessionId } from 'src/user-session/common/session-id';

export interface IUserPayload {
  id: SessionId;
  login: string;
  connectionId: string;
}
