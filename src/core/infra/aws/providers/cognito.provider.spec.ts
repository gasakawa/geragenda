import { faker } from '@faker-js/faker';
import { AdminCreateUserCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
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
});
