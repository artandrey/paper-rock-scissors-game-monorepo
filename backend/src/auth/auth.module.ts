import { Module } from '@nestjs/common';
import { AuthService } from './services/auth-service/auth.service';
import { UserSessionModule } from 'src/user-session/user-session.module';

@Module({
  providers: [
    {
      provide: 'Auth-Manager',
      useClass: AuthService,
    },
  ],
  imports: [UserSessionModule],
  exports: ['Auth-Manager'],
})
export class AuthModule {}
