import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/v1/scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  async addScore(@Param('userId') userId: number, @Body() createScoreDto: any) {
    return this.scoresService.create({
      ...createScoreDto,
      user: { id: userId },
    });
  }

  @Get('leaderboard')
  async getLeaderboard() {
    return this.scoresService.findLeaderboard();
  }
}
