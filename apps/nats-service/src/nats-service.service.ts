import { Injectable } from '@nestjs/common';

@Injectable()
export class NatsServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
