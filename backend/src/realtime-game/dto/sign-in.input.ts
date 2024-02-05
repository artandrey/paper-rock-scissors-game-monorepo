import { IsString, Length } from 'class-validator';

export class SignInInput {
  @IsString()
  @Length(3)
  login: string;
}
