import { Test, TestingModule } from '@nestjs/testing';
import { MysqlServiceController } from './mysql-service.controller';
import { MysqlServiceService } from './mysql-service.service';

describe('MysqlServiceController', () => {
  let mysqlServiceController: MysqlServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MysqlServiceController],
      providers: [MysqlServiceService],
    }).compile();

    mysqlServiceController = app.get<MysqlServiceController>(MysqlServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(mysqlServiceController.getHello()).toBe('Hello World!');
    });
  });
});
