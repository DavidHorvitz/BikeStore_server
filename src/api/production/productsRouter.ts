import express, { Request, Response } from "express"
import { DB } from "../../db";

export function createProductsRouter(db: DB) {
    const productRouter = express.Router();


    //This get the all products asc
    productRouter.get('/', async (req: Request, res: Response) => {
        const product = await db.Products.getAllProducts();
        if (!product) {
            res.status(404).json({ status: "Not Found some product !" })
        }
        res.status(200).json(product)
    },
        productRouter.get('/:product_id', async (req, res) => {
            const { product_id } = req.params;
            const productIdNumber = parseInt(product_id, 10);

            if (isNaN(productIdNumber)) {
                res.status(400).json({ status: 'bad request', message: 'Invalid product_id' });
                return;
            }

            const product = await db.Products.getProductById(productIdNumber);
            if (!product) {
                res.status(404).json({ status: "Not Found" })
            } else {
                res.json(product)
            }
            console.log("product", product);

        })
    )

    return productRouter;
}