import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChangeInitialPasswordService, CreateUserService } from './services';
import { SignupUserRequestDto } from './dto';
import { ChangeInitialPasswordRequestDto } from './dto/change-initial-password-request.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly changeInitialPasswordService: ChangeInitialPasswordService,
  ) {}

  @ApiOperation({
    summary: 'Signup Users',
    description: 'Signup new users',
    operationId: 'signup-users',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async signup(@Body() body: SignupUserRequestDto) {
    return await this.createUserService.execute(body);
  }

  @ApiOperation({
    summary: 'Change Temporary Password',
    description: 'Changes the user temporary password',
    operationId: 'change-temporary-password',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/change-temporary-password')
  async changeTempPassword(@Body() body: ChangeInitialPasswordRequestDto) {
    return await this.changeInitialPasswordService.execute(body);
  }
}
