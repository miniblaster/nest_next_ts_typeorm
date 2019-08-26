import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { User } from '../../user/user.entity';

@Injectable()
export class LocalRegisterStrategy extends PassportStrategy(Strategy, 'local-register') {
  constructor(private readonly service: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  public async validate(req: Request, email: string, password: string) {
    const { name } = req.body;
    const user: User = await this.service.registerUserIfNotExist({ name, email, password });
    if (user) {
      return user;
    }
    return false;
  }
}
