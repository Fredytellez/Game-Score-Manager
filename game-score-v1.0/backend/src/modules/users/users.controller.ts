import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  async getProfile(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('scores/:id')
  async getScores(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return user.scores;
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile/:id')
  async updateProfile(@Param('id') id: string, @Body() updateUserDto: any) {
    await this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/:userId')
  async enableOrDisableUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: any,
  ) {
    await this.usersService.update(userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/:userId')
  async deleteUser(@Param('userId') userId: string) {
    await this.usersService.remove(userId);
  }

  /* @UseGuards(JwtAuthGuard)
  @Delete('admin/scores/:userId')
  async deleteScore(@Param('userId') userId: string) {
    // Implementar lógica para eliminar una puntuación específica
  } */
}
