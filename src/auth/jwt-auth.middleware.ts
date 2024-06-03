import { Request, NextFunction } from 'express';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class JwtAuthGuardMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: any, next: NextFunction) {
    const authHeader = (req.headers as IncomingHttpHeaders)['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token JWT não fornecido');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token);
      req.user = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException('Token JWT inválido');
    }
  }
}
