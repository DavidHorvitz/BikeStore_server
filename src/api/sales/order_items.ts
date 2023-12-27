import express, { Request, Response } from "express"
import { DB } from "../../db";

export function createOrder_itemsRouter(db: DB) {
    const order_itemsRouter = express.Router();


    //This get the all order_items asc
    order_itemsRouter.get('/', async (req: Request, res: Response) => {
        const order_items = await db.Order_items.getAllOrder_items();
        if (!order_items) {
            res.status(404).json({ status: "Not Found some order_items !" })
        }
        res.status(200).json(order_items)
    })

    //Calculate_the_total_revenue_generated_by_the_store
    order_itemsRouter.get('/total-revenue-store', async (req: Request, res: Response) => {
        const order_items = await db.Order_items.Calculate_the_total_revenue_generated_by_the_store();
        if (!order_items) {
            res.status(404).json({ status: "Not Found some count order_items !" })
        }
        res.status(200).json(order_items)
    })

    return order_itemsRouter;
}