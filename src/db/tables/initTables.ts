import { Sequelize } from "sequelize";
import { ProductsInterface, createProductsTable } from "./production/Products";
import { BrandsInterface, createBrandsTable } from "./production/Brands";
import { CategoriesInterface, createCategoriesTable } from "./production/Categories";
import { CustomersInterface, createCustomersTable } from "./sales/Customers";
import { Order_itemsInterface, createOrder_itemsTable } from "./sales/Order_items";
import { OrdersInterface, createOrdersTable } from "./sales/Orders";
import { StaffsInterface, createStaffsTable } from "./sales/Staffs";
import { StoresInterface, createStoresTable } from "./sales/Stores";
import { StocksInterface, createStocksTable } from "./production/Stocks";


export async function initTables(connection: Sequelize) {
    const brands = await createBrandsTable(connection);
    const categories = await createCategoriesTable(connection);
    const products = await createProductsTable(connection, categories.Schema, brands.Schema);
    const stores = await createStoresTable(connection);
    const customers = await createCustomersTable(connection);
    const stocks = await createStocksTable(connection, products.Schema, stores.Schema);
    const staffs = await createStaffsTable(connection, stores.Schema);
    const orders = await createOrdersTable(connection, customers.Schema, stores.Schema, staffs.Schema);
    const order_items = await createOrder_itemsTable(connection, products.Schema, orders.Schema);
    return {
        Products: products,
        Brands: brands,
        Categories: categories,
        Stocks: stocks,
        Customers: customers,
        Order_items: order_items,
        Orders: orders,
        Staffs: staffs,
        Stores: stores
    }
}
export type DB = {
    Products: ProductsInterface,
    Brands: BrandsInterface,
    Categories: CategoriesInterface,
    Stocks: StocksInterface,
    Customers: CustomersInterface,
    Order_items: Order_itemsInterface,
    Orders: OrdersInterface,
    Staffs: StaffsInterface,
    Stores: StoresInterface
}


