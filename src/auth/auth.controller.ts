import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AuthenticateUserService,
  ChangeInitialPasswordService,
  CreateUserService,
} from './services';
import { SignupUserRequestDto } from './dto';
import { ChangeInitialPasswordRequestDto } from './dto/change-initial-password-request.dto';
import { SignInUserRequestDto } from './dto/signin-user-request.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly changeInitialPasswordService: ChangeInitialPasswordService,
    private readonly authenticateUserService: AuthenticateUserService,
  ) {}

  @ApiOperation({
    summary: 'Register Users',
    description: 'Register new users',
    operationId: 'register-users',
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

  @ApiOperation({
    summary: 'Authenticate User',
    description: 'Authenticates the user',
    operationId: 'authenticate-user',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  async authenticate(@Body() body: SignInUserRequestDto) {
    return await this.authenticateUserService.execute(
      body.email,
      body.password,
    );
  }
}
