const Sequelize = require('../infra/postgres').Sequelize;
const postgres = require('../infra/postgres').sequelize;

const UnidadeSaudeModel = postgres.define('unidade',{
    id_unidade: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nome_unidade: {
        type: Sequelize.STRING,
        allowNull: false
    },

    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },

    endereco_unidade: {
        type: Sequelize.STRING,
        allowNull: false
    },

    telefone_unidade: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email_unidade: {
        type: Sequelize.STRING,
        allowNull: false
    },

    latlong: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


module.exports = UnidadeSaudeModel;