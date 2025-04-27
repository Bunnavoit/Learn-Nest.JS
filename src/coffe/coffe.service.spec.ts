import { Test, TestingModule } from '@nestjs/testing';
import { CoffeService } from './coffe.service';

describe('CoffeService', () => {
  let service: CoffeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeService],
    }).compile();

    service = module.get<CoffeService>(CoffeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
