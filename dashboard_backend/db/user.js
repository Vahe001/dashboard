import sequalize from 'sequelize'
import Sequelize from "sequelize";
export default {
    schemaName: 'users',
    schema: {
        name: { type: sequalize.STRING },
        username: { type: sequalize.STRING, unique: true },
        email: { type: sequalize.STRING, unique: true },
        picture: { type: sequalize.STRING  },
    }

}