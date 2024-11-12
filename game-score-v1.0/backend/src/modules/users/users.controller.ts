import { Controller, Get, Param, Put, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from '../auth/dto/update.user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* @Get()
  getAllUsers(): User[] {
    return this.usersService.getAllUsers();
  } */

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  async getProfile(@Param('id') id: string) {
    return this.usersService.getProfile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('scores/:id')
  async getScores(@Param('id') id: string) {
    return this.usersService.getScores(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile/:id')
  async updateProfile(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(id, updateUserDto);
  }
}
