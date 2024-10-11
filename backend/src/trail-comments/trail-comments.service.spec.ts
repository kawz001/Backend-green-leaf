import { Test, TestingModule } from '@nestjs/testing';
import { TrailCommentsService } from './trail-comments.service';

describe('TrailCommentsService', () => {
  let service: TrailCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrailCommentsService],
    }).compile();

    service = module.get<TrailCommentsService>(TrailCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
