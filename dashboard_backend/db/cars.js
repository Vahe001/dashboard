import sequalize from 'sequelize'
export default {
    schemaName: 'cars',
    schema: {
        brand: { type: sequalize.STRING  },
        model: { type: sequalize.STRING  },
        year:  { type: sequalize.INTEGER },
        color: { type: sequalize.STRING  },
    }
}