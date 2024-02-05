import { SessionId } from 'src/user-session/common/session-id';
import { SignInInput } from '../dto/sign-in-input';
import { SignOutInput } from '../dto/sign-out-input';
import { IUserPayload } from './user-payload.interface';

export interface IAuthManager {
  validateUser(id: SessionId): Promise<IUserPayload | null>;
  signIn(userData: SignInInput): Promise<void>;
  signOut(signOutPayload: SignOutInput): Promise<void>;
}
