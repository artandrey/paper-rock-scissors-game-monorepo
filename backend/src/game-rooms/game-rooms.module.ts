import { Module } from '@nestjs/common';
import { GameRoomsService } from './game-rooms-service/game-rooms.service';
import { GameRoomInMemoryRepository } from './repository/game-rooms-repository';
import { UserSessionModule } from 'src/user-session/user-session.module';

@Module({
  providers: [
    {
      provide: 'Room-Repository',
      useClass: GameRoomInMemoryRepository,
    },
    {
      provide: 'Room-Manager',
      useClass: GameRoomsService,
    },
  ],
  imports: [UserSessionModule],
  exports: ['Room-Manager'],
})
export class GameRoomsModule {}
