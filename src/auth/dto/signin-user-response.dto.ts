export class SignInUserResponseDto {
  accessToken: string;
  expiresIn: number;
  idToken?: string;
  refreshToken: string;
  tokenType: string;
  tokenData?: {
    name: string;
    sub: string;
    company?: string;
    profile?: number;
    active: boolean;
    confirmed: boolean;
    profilePicUrl?: string;
  };
}
