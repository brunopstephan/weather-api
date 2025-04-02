import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

type Response = {
  daily: {
    dt: number;
    rain?: number;
  }[];
};

@Injectable()
export class WeatherApiService {
  private apiKey: string;

  private LAT = '-22.6139';
  private LON = '-46.7003';
  private EXCLUDE = 'current,minutely,hourly,alerts';

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.getOrThrow('API_KEY');

    if (!this.apiKey) {
      throw new BadRequestException('API_KEY is not defined');
    }
  }

  async getWeather() {
    const forecasts = await axios
      .get<Response>(`https://api.openweathermap.org/data/3.0/onecall`, {
        params: {
          lat: this.LAT,
          lon: this.LON,
          exclude: this.EXCLUDE,
          units: 'metric',
          appid: this.apiKey,
        },
      })
      .then((response) => {
        const daily = response.data.daily;

        const targetDates = ['2025-04-07', '2025-04-08', '2025-04-09'];
        const forecasts = daily
          .map((day) => {
            const date = new Date(day.dt * 1000).toISOString().split('T')[0];
            return {
              date: date,
              rain: day.rain || 0,
            };
          })
          .filter((day) => targetDates.includes(day.date));

        return forecasts;
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        throw new BadRequestException('Error fetching weather data');
      });

    return forecasts;
  }
}
