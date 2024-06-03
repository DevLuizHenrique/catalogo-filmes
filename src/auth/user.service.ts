// src/auth/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDto: any): Promise<string> {
    const { username, password } = userDto;
    const existingUser = await this.userRepository.findOne({ where: { username } });

    if (existingUser) {
      throw new Error('Usuário já existe');
    }

    const user = this.userRepository.create({ username, password });
    await this.userRepository.save(user);
    return 'Usuário registrado com sucesso';
  }
}
