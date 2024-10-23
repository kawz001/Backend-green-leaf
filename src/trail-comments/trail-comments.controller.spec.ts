import { Test, TestingModule } from '@nestjs/testing';
import { TrailCommentsController } from './trail-comments.controller';
import { TrailCommentsService } from './trail-comments.service';

describe('TrailCommentsController', () => {
  let controller: TrailCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrailCommentsController],
      providers: [TrailCommentsService],
    }).compile();

    controller = module.get<TrailCommentsController>(TrailCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
