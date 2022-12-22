import { Injectable } from '@nestjs/common';
import { MessagesRepo } from './repo/messages.repo';
import { UpdateMessageDTO } from './dto/update-message.dto';
import { CreateMessageDTO } from './dto/messages.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepo: MessagesRepo) {}

  async createMessage(message: CreateMessageDTO) {
    await this.messagesRepo.createMessage(message);
  }

  async getMessages() {
    return await this.messagesRepo.getMessages();
  }

  async getMessageById(id: number) {
    return await this.messagesRepo.getMessageById(id);
  }

  async updateMessageById(id: number, message: UpdateMessageDTO) {
    await this.messagesRepo.updateMessageById(id, message);
  }

  async deleteMessageById(id: number) {
    await this.messagesRepo.deleteMessageById(id);
  }
}
