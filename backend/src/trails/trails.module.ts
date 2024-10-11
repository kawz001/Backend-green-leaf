import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrailsService } from './trails.service';
import { TrailsController } from './trails.controller';
import { User } from '../users/entities/user.entity';
import { Trail } from './entities/trail.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trail, User]),
    UsersModule
  ],
  providers: [
    TrailsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [TrailsController],
  exports: [TrailsService, TypeOrmModule],
})
export class TrailsModule {}
