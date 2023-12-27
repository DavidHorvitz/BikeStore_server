import express, { Request, Response } from "express"
import { DB } from "../../db";

export function createStaffsRouter(db: DB) {
    const staffsRouter = express.Router();


    //This get the all orders asc
    staffsRouter.get('/', async (req: Request, res: Response) => {
        const staffs = await db.Staffs.getAllStaffs();
        if (!staffs) {
            res.status(404).json({ status: "Not Found some staffs !" })
        }
        res.status(200).json(staffs)
    })

    return staffsRouter;
}