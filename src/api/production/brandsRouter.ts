import express, { Request, Response } from "express"
import { DB } from "../../db";

export function createBrandsRouter(db:DB){
    const brandsRouter = express.Router();

   
      //This get the all brands asc
      brandsRouter.get('/', async (req: Request, res: Response) => {
        const brands = await db.Brands.getAllBrands();
        if (!brands) {
            res.status(404).json({ status: "Not Found some brands !" })
        }
        res.status(200).json(brands)
    })
   
    return brandsRouter;
}