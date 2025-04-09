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
  [key: number]: { amount: number; totalPrice?: string; title?: string };
};

export type cartProduct = { amount: number; totalPrice: string; title: string };

export type pageState = {
  currentPage: number;
  itemsPerPage: number;
  lastIndex: number;
  firstIndex: number;
  currentData: SingleProductType[];
};

export type categoryState = {
  loading: boolean;
  categories: string[];
  currentCategory: "";
  error: string;
};

export type categoriesType = string[];

export interface CollapseState {
  [key: string]: boolean;
}
