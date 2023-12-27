import { Sequelize, DataTypes, Model, ModelStatic, QueryTypes } from "sequelize";
import * as AppModel from '../../../model/index'
import { CategoriesInterface } from "./Categories";
import { BrandsInterface } from "./Brands";

type ProductSchemaModel = Model<AppModel.Products.Products>

export interface ProductsInterface {
    Schema: ModelStatic<ProductSchemaModel>
    getAllProducts: () => Promise<AppModel.Products.Products[] | undefined>
    getProductById: (productId: number) => Promise<AppModel.Products.Products | undefined>


}

export async function createProductsTable(sequelize: Sequelize,
    Categories: CategoriesInterface["Schema"],
    Brands: BrandsInterface["Schema"]
): Promise<ProductsInterface> {
    const ProductsSchema = sequelize.define<ProductSchemaModel>("products", {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER
        },
        product_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        model_year: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        list_price: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    }, {
        schema: "production",
        createdAt: false,
        updatedAt: false,
    })
    ProductsSchema.belongsTo(Categories, { foreignKey: 'category_id' });
    ProductsSchema.belongsTo(Brands, { foreignKey: 'brand_id' });
    await ProductsSchema.sync();

    return {
        Schema: ProductsSchema,
        async getAllProducts() {
            try {
                const [result]: any = await sequelize.query('SELECT * FROM "BikeStores".production.products ORDER BY "product_id" ASC');
                return result;
            } catch (error) {
                console.error(error);
                return 0; // Return 0 in case of an error
            }
        },
        async getProductById(productId: number) {
            try {
                const result: any = await sequelize.query(
                    `SELECT P.*
                     FROM "BikeStores".production.products AS P
                     WHERE P.product_id = ${productId}`,
                    { type:QueryTypes.SELECT } // Specify the query type as SELECT
                );
                return result;
            } catch (error) {
                console.error(error);
                return 0; // Return 0 in case of an error
            }
        }
        


    };
}