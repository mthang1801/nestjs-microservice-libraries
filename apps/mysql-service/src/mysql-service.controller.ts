import { Controller, Get } from '@nestjs/common';
import { MysqlServiceService } from './mysql-service.service';

@Controller()
export class MysqlServiceController {
  constructor(private readonly mysqlServiceService: MysqlServiceService) {}

  @Get()
  getHello(): string {
    return this.mysqlServiceService.getHello();
  }
}
