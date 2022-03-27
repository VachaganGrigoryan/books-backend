import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherController } from './publisher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Publisher, PublisherSchema } from './schemas/publisher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Publisher.name,
        schema: PublisherSchema,
      },
    ]),
  ],
  controllers: [PublisherController],
  providers: [PublisherService],
})
export class PublisherModule {}
