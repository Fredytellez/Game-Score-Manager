import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
/* import { v4 as uuidv4 } from 'uuid'; */
import { LoginDto } from './dto/login.user.dto';
import { createUserDto } from './dto/crate.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /* async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  } */

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { user, token };
  }

  async register(createUserDto: createUserDto) {
    // Encriptar la contraseña antes de guardar el usuario
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    // Crear el usuario con la contraseña encriptada
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    console.log('Usuario registrado:', user);

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { user, token };
  }
}
