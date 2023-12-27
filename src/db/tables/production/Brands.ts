import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import * as AppModel from '../../../model/index'

type BrandsSchemaModel = Model<AppModel.Brands.Brands>

export interface BrandsInterface {
    Schema: ModelStatic<BrandsSchemaModel>
    getAllBrands: () => Promise<AppModel.Brands.Brands[] | undefined>

}

export async function createBrandsTable(sequelize: Sequelize): Promise<BrandsInterface> {
    const BrandsSchema = sequelize.define<BrandsSchemaModel>("brands", {
        brand_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER
        },
        brand_name: {
            type: DataTypes.TEXT,
            allowNull: false
        }
      

    }, {
        schema: "production",
        createdAt: false,
        updatedAt: false,
    })

    await BrandsSchema.sync();

    return {
        Schema: BrandsSchema,
        async getAllBrands() {
            try {
                const [result]:any = await sequelize.query('SELECT * FROM "BikeStores".production.brands ORDER BY "brand_id" ASC');
                return result;
            } catch (error) {
                console.error(error);
                return 0; // Return 0 in case of an error
            }
        },
    

    };
}