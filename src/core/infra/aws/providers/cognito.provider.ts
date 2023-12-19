import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AdminCreateUserCommandInput,
  AdminCreateUserCommandOutput,
  CognitoIdentityProvider,
} from '@aws-sdk/client-cognito-identity-provider';
import { AWSVersions } from '../api-versions';
import { SignupUserResponseDto } from '@/auth/dto';

@Injectable()
export class CognitoProvider {
  private clientSecret: string;
  private clientId: string;
  private userPoolId: string;
  private identityProvider: CognitoIdentityProvider;
  constructor(private readonly config: ConfigService) {
    this.init();
  }

  private init() {
    this.clientId = this.config.getOrThrow('AWS_COGNITO_CLIENT_ID');
    this.clientSecret = this.config.getOrThrow('AWS_COGNITO_CLIENT_SECRET');
    this.userPoolId = this.config.getOrThrow('AWS_COGNITO_USER_POOL_ID');
    this.identityProvider = new CognitoIdentityProvider({
      apiVersion: AWSVersions().cognito,
      region: this.config.getOrThrow('AWS_REGION'),
    });
  }

  async signup(
    email: string,
    name: string,
    role: number,
    tenant: string,
  ): Promise<SignupUserResponseDto> {
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
        Value: tenant,
      },
      {
        Name: 'custom:role',
        Value: role,
      },
    ];

    const params = {
      Username: email,
      UserPoolId: this.userPoolId,
      DesiredDeliveryMediums: ['EMAIL'],
      UserAttributes: userAttributes,
      MessageAction: 'SUPPRESS',
    } as AdminCreateUserCommandInput;

    const { User } = await new Promise<AdminCreateUserCommandOutput>(
      (resolve, reject) => {
        this.identityProvider
          .adminCreateUser(params)
          .then(response => {
            resolve(response);
          })
          .catch(err => reject(err));
      },
    );

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
}
