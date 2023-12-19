import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SignupUserRequestDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  role: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  tenant?: number;

  @IsString()
  @IsNotEmpty()
  mobileNumber: string;
}
