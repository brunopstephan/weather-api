import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import zodValidatorPipe from './pipes/zod-validator.pipe';
import { WeatherApiService } from './providers/weather-api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, zodValidatorPipe, WeatherApiService],
})
export class AppModule {}
