import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import * as AppModel from '../../../model/index'
import { ProductsInterface } from "./Products";
import { StoresInterface } from "../sales/Stores";



type StocksSchemaModel = Model<AppModel.Stocks.Stocks>

export interface StocksInterface {
    Schema: ModelStatic<StocksSchemaModel>
    getAll_In_Stocks: () => Promise<AppModel.Stocks.Stocks[] | undefined>


}

export async function createStocksTable(sequelize: Sequelize,
    Products: ProductsInterface["Schema"],
    Stores: StoresInterface["Schema"],)
    : Promise<StocksInterface> {
    const StocksSchema = sequelize.define<StocksSchemaModel>("stocks", {
        quantity: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER
        },
    }, {
        schema: "production",
        createdAt: false,
        updatedAt: false,
    })
    Products.belongsToMany(Stores, { through: StocksSchema });
    Stores.belongsToMany(Products, { through: StocksSchema });

    await StocksSchema.sync();

    return {
        Schema: StocksSchema,
        async getAll_In_Stocks() {
            try {
                const [result]: any = await sequelize.query('SELECT * FROM "BikeStores".production.stocks ORDER BY "quantity" DESC');
                return result;
            } catch (error) {
                console.error(error);
                return 0; // Return 0 in case of an error
            }
        },
    };
}