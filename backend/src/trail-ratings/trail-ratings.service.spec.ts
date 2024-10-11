import { Test, TestingModule } from '@nestjs/testing';
import { TrailRatingsService } from './trail-ratings.service';

describe('TrailRatingsService', () => {
  let service: TrailRatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrailRatingsService],
    }).compile();

    service = module.get<TrailRatingsService>(TrailRatingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
