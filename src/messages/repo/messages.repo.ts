import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateMessageDTO } from '../dto/messages.dto';
import { UpdateMessageDTO } from '../dto/update-message.dto';

@Injectable()
export class MessagesRepo {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async createMessage(message: CreateMessageDTO) {
    return (await this.knex('messages').insert(message).returning('*'))[0];
  }

  async getMessages() {
    return await this.knex('messages').select('*').where({ is_active: true });
  }

  async getMessageById(id: number) {
    return await this.knex('messages').select('*').where('id', id);
  }

  async updateMessageById(id: number, message: UpdateMessageDTO) {
    await this.knex('messages').update(message).where('id', id);
  }

  async deleteMessageById(id: number) {
    await this.knex('messages').where('id', id).del();
  }
}
