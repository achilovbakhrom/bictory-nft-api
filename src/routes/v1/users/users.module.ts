import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UsersController from './users.controller';
import UsersService from './users.service';
import UserEntity from './schemas/user.entity';
import UsersRepository from './users.repository';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, TwoFactorAuthenticationService],
  exports: [UsersService, UsersRepository, TwoFactorAuthenticationService],
})
export default class UsersModule {}
