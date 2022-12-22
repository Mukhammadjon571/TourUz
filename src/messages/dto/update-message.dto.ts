import { PartialType } from '@nestjs/swagger';
import { CreateMessageDTO } from './messages.dto';

export class UpdateMessageDTO extends PartialType(CreateMessageDTO) {}
