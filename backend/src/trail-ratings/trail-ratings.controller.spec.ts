import { Test, TestingModule } from '@nestjs/testing';
import { TrailRatingsController } from './trail-ratings.controller';
import { TrailRatingsService } from './trail-ratings.service';

describe('TrailRatingsController', () => {
  let controller: TrailRatingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrailRatingsController],
      providers: [TrailRatingsService],
    }).compile();

    controller = module.get<TrailRatingsController>(TrailRatingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
