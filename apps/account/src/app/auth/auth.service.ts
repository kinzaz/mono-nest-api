import { AccountRegister } from '@my-workspace/contracts';
import { UserRole } from '@my-workspace/interfaces';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entiites/user.entity';
import { UserRepository } from '../user/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: AccountRegister.Request) {
    const oldUser = await this.userRepository.findUser(dto.email);
    if (oldUser) {
      throw new Error('Такой пользователь уже зарегистрирован');
    }
    const newUser = await new UserEntity({
      email: dto.email,
      role: UserRole.Student,
      displayName: dto.displayName,
      password: '',
    }).setPassword(dto.password);

    const user = await this.userRepository.createUser(newUser);
    return { email: user.email };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findUser(email);
    if (!user) {
      throw new Error('Неверный логин или пароль');
    }
    const userEntity = new UserEntity({
      email: user.email,
      role: user.role as UserRole,
      displayName: user.displayName,
      password: user.password,
    });
    const isCorrectPassword = await userEntity.validatePassword(password);

    if (!isCorrectPassword) {
      throw new Error('Неверный логин или пароль');
    }

    return {
      id: user.id,
    };
  }

  async login(id: string) {
    return { access_token: await this.jwtService.signAsync(id) };
  }
}
