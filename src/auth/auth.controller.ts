import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserService } from './services';
import { SignupUserRequestDto } from './dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly createUserService: CreateUserService) {}

  async signup(@Body() body: SignupUserRequestDto) {
    return await this.createUserService.execute(body);
  }
}
