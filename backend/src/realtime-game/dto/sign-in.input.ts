import { IsString, Length } from 'class-validator';

export class SignInInput {
  @IsString()
  @Length(3, 26)
  login: string;
}
