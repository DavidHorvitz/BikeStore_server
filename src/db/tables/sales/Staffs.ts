import { Sequelize, DataTypes, Model, ModelStatic } from "sequelize";
import * as AppModel from '../../../model/index'
import { StoresInterface } from "./Stores"

type StaffsSchemaModel = Model<AppModel.Staffs.Staffs>

export interface StaffsInterface {
    Schema: ModelStatic<StaffsSchemaModel>
    getAllStaffs: () => Promise<AppModel.Staffs.Staffs[] | undefined>

}

export async function createStaffsTable(sequelize: Sequelize,
    Stores: StoresInterface["Schema"]
): Promise<StaffsInterface> {
    const StaffsSchema = sequelize.define<StaffsSchemaModel>("staffs", {
        staff_id: {
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
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        phone: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        active: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.INTEGER
        }
       
    }, {
        schema: "sales",
        createdAt: false,
        updatedAt: false,
    })
    StaffsSchema.belongsTo(Stores, { foreignKey: 'store_id' });
    StaffsSchema.belongsTo(StaffsSchema, { foreignKey: 'manager_id' });
    // It has a many-to-one relationship with itself through the manager_id foreign key.
    await StaffsSchema.sync();

    return {
        Schema: StaffsSchema,
        async getAllStaffs() {
            try {
                const [result]: any = await sequelize.query('SELECT * FROM "BikeStores".sales.staffs ORDER BY "staff_id" ASC');
                return result;
            } catch (error) {
                console.error(error);
                return 0; // Return 0 in case of an error
            }
        },


    };
}