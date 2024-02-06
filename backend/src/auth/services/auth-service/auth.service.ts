import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IAuthManager } from 'src/auth/common/auth-manager.interface';
import { IUserPayload } from 'src/auth/common/user-payload.interface';
import { SignInInput } from 'src/auth/dto/sign-in-input';
import { SignOutInput } from 'src/auth/dto/sign-out-input';
import { SessionId } from 'src/user-session/common/session-id';
import { IUserSessionManager } from 'src/user-session/common/user-session-manager.interface';

@Injectable()
export class AuthService implements IAuthManager {
  constructor(
    @Inject('Session-Manager')
    private readonly _sessionService: IUserSessionManager,
  ) {}

  async validateUser(id: SessionId): Promise<IUserPayload | null> {
    const userSession = await this._sessionService.getSession(id);
    return userSession ?? null;
  }
  async signIn(userData: SignInInput): Promise<void> {
    const candidate = await this._sessionService.getByLogin(userData.login);
    if (candidate) {
      throw new BadRequestException(
        'User with this username is already in the system',
      );
    }

    await this._sessionService.createSession({
      id: userData.connectionId,
      login: userData.login,
      connectionId: userData.connectionId,
    });
  }
  async signOut(signOutPayload: SignOutInput): Promise<void> {
    await this._sessionService.removeSession(signOutPayload.connectionId);
  }
}
