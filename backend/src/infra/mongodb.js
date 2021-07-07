const mongoose = require('mongoose');

const strConnection = 

`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@devwebii.hsji5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(strConnection, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no Mongo'));
db.once('open', () => {
    console.log("Banco de dados Mongo conectado com sucesso");
});

module.exports = db;