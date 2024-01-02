import { IsEmail, IsString } from 'class-validator';

export class UserEmailRequestDto {
  @IsString()
  @IsEmail()
  email: string;
}
