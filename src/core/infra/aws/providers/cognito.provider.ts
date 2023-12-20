import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'crypto';
import {
  AdminCreateUserCommandInput,
  CognitoIdentityProvider,
  InitiateAuthCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import { SignInUserResponseDto, SignupUserResponseDto } from '@/auth/dto';

export const CognitoProviderKey = 'CognitoProvider';
@Injectable()
export class CognitoProvider {
  private clientSecret: string;
  private clientId: string;
  private userPoolId: string;

  constructor(
    @Inject(CognitoProviderKey)
    private readonly identityProvider: CognitoIdentityProvider,
    private readonly config: ConfigService,
  ) {
    this.init();
  }

  private init() {
    this.clientId = this.config.getOrThrow('AWS_COGNITO_CLIENT_ID');
    this.clientSecret = this.config.getOrThrow('AWS_COGNITO_CLIENT_SECRET');
    this.userPoolId = this.config.getOrThrow('AWS_COGNITO_USER_POOL_ID');
  }

  private hashSecret = (username: string): string => {
    return createHmac('SHA256', this.clientSecret)
      .update(username + this.clientId)
      .digest('base64');
  };

  async signup(
    email: string,
    name: string,
    role: number,
    tenant: number,
  ): Promise<SignupUserResponseDto> {
    const tenantType = tenant ? 'tenant' : 'customer';

    const userAttributes = [
      {
        Name: 'email',
        Value: email,
      },
      {
        Name: 'name',
        Value: name,
      },
      {
        Name: 'custom:tenant',
        Value: tenantType,
      },
      {
        Name: 'custom:role',
        Value: `${role}`,
      },
    ];

    const params = {
      Username: email,
      UserPoolId: this.userPoolId,
      DesiredDeliveryMediums: ['EMAIL'],
      UserAttributes: userAttributes,
    } as AdminCreateUserCommandInput;

    const res = await this.identityProvider.adminCreateUser(params);
    const { User } = res;

    if (User) {
      if (User.Attributes) {
        const sub = User.Attributes.filter(attr => attr.Name === 'sub');

        return {
          userSub: sub[0].Value || '',
          isConfirmed: false,
          isActive: false,
        };
      }
    }

    throw new InternalServerErrorException(
      'Error while register user in provider',
    );
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<SignInUserResponseDto> {
    const params = {
      ClientId: this.clientId,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: this.hashSecret(username),
      },
    } as InitiateAuthCommandInput;

    const { AuthenticationResult } = await this.identityProvider.initiateAuth(
      params,
    );

    return {
      accessToken: AuthenticationResult?.AccessToken || 'NO_RESULT',
      expiresIn: AuthenticationResult?.ExpiresIn || 0,
      tokenType: AuthenticationResult?.TokenType || 'NO_RESULT',
      idToken: AuthenticationResult?.IdToken || 'NO_RESULT',
      refreshToken: AuthenticationResult?.RefreshToken || 'NO_RESULT',
    };
  }

  async confirmSignup(username: string, code: string): Promise<void> {
    const params = {
      ClientId: this.clientId,
      ConfirmationCode: code,
      Username: username,
      SecretHash: this.hashSecret(username),
    };

    await this.identityProvider.confirmSignUp(params);
  }

  async forgotPassword(username: string): Promise<void> {
    const params = {
      ClientId: this.clientId,
      Username: username,
      SecretHash: this.hashSecret(username),
    };

    await this.identityProvider.forgotPassword(params);
  }

  async resetPassword(
    username: string,
    password: string,
    code: string,
  ): Promise<void> {
    const params = {
      ClientId: this.clientId,
      ConfirmationCode: code,
      Password: password,
      Username: username,
      SecretHash: this.hashSecret(username),
    };

    await this.identityProvider.confirmForgotPassword(params);
  }

  async changePassword(
    token: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const params = {
      AccessToken: token,
      PreviousPassword: oldPassword,
      ProposedPassword: newPassword,
    };

    await this.identityProvider.changePassword(params);
  }

  async resendConfirmationCode(username: string): Promise<void> {
    const params = {
      ClientId: this.clientId,
      Username: username,
      SecretHash: this.hashSecret(username),
    };

    await this.identityProvider.resendConfirmationCode(params);
  }

  async changeInitialPassword(
    username: string,
    password: string,
  ): Promise<void> {
    const params = {
      Username: username,
      Password: password,
      Permanent: true,
      UserPoolId: this.userPoolId,
    };

    await this.identityProvider.adminSetUserPassword(params);

    await this.identityProvider.adminUpdateUserAttributes({
      UserAttributes: [{ Name: 'email_verified', Value: 'true' }],
      Username: username,
      UserPoolId: this.userPoolId,
    });
  }
}
