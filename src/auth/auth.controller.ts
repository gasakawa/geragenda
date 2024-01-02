import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AuthenticateUserService,
  ChangeInitialPasswordService,
  ConfirmUserService,
  CreateUserService,
} from './services';
import {
  ChangeInitialPasswordRequestDto,
  ConfirmUserRequestDto,
  SignInUserRequestDto,
  SignupUserRequestDto,
} from './dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly changeInitialPasswordService: ChangeInitialPasswordService,
    private readonly authenticateUserService: AuthenticateUserService,
    private readonly confirmUserService: ConfirmUserService,
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

  @ApiOperation({
    summary: 'Confirm User',
    description: 'Confirms the user',
    operationId: 'confirm-user',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/confirm')
  async confirm(@Body() body: ConfirmUserRequestDto) {
    return await this.confirmUserService.execute(body.email, body.code);
  }
}
