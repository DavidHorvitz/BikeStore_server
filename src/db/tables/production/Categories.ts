import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import * as AppModel from '../../../model/index';
import { QueryTypes } from 'sequelize';

type CategoriesSchemaModel = Model<AppModel.Categories.Categories>

export interface CategoriesInterface {
    Schema: ModelStatic<CategoriesSchemaModel>
    getAllCategories: () => Promise<AppModel.Categories.Categories[] | undefined>
    get_products_by_category_id: (category_id: number) => Promise<[any] >

}

export async function createCategoriesTable(sequelize: Sequelize): Promise<CategoriesInterface> {
    const CategoriesSchema = sequelize.define<CategoriesSchemaModel>("categories", {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER
        },
        category_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        category_img: {
            type: DataTypes.TEXT,
            allowNull: false
        }
      

    }, {
        schema: "production",
        createdAt: false,
        updatedAt: false,
    })

    await CategoriesSchema.sync();

    return {
        Schema: CategoriesSchema,
        async getAllCategories() {
            try {
                const [result]:any = await sequelize.query('SELECT * FROM "BikeStores".production.categories ORDER BY "category_id" ASC');
                return result;
            } catch (error) {
                console.error(error);
                return 0; // Return 0 in case of an error
            }
        },
        async get_products_by_category_id(category_id: number) {
            try {
                const [products]: any[] = await sequelize.query(
                    `SELECT P.*
                     FROM "BikeStores".production.categories AS C
                     JOIN "BikeStores".production.products AS P
                     ON C.category_id = P.category_id
                     WHERE C.category_id = ${category_id}
                     ORDER BY P.product_name ASC;`,
                );
        
                return products;// Return the array of products
                 
            } catch (error) {
                console.error(error);
                throw error; // Re-throw the error for proper handling
            }
        },
       
        

    };
}