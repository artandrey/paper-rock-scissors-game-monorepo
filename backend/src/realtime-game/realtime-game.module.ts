import { Module } from '@nestjs/common';
import { GameRoomsGateway } from './realtime-game-gateway/realtime-game.gateway';
import { GameRoomsModule } from 'src/game-rooms/game-rooms.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [GameRoomsGateway],
  imports: [GameRoomsModule, AuthModule],
})
export class RealtimeGameRoomsModule {}
