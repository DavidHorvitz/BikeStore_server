export interface Products {
    product_id: number;
    product_name: string;
    brand_id?: number;
    category_id?: number;
    model_year: Date;
    list_price: number;
}