import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessagesRepo } from './repo/messages.repo';


@Module({
  providers: [MessagesService,MessagesRepo],
  controllers: [MessagesController]
})
export class MessagesModule {}
