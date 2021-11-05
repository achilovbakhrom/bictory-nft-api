export interface DecodedUser {
  readonly id: number;

  readonly email: string;

  readonly password: string;

  readonly role: string;

  readonly twoFactorAuthenticationCode?: string;

  readonly iat?: number;

  readonly exp?: number;
}
