import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMemoryServerMongoUri } from './helper';

@Module({
  imports: [
    /**
     * @dev Config .env
     */
    ConfigModule.forRoot(),

    EventsModule,
    /**
     * @dev Initialize database
     */
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      /**
       * @dev need to override the useFactory
       * @param configService
       */
      useFactory: async (configService: ConfigService) => {
        /**
         * @dev Extract env.
         */
        const env = configService.get<string>('NODE_ENV');

        let uri;

        /**
         * @dev For test env we can just use memory server uri.
         */
        if (env === 'test') uri = await getMemoryServerMongoUri();
        else uri = configService.get<string>('MONGO_URL');

        /**
         * @dev Return the uri.
         */
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
