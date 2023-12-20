import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeInitialPasswordRequestDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  tempPassword: string;
}
