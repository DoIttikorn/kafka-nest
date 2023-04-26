import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './consumer.service';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}
  async onModuleInit() {
    await this.consumerService.consume(
      { topics: ['test'] },
      {
        eachMessage: async ({ message, partition }) => {
          console.log({
            value: message.value.toString(),
            key: message.key ? message.key.toString() : null,
            partition: partition ? partition.toString() : 'null',
          });
        },
      },
    );
  }
}
