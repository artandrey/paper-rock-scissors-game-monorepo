import { Module } from '@nestjs/common';
import { UserSessionService } from './user-session-service/user-session.service';
import { UserSessionRepository } from './user-session-repository/user-session-repository';

@Module({
  providers: [
    {
      provide: 'Session-Manager',
      useClass: UserSessionService,
    },
    {
      provide: 'Session-Store',
      useClass: UserSessionRepository,
    },
  ],

  exports: ['Session-Manager'],
})
export class UserSessionModule {}
