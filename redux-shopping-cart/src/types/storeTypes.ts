export interface ProductState {
  loading: boolean;
  products: SingleProductType[];
  error: string;
}

export type SingleProductType = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export type ApiProductType = SingleProductType[];

export type ProductStateApi = { product: ProductState };

export type CartStateType = { cart: cartStateApi };

export type cartStateApi = {
  error?: string | undefined;
  [key: number]: { amount: number; totalPrice?: number; title?: string };
};
