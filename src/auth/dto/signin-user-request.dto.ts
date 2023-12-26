import { IsEmail, IsString } from 'class-validator';

export class SignInUserRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
