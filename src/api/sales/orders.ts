import express, { Request, Response } from "express"
import { DB } from "../../db";

export function createOrdersRouter(db: DB) {
    const ordersRouter = express.Router();


    //This get the all orders asc
    ordersRouter.get('/', async (req: Request, res: Response) => {
        const orders = await db.Orders.getAllOrders();
        if (!orders) {
            res.status(404).json({ status: "Not Found some orders !" })
        }
        res.status(200).json(orders)
    })

    return ordersRouter;
}