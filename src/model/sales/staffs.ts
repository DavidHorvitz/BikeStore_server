export interface Staffs {
    staff_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    active: number;
    store_id?: number;
    manager_id?: number;
}