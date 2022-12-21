export interface IOrder {
  id: number;
  created_at: Date;
  create_by: number;
  tour_id: number;
  customer_id: number;
  status: string;
  overall_price: number;
  customized_price: number;
  discount: number;
  is_active: boolean;
}
