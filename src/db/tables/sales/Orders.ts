
import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import * as AppModel from '../../../model/index'
import { CustomersInterface } from "./Customers";
import { StoresInterface } from "./Stores";
import { StaffsInterface } from "./Staffs";

type OrdersSchemaModel = Model<AppModel.Orders.Orders>

export interface OrdersInterface {
    Schema: ModelStatic<OrdersSchemaModel>
    getAllOrders: () => Promise<AppModel.Orders.Orders[] | undefined>

}

export async function createOrdersTable(sequelize: Sequelize,
    Customers: CustomersInterface["Schema"],
    Stores: StoresInterface["Schema"],
    Staffs: StaffsInterface["Schema"]
): Promise<OrdersInterface> {
    const OrdersSchema = sequelize.define<OrdersSchemaModel>("orders", {
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER
        },
        order_date: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER
        },
        order_status: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER
        },
        required_date: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER
        },

        shipped_date: {
            type: DataTypes.DATEONLY,
            primaryKey: true,
            defaultValue: DataTypes.DATEONLY
        },

    }, {
        schema: "sales",
        createdAt: false,
        updatedAt: false,
    })
    OrdersSchema.belongsTo(Customers, { foreignKey: 'customer_id' });
    OrdersSchema.belongsTo(Stores, { foreignKey: 'store_id' });
    OrdersSchema.belongsTo(Staffs, { foreignKey: 'staff_id' });
    await OrdersSchema.sync();

    return {
        Schema: OrdersSchema,
        async getAllOrders() {
            try {
                const [result]: any = await sequelize.query('SELECT * FROM "BikeStores".sales.orders ORDER BY "order_id" ASC');
                return result;
            } catch (error) {
                console.error(error);
                return 0; // Return 0 in case of an error
            }
        },


    };
}