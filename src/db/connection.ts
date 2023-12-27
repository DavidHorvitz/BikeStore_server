import { Sequelize } from "sequelize";

export function getConnection() {
    const sequelize = new Sequelize({
        database: 'BikeStores',
        username: "postgres",
        host: "localhost",
        dialect: "postgres",
        port: 5432,
        password: "!Q@W3e4r",
        logging: (sql) => {
            console.log("Query: %s", sql)
        }
    });
    return sequelize;
} 


// import { Sequelize } from 'sequelize';

// export function getConnection() {
//   const sequelize = new Sequelize({
//     database: 'BikeStore',
//     username: 'david', // replace with your SQL Server username
//     password: '1234',
//     dialect: 'mssql', // change the dialect to mssql for SQL Server
//     port: 1414, // change the port to the SQL Server port (default is 1433)
//     dialectOptions: {
//     options: {
//       // Your tedious options here
//       useUTC: false,
//       dateFirst: 1
//     },
//   },
//   logging: (error) => {
//   console.error('Error: %o', error);
//   // console.error('Error code: %s', error.);
// },

//     // logging: (sql) => {
//     //   console.log('Query: %s', sql);
//     // },
//   });

//   return sequelize;
// }
