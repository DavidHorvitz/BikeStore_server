import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import * as AppModel from '../../../model/index'

type StoresSchemaModel = Model<AppModel.Stores.Stores>;

export interface StoresInterface {
    Schema: ModelStatic<StoresSchemaModel>
    getAllStores: () => Promise<AppModel.Stores.Stores[] | undefined>

}

export async function createStoresTable(sequelize: Sequelize): Promise<StoresInterface> {
    const StoresSchema = sequelize.define<StoresSchemaModel>("stores", {
        store_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER
        },
        store_name: {
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

    await StoresSchema.sync();

    return {
        Schema: StoresSchema,
        async getAllStores() {
            try {
                const [result]: any = await sequelize.query('SELECT * FROM "BikeStores".sales.stores ORDER BY "store_id" ASC');
                return result;
            } catch (error) {
                console.error(error);
                return 0; // Return 0 in case of an error
            }
        },


    };
}