import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
/* import { Score } from '../scores/interface/score.interface'; */
/* import { v4 as uuidv4 } from 'uuid';

import { promises as fs } from 'fs'; */
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  /* private users: User[] = [];
  private scores: Score[] = []; */

  constructor(private prisma: PrismaService) {}

  //Crear usuario
  /* async create(
    userdata: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    const user = {
      id: uuidv4(),
      ...userdata,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(user);
    return user;
  } */

  async create(userdata: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: userdata,
    });
  }

  // buscar usuario por Id
  /* async findById(userId: string): Promise<User | undefined> {
    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      throw new NotAcceptableException('User not found');
    }
    return user;
  } */

  async findById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
  // buscar usuario por email
  /* async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((u) => u.email === email);
    if (!user) {
      throw new NotAcceptableException('User not found');
    }
    return user;
  } */
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  // actualizar usuario y se agrega el cambio de imagen de perfil
  /* async update(userId: string, updateData: Partial<User>): Promise<User> {
    const user = await this.findById(userId);

    // Si hay una nueva imagen y existe una imagen anterior, eliminar la anterior
    if (updateData.profileImage && user.profileImage) {
      const oldImagePath = join(
        process.cwd(),
        'uploads/profiles',
        user.profileImage,
      );
      try {
        await fs.unlink(oldImagePath);
      } catch (error) {
        console.error('Error deleting old profile image:', error);
      }
    }
    Object.assign(user, updateData, { updatedAt: new Date() });
    return user;
  } */
  async update(
    userId: number,
    updateData: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  }
  // Obtener todos los usuarios
  /* async findAll(): Promise<User[]> {
    return this.users;
  } */
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
  /* async getUserScore(userId: string): Promise<Score[]> {
    await this.findById(userId); // Veririfica que el usuario exista
    return this.scores.filter((score) => score.userId === userId);
  } */
  /* async getUserScore(userId: number): Promise<Score[]> {
    await this.findById(userId);
    return this.prisma.score.findMany({
      where: { userId },
    });
  } */

  async remove(userId: number) {
    try {
      return await this.prisma.user.delete({
        where: { id: userId },
      });
    } catch (error) {
      throw new NotFoundException(`Player with ID ${userId} not found`, error);
    }
  }
}
