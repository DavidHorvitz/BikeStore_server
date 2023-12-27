import express, { Request, Response } from "express"
import { DB } from "../../db";

export function createStoresRouter(db: DB) {
    const storesRouter = express.Router();


    //This get the all stores asc
    storesRouter.get('/', async (req: Request, res: Response) => {
        const stores = await db.Stores.getAllStores();
        if (!stores) {
            res.status(404).json({ status: "Not Found some staffs !" })
        }
        res.status(200).json(stores)
    })

    return storesRouter;
}