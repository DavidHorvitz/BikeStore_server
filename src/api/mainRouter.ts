import express from "express"
import { initDB } from "../db"
import cors from 'cors';
import { createProductsRouter } from './production/productsRouter';
import { createBrandsRouter } from "./production/brandsRouter";
import { createCategoriesRouter } from "./production/categoriesRouter";
import { createStocksRouter } from "./production/stocks";
import { createCustomersRouter } from "./sales/customersRouter";
import { createOrder_itemsRouter } from "./sales/order_items";
import { createOrdersRouter } from "./sales/orders";
import { createStaffsRouter } from "./sales/staffs";
import { createStoresRouter } from "./sales/stores";


export async function createServer() {
    const db = await initDB();
    const productRouter = createProductsRouter(db);
    const brandsRouter = createBrandsRouter(db);
    const categoriesRouter = createCategoriesRouter(db);
    const stocksRouter = createStocksRouter(db);
    const order_itemsRouter = createOrder_itemsRouter(db);
    const ordersRouter = createOrdersRouter(db);
    const customersRouter = createCustomersRouter(db);
    const staffsRouter = createStaffsRouter(db);
    const storesRouter = createStoresRouter(db);

    const app = express();
    app.use(cors());
    app.use(express.json())
    app.use("/products", productRouter);
    app.use("/brands", brandsRouter);
    app.use("/categories", categoriesRouter);
    app.use("/stocks", stocksRouter);
    app.use("/order_items", order_itemsRouter);
    app.use("/orders", ordersRouter);
    app.use("/customers", customersRouter);
    app.use("/staffs", staffsRouter);
    app.use("/stores", storesRouter);



    app.listen(8090, () => {
        console.log("listening")
    })
}