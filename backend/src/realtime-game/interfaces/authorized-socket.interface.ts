import { Socket } from 'socket.io';
import { Handshake } from 'socket.io/dist/socket';
import { IUserPayload } from 'src/auth/common/user-payload.interface';

export interface AuthorizedSocket extends Socket {
  handshake: Handshake & { user: IUserPayload };
}
