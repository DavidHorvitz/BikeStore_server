import express, { Request, Response } from "express"
import { DB } from "../../db";

export function createCategoriesRouter(db: DB) {
    const categoriesRouter = express.Router();


    //This get the all categories asc
    categoriesRouter.get('/', async (req: Request, res: Response) => {
        const categories = await db.Categories.getAllCategories();
        if (!categories) {
            res.status(404).json({ status: "Not Found some categories !" })
        }
        res.status(200).json(categories)
    })
    categoriesRouter.get('/:category_id/products/', async (req: Request, res: Response) => {
        const { category_id } = req.params;
        const categoryIdNumber = parseInt(category_id, 10); // Convert the category_id to a number

        if (isNaN(categoryIdNumber)) {
            res.status(400).json({ status: 'bad request', message: 'Invalid category_id' });
            return;
        }
        const category = await db.Categories.get_products_by_category_id(categoryIdNumber);

        if (!category) {
            res.status(404).json({ status: 'not found' });
        } else {
            res.status(200).json(category);
        }

        console.log(category);
    })

    return categoriesRouter;
}