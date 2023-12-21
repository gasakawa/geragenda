import { faker } from '@faker-js/faker';
import {
  AdminCreateUserCommandOutput,
  InitiateAuthCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
import { CognitoProvider } from './cognito.provider';

const ConfigServiceMock = jest.fn().mockImplementation(() => ({
  getOrThrow: jest.fn((key: string) => {
    switch (key) {
      case 'AWS_COGNITO_CLIENT_ID':
        return 'client-id';
      case 'AWS_COGNITO_CLIENT_SECRET':
        return 'client-secret';
      case 'AWS_COGNITO_USER_POOL_ID':
        return 'user-pool-id';
      case 'AWS_REGION':
        return 'aws-region';
      default:
        return 'KEY_TESTING';
    }
  }),
}));

const CognitoIdentityProviderMock = jest.fn().mockImplementation(() => ({
  adminCreateUser: jest.fn(),
  initiateAuth: jest.fn(),
}));

describe('CognitoProvider', () => {
  const configMock = new ConfigServiceMock();
  const cognitoMock = new CognitoIdentityProviderMock();
  const sut = new CognitoProvider(cognitoMock, configMock);

  describe('signup', () => {
    const fakeSub = faker.string.uuid();
    const output = {
      User: {
        Attributes: [
          {
            Name: 'sub',
            Value: fakeSub,
          },
        ],
      },
    } as AdminCreateUserCommandOutput;

    it('should create user as admin', async () => {
      const params = {
        email: faker.internet.email(),
        name: faker.person.fullName(),
      };

      jest.spyOn(cognitoMock, 'adminCreateUser').mockResolvedValueOnce(output);

      const userAttributes = [
        {
          Name: 'email',
          Value: params.email,
        },
        {
          Name: 'name',
          Value: params.name,
        },
        {
          Name: 'custom:tenant',
          Value: 'customer',
        },
        {
          Name: 'custom:role',
          Value: '1',
        },
      ];

      const result = await sut.signup(params.email, params.name, 1, null);

      expect(result).toEqual({
        userSub: fakeSub,
        isConfirmed: false,
        isActive: false,
      });
      expect(cognitoMock.adminCreateUser).toHaveBeenCalledWith({
        Username: params.email,
        UserPoolId: 'user-pool-id',
        DesiredDeliveryMediums: ['EMAIL'],
        UserAttributes: userAttributes,
      });
    });
  });

  describe('signIn', () => {
    const output = {
      AuthenticationResult: {
        AccessToken: faker.string.alphanumeric({ length: 20 }),
        ExpiresIn: 1,
        TokenType: 'Bearer',
        RefreshToken: faker.string.alphanumeric({ length: 20 }),
      },
      $metadata: {},
    } as InitiateAuthCommandOutput;

    it('should authenticate user', async () => {
      const params = {
        username: faker.string.uuid(),
        password: faker.string.alphanumeric({ length: 8 }),
      };

      jest.spyOn(cognitoMock, 'initiateAuth').mockResolvedValueOnce(output);

      const result = await sut.signIn(params.username, params.password);

      expect(result).toEqual({
        accessToken: output.AuthenticationResult.AccessToken,
        expiresIn: 1,
        tokenType: 'Bearer',
        idToken: 'NO_RESULT',
        refreshToken: output.AuthenticationResult.RefreshToken,
      });
    });
    it('should not authenticate user', async () => {
      const params = {
        username: faker.string.uuid(),
        password: faker.string.alphanumeric({ length: 8 }),
      };

      jest
        .spyOn(cognitoMock, 'initiateAuth')
        .mockResolvedValueOnce({} as InitiateAuthCommandOutput);

      const result = await sut.signIn(params.username, params.password);

      expect(result).toEqual({
        accessToken: 'NO_RESULT',
        expiresIn: 0,
        tokenType: 'NO_RESULT',
        idToken: 'NO_RESULT',
        refreshToken: 'NO_RESULT',
      });
    });
  });
});
