import { Module } from '@nestjs/common';
import { TrailRatingsService } from './trail-ratings.service';
import { TrailRatingsController } from './trail-ratings.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { TrailsModule } from 'src/trails/trails.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trail } from 'src/trails/entities/trail.entity';
import { User } from 'src/users/entities/user.entity';
import { TrailRating } from './entities/trail-rating.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trail, User, TrailRating]),
    UsersModule,
    TrailsModule
  ],
  controllers: [TrailRatingsController],
  providers: [
    TrailRatingsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class TrailRatingsModule {}
