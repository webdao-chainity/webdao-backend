import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

/**
 * @dev Initialize Config service.
 */
const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: configService.get<string>('CORS', '').split(','),
      methods: ['GET', 'PUT', 'POST'],
    },
  });
  /**
   * @dev Extract server configurations.
   */
  const nodeEnv = configService.get('NODE_ENV', 'development');
  const port = Number(configService.get('PORT', 5000));
  const host = configService.get<string>('HOST', '0.0.0.0');

  /**
   * @dev Start application.
   */
  if (nodeEnv === 'production') {
    await app.listen(port, host);
  } else {
    await app.listen(port);
  }

  console.log(`App is running at: ${host}:${port}`);
  return app;
}
bootstrap();
