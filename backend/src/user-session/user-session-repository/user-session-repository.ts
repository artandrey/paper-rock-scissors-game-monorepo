import { Injectable } from '@nestjs/common';
import { IUserSessionStore } from '../common/user-session-store.interface';
import { IUserSession } from '../common/user-session.interface';
import { SessionId } from '../common/session-id';

@Injectable()
export class UserSessionRepository implements IUserSessionStore {
  private readonly store: Map<SessionId, IUserSession> = new Map();

  async findUserSessionById(id: SessionId): Promise<IUserSession> {
    return this.store.get(id);
  }
  async saveUserSession(session: IUserSession): Promise<void> {
    this.store.set(session.id, session);
  }

  async deleteUserSession(id: string): Promise<void> {
    this.store.delete(id);
  }

  async findUserSessionByLogin(login: string): Promise<IUserSession> {
    return Array.from(this.store.values()).find(
      (session) => session.login === login,
    );
  }
}
