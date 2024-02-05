import { Module } from '@nestjs/common';
import { GameRoomsService } from './game-rooms-service/game-rooms.service';
import { GameRoomInMemoryRepository } from './repository/game-rooms-repository';

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
  exports: ['Room-Manager'],
})
export class GameRoomsModule {}
