import { Inject, Injectable } from '@nestjs/common';
import { IUserSessionManager } from '../common/user-session-manager.interface';
import { UserSessionInput } from '../dto/user-session.input';
import { UserSessionOutput } from '../dto/user-session.output';
import { IUserSessionStore } from '../common/user-session-store.interface';

@Injectable()
export class UserSessionService implements IUserSessionManager {
  constructor(
    @Inject('Session-Store')
    private readonly _sessionRepository: IUserSessionStore,
  ) {}

  async createSession(session: UserSessionInput): Promise<void> {
    await this._sessionRepository.saveUserSession(session);
  }
  async getSession(id: string): Promise<UserSessionOutput> {
    const session = await this._sessionRepository.findUserSessionById(id);
    return session;
  }
  async removeSession(id: string): Promise<void> {
    await this._sessionRepository.deleteUserSession(id);
  }

  async getByLogin(login: string): Promise<UserSessionOutput> {
    const userSession = await this._sessionRepository.findUserSessionByLogin(
      login,
    );
    return userSession;
  }
}
