import { Injectable } from '@nestjs/common';

@Injectable()
export class MysqlServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
