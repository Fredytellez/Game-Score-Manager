import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ScoresModule } from './modules/scores/scores.module';
import { User } from './modules/users/entities/user.entity';
import { Score } from './modules/scores/entities/score.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'db', // db es el nombre del servicio del contenedor de PostgreSQL
      port: Number(process.env.DB_PORT) || 5432, // El puerto dentro del contenedor de PostgreSQL (5432)
      username: process.env.DB_USERNAME || 'myuser',
      password: process.env.DB_PASSWORD || 'mypassword',
      database: process.env.DB_NAME || 'mydb',
      entities: [User, Score],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Score]),
    AuthModule,
    UsersModule,
    ScoresModule,
  ],
})
export class AppModule {}
