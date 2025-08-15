export interface ProductType {
  product_id: string;
  product_title: string;
  product_price: number;
  product_description?: string;
  product_image?: string;
  product_category?: string;
}

export interface ProductListParamsType {
  page: number;
  limit: number;
  offset: number;
  search?: string;
}
