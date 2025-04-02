import { Injectable } from '@nestjs/common';
import { WeatherApiService } from './providers/weather-api.service';

@Injectable()
export class AppService {
  constructor(private readonly weatherApiService: WeatherApiService) {}

  async getWeatherForecast() {
    return this.weatherApiService.getWeather();
  }
}
