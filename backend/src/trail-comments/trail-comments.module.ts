import { Module } from '@nestjs/common';
import { TrailCommentsService } from './trail-comments.service';
import { TrailCommentsController } from './trail-comments.controller';
import { TrailComment } from './entities/trail-comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trail } from 'src/trails/entities/trail.entity';
import { TrailsModule } from 'src/trails/trails.module';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trail, User, TrailComment]),
    UsersModule,
    TrailsModule
  ],
  controllers: [TrailCommentsController],
  providers: [
    TrailCommentsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class TrailCommentsModule {}
