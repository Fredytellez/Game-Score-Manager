import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { createUserDto } from '../auth/dto/crate.user.dto';
import { UpdateUserDto } from '../auth/dto/update.user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async create(createUserDto: createUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const hashedConfirmPassword = await bcrypt.hash(
      createUserDto.confirmPassword,
      10,
    );
    const newUser = {
      id: uuidv4(),
      ...createUserDto,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,
    };
    this.users.push(newUser);
    return newUser;
  }

  getAllUsers(): User[] {
    return this.users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async getProfile(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async getScores(id: string): Promise<any[]> {
    // implementar la logica para traer las puntuaciones
    return [id];
  }

  async updateProfile(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      Object.assign(user, updateUserDto);
      return user;
    }
    return undefined;
  }
}
