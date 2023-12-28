import express, { Request, Response } from "express"
import { DB } from "../../db";

export function createCustomersRouter(db: DB) {
    const customersRouter = express.Router();

    //This get the all customers asc
    customersRouter.get('/', async (req: Request, res: Response) => {
        const customers = await db.Customers.getAllCustomers();
        if (!customers) {
            res.status(404).json({ status: "Not Found some customers !" })
        }
        res.status(200).json(customers)
    })
    //Note that I removed :studentId from the route path as it is not required for creating a new course
    customersRouter.post('/add-customer', async (req: Request, res: Response) => {
        const customer = await db.Customers.insert(req.body);
        if (!customer) {
            res.status(400).json({ error: 'Invalid customer data' });
        }
        else {
            res.status(200).json(customer);
        }
    })
    customersRouter.post('/login', async (req: Request, res: Response) => {
        const { email, password } = req.body;

        // Call the login function from the model
        const user = await db.Customers.login(email, password);

        if (user) {
            // Authentication successful
            res.status(200).json({ success: true, user });
        } else {
            // Invalid credentials
            res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
    });


    return customersRouter;
}