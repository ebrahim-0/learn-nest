export interface Product {
  id: number;
  title: string;
  description: string;
  details: {
    color: string;
    price: number;
    size: string;
  };
}
