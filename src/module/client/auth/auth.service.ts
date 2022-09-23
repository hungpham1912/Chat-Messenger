import { Injectable } from '@nestjs/common';
import { Unauthorized } from 'shared/exception/auth.exception';
import { RegisterUserDto } from './dto/auth.dto';
import { Payload, ResponseAuthUser } from './models/auth.model';
import { UsersService } from 'src/module/core/users/users.service';
import { AuthService } from 'src/module/core/auth/auth.service';
import { AuthInterface } from 'src/module/core/auth/interfaces/auth.interface';

@Injectable()
export class CliAuthService implements AuthInterface {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  async validateUser(
    phone: string,
    password: string,
  ): Promise<ResponseAuthUser> {
    const user = await this.userService.findOne({ phone: phone });
    if (!user)
      throw Unauthorized(`Can't find phone number`, 'PHONE_NUMBER_NOT_EXIST');

    const passwordInvalid = await this.authService.checkPassword(
      password,
      user.password,
    );
    if (!passwordInvalid)
      throw Unauthorized(
        'The password does not match the password on the system',
        'PASSWORD_FAILED',
      );

    const payload: Payload = {
      id: user.id,
      sub: user.id,
    };
    const accessToken = await this.authService.generateJwtToken(payload);
    const result: ResponseAuthUser = { ...user, accessToken };

    return result;
  }

  async register(body: RegisterUserDto) {
    const checkEmail = await this.userService.findOne([
      { email: body.email },
      { phone: body.phone },
    ]);
    if (checkEmail)
      throw Unauthorized(
        'Email or Phone already exists in the system',
        'USERNAME_ALREADY_EXIST',
      );
    const newPass = await this.authService.hashPassword(body.password);
    body.password = newPass;

    const user = await this.userService.create(body);
    const payload: Payload = {
      id: user.id,
      sub: user.id,
    };
    const accessToken = await this.authService.generateJwtToken(payload);
    const result: ResponseAuthUser = { ...user, accessToken };

    return result;
  }

  async validateUserByToken(id: string) {
    const user = await this.userService.findOne({ id: id });
    if (!user) {
      throw Unauthorized('Token failed', 'TOKEN_FAILED');
    }
    return user;
  }
}
