import { Test, TestingModule } from '@nestjs/testing';
import { RmqTransporterController } from './rmq-transporter.controller';
import { RmqTransporterService } from './rmq-transporter.service';

describe('RmqTransporterController', () => {
  let rmqTransporterController: RmqTransporterController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RmqTransporterController],
      providers: [RmqTransporterService],
    }).compile();

    rmqTransporterController = app.get<RmqTransporterController>(RmqTransporterController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rmqTransporterController.getHello()).toBe('Hello World!');
    });
  });
});
