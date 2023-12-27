import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import * as AppModel from '../../../model/index'

type CustomersSchemaModel = Model<AppModel.Customers.Customers>

export interface CustomersInterface {
    Schema: ModelStatic<CustomersSchemaModel>
    getAllCustomers: () => Promise<AppModel.Customers.Customers[] | undefined>

}

export async function createCustomersTable(sequelize: Sequelize): Promise<CustomersInterface> {
    const CustomersSchema = sequelize.define<CustomersSchemaModel>("customers", {
        customer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER
        },
        first_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        phone: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        street: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        city: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        state: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        zip_code: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    

    }, {
        schema: "sales",
        createdAt: false,
        updatedAt: false,
    })

    await CustomersSchema.sync();

    return {
        Schema: CustomersSchema,
        async getAllCustomers() {
            try {
                const [result]:any = await sequelize.query('SELECT * FROM "BikeStores".sales.customers ORDER BY "customer_id" ASC');
                return result;
            } catch (error) {
                console.error(error);
                return 0; // Return 0 in case of an error
            }
        },
    

    };
}