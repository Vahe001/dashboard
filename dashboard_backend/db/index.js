import Sequelize from 'sequelize';
import user from "./user";
import cars from "./cars"
export default async function () {
    try {
        const sequelize = new Sequelize('mydb', 'postgres', '123456', {
            host: 'localhost',
            dialect: 'postgres',
            logging: false
        });
        global.USERS = sequelize.define(user.schemaName, user.schema, { freezeTableName: true });
        await global.USERS.sync({alter: true});

        global.CARS = sequelize.define(cars.schemaName, cars.schema, { freezeTableName: true });
        await global.CARS.sync({alter: true});

    } catch (err) {
        console.error('Error: ', err)
    }
}
