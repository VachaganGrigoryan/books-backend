import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config as awsConfig } from 'aws-sdk';

async function bootstrap() {
  // mongoose
  //   .connect('mongodb://localhost:27017/books-home')
  //   .then(() => console.log('DB connected!'));
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.use(csurf());
  const configService = app.get(ConfigService);

  awsConfig.update({
    region: configService.get('awsRegion'),
    accessKeyId: configService.get<string>('awsAccessKeyId'),
    secretAccessKey: configService.get<string>('awsSecretAccessKey'),
  });

  const config = new DocumentBuilder()
    .setTitle('Books Home')
    .setDescription('Api Documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix('/api');
  await app.listen(configService.get<number>('http.port'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
