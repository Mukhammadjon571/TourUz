export interface IUser {
  id: number;
  created_at: Date;
  created_by: number;
  updated_at: Date;
  updated_by: number;
  full_name: string;
  username: string | null;
  password: string;
  phone_number: string;
  email: string | null;
  is_verified: boolean;
  is_active: boolean;
  is_admin: boolean;
}
