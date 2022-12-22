export interface Message {
  id: number;
  createdAt: Date;
  text: string;
  senderName: string;
  receiverName: string;
  isActive: boolean;
}