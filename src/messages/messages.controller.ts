import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UpdateMessageDTO } from './dto/update-message.dto';
import { CreateMessageDTO } from './dto/messages.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async createMessage(@Body() message: CreateMessageDTO) {
    await this.messagesService.createMessage(message);
  }

  @Get()
  async getMessages() {
    return await this.messagesService.getMessages();
  }

  @Get(':id')
  async getMessageById(@Param('id') id: number) {
    return await this.messagesService.getMessageById(id);
  }

  @Put(':id')
  async updateMessageById(
    @Param('id') id: number,
    @Body() message: UpdateMessageDTO,
  ) {
    await this.messagesService.updateMessageById(id, message);
  }

  @Delete(':id')
  async deleteMessageById(@Param('id') id: number) {
    await this.messagesService.deleteMessageById(id);
  }
}
