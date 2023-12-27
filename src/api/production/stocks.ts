import express, { Request, Response } from "express"
import { DB } from "../../db";

export function createStocksRouter(db: DB) {
    const stocksRouter = express.Router();


    //This get the all stocks asc
    stocksRouter.get('/', async (req: Request, res: Response) => {
        const stocks = await db.Stocks.getAll_In_Stocks();
        if (!stocks) {
            res.status(404).json({ status: "Not Found some stocks !" })
        }
        res.status(200).json(stocks)
    });
       


    return stocksRouter;
}