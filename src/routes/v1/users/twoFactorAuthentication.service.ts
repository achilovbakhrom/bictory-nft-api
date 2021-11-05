import { Injectable, NotFoundException } from '@nestjs/common';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';
import { Response } from 'express';
import User from './schemas/user.entity';
import UsersService from './users.service';

@Injectable()
// eslint-disable-next-line import/prefer-default-export
export class TwoFactorAuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  public async generateTwoFactorAuthenticationSecret(user: User) {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(user.email, 'Bictory NFT App', secret);

    await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);
    return {
      secret,
      otpauthUrl,
    };
  }

  public async isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: User) {
    const userEntity = await this.usersService.getById(user.id);
    if (!userEntity) {
      throw new NotFoundException('such user not exists');
    }
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: userEntity.twoFactorAuthenticationSecret || '',
    });
  }

  public async pipeQrCodeStream(stream: Response, otpauthUrl: string) {
    return toFileStream(stream, otpauthUrl);
  }
}
