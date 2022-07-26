import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { MongodbConfigService } from './config/mongodb.config.service';
import { LoggerMiddleware } from './logger.middleware';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { PublisherModule } from './publisher/publisher.module';
import { SeriesModule } from './series/series.module';
import { MediaController } from './media/media.controller';
import { MediaModule } from './media/media.module';

console.log(configuration());

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: `env/.env.${process.env.NODE_ENV}`,
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoDb.url'),
      }),
      inject: [ConfigService],
    }),
    MediaModule,
    UserModule,
    AuthModule,
    CategoryModule,
    BookModule,
    AuthorModule,
    PublisherModule,
    SeriesModule,
  ],
  providers: [MongodbConfigService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
