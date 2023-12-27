import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import * as AppModel from '../../../model/index'
import { ProductsInterface } from "../production/Products";
import { OrdersInterface } from "./Orders";
type Order_itemsSchemaModel = Model<AppModel.Order_items.Order_items>

export interface Order_itemsInterface {
    Schema: ModelStatic<Order_itemsSchemaModel>
    getAllOrder_items: () => Promise<AppModel.Order_items.Order_items[] | undefined>
    Calculate_the_total_revenue_generated_by_the_store: () => Promise<number>
}

export async function createOrder_itemsTable(sequelize: Sequelize,
    Products: ProductsInterface["Schema"],
    Orders: OrdersInterface["Schema"]
): Promise<Order_itemsInterface> {
    const Order_itemsSchema = sequelize.define<Order_itemsSchemaModel>("order_items", {
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER
        },

        item_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER
        },

        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER
        },

        quantity: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER
        },

        list_price: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER
        },

        discount: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER
        },



    }, {
        schema: "sales",
        createdAt: false,
        updatedAt: false,
    })
    Order_itemsSchema.belongsTo(Products, { foreignKey: 'product_id' })
    Order_itemsSchema.belongsTo(Orders, { foreignKey: 'order_id' })
    await Order_itemsSchema.sync();

    return {
        Schema: Order_itemsSchema,
        async getAllOrder_items() {
            try {
                const [result]: any = await sequelize.query('SELECT * FROM "BikeStores".sales.order_items ORDER BY "order_id" ASC');
                return result;
            } catch (error) {
                console.error(error);
                return 0; // Return 0 in case of an error
            }
        },
        async Calculate_the_total_revenue_generated_by_the_store(){
                try {
                    const [result]: any = await sequelize.query(`
                    SELECT SUM(OI.list_price * OI.quantity) AS Total_revenue
                    FROM "BikeStores".sales.order_items AS OI
                    JOIN "BikeStores".sales.orders AS O ON OI.order_id = O.order_id
                `);
                // return result[0].Total_revenue;
                return result;
            } catch (error) {
                console.error(error);
                return 0; // Return 0 in case of an error
            } 
        }


    };
}