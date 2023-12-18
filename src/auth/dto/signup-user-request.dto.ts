import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignupUserRequestDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  tenant?: string;
}
