import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './entities/score.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private scoresRepository: Repository<Score>,
  ) {}

  async create(score: any): Promise<Score> {
    return this.scoresRepository.save(score);
  }

  async findAll(): Promise<Score[]> {
    return this.scoresRepository.find({ relations: ['user'] });
  }

  async findByUserId(userId: string): Promise<Score[]> {
    return this.scoresRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findLeaderboard(): Promise<Score[]> {
    return this.scoresRepository.find({
      order: { score: 'DESC' },
      relations: ['user'],
    });
  }
}
