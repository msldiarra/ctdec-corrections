import Sequelize from 'sequelize';

export const DB = new Sequelize(
    'corrections',
    'postgres',
    '1234',
    {
        dialect: 'postgres',
        host: 'localhost'
    }
);


export const CorrectionStatus = DB.define('correction', {
        status: Sequelize.STRING,
        identication_number: Sequelize.STRING
    } , {timestamps: false, freezeTableName: true}
);


DB.sync({force: false});

