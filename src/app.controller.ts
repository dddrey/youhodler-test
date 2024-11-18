import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health')
  getHealth(): { ok: boolean } {
    return { ok: true };
  }
}
