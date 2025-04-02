import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('weather')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWeatherForecast() {
    return this.appService.getWeatherForecast();
  }
}
