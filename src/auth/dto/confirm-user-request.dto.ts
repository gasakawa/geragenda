import { IsEmail, IsString } from 'class-validator';

export class ConfirmUserRequestDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  code: string;
}
