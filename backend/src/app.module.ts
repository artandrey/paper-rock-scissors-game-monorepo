import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RealtimeGameRoomsModule } from './realtime-game/realtime-game.module';
import { GameRoomsModule } from './game-rooms/game-rooms.module';
import { AuthModule } from './auth/auth.module';
import { UserSessionModule } from './user-session/user-session.module';

@Module({
  imports: [
    RealtimeGameRoomsModule,
    GameRoomsModule,
    AuthModule,
    UserSessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
