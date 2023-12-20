import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import { ConfigService } from '@nestjs/config';
import { AWSVersions } from '../api-versions';

export const buildCognitoProviderInstance = (config: ConfigService) => {
  return new CognitoIdentityProvider({
    apiVersion: AWSVersions().cognito,
    region: config.getOrThrow('AWS_REGION'),
  });
};
