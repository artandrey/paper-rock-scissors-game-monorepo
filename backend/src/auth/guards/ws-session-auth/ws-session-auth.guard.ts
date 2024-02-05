import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IAuthManager } from 'src/auth/common/auth-manager.interface';
import { Socket } from 'socket.io';

@Injectable()
export class WsSessionAuthGuard implements CanActivate {
  constructor(
    @Inject('Auth-Manager') private readonly _authService: IAuthManager,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = this.getClient(context);
    const user = await this._authService.validateUser(client.id);
    if (!user) return false;
    client.handshake['user'] = user;
    return true;
  }

  private getClient(context: ExecutionContext): Socket {
    return context.switchToWs().getClient();
  }
}
