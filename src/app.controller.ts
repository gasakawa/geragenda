import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  @ApiOperation({
    summary: 'Health Check',
    description: 'Health check',
    operationId: 'health check',
  })
  @Get()
  healthCheck(): string {
    return 'Everything is okay';
  }
}
