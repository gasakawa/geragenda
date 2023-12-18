import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserService } from './services';
import { SignupUserRequestDto } from './dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly createUserService: CreateUserService) {}

  @ApiOperation({
    summary: 'Signup Users',
    description: 'Signup new users',
    operationId: 'signup-users',
  })
  @Post('/signup')
  async signup(@Body() body: SignupUserRequestDto) {
    return await this.createUserService.execute(body);
  }
}
