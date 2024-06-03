import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() userDto: any) {
    return this.userService.createUser(userDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: any) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      return 'Credenciais inválidas';
    }
    return this.authService.login(user);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    // Implemente a lógica de logout aqui, se necessário
    return 'Usuário desconectado com sucesso';
  }
}
