export interface filterProduct {
  type?: string;
  name?: { $regex: string; $options: 'i' };
  state?: string;
  limit?: number;
}
