const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)

const sequelize = new Sequelize('viettel', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // tắt log những cái vớ vẩn ra
});
async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection suss');
    } catch (error) {
        console.error('connect fall');
    }
}

module.exports = { connect };
