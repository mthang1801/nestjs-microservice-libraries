import { Test, TestingModule } from '@nestjs/testing';
import { ExceljsController } from './exceljs.controller';
import { ExceljsService } from './exceljs.service';

describe('ExceljsController', () => {
  let exceljsController: ExceljsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExceljsController],
      providers: [ExceljsService],
    }).compile();

    exceljsController = app.get<ExceljsController>(ExceljsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(exceljsController.getHello()).toBe('Hello World!');
    });
  });
});
