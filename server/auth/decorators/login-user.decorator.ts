import { createParamDecorator } from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user.dto';

export const LoginUser = createParamDecorator((data, req) => {
  const { email, password } = req.body;
  return { email, password } as LoginUserDto;
});
