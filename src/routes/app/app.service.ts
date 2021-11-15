import { Injectable } from '@nestjs/common';
import open from 'open';

@Injectable()
export default class AppService {
  async openSwagger(): Promise<void> {
    const url = 'http://localhost:3000/api';

    await open(url);
  }

  getHello(): string {
    return '<a href="/api">go to swagger!</api>';
  }
}
