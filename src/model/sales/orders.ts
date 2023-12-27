export interface Orders {
    order_id: number;
    customer_id?: number;
    order_status: number;
    order_date: Date;
    required_date: Date;
    shipped_date: Date;
    store_id?: number;
    staff_id?: number;
}