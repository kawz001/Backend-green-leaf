import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { TrailsModule } from './trails/trails.module';
import { TrailRatingsModule } from './trail-ratings/trail-ratings.module';
import { TrailCommentsModule } from './trail-comments/trail-comments.module';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TrailsModule,
    TrailRatingsModule,
    TrailCommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
