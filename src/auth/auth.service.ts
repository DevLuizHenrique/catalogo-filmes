// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    if (username === 'user' && password === 'password') {
      return { userId: 1, username: 'user' };
    }
    return null;
  }

  async logout(token: string): Promise<string> {
    return 'Usuário desconectado com sucesso';
  }
}