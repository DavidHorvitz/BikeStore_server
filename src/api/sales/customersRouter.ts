import express, { Request, Response } from "express"
import { DB } from "../../db";

export function createCustomersRouter(db:DB){
    const customersRouter = express.Router();

   
      //This get the all customers asc
      customersRouter.get('/', async (req: Request, res: Response) => {
        const customers = await db.Customers.getAllCustomers();
        if (!customers) {
            res.status(404).json({ status: "Not Found some customers !" })
        }
        res.status(200).json(customers)
    })
   
    return customersRouter;
}