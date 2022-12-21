import { difficultyStatusEnum } from '../enums/difficultyStatus.enum';

export interface ITour {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  price: number;
  langitude: string;
  latitude: string;
  phone_number: string;
  email: string;
  short_description: string;
  long_description: string;
  days: number;
  difficulty: difficultyStatusEnum;
  start_date: Date;
  end_date: Date;
  start_location: string;
  end_location: string;
  image: string;
}
