require("dotenv").config();
const { Client } = require('pg');


const client = new Client({
    user: process.env.DB_USER,
    host: 'containers-us-west-35.railway.app',
    database: 'railway',
    password: process.env.DB_PASSWORD,
    port: 7545, 
  })

  client.connect()
  .then(() => {
    console.log('Conexão bem-sucedida com o PostgreSQL');
    // Execute as operações desejadas no banco de dados
  })
  .catch((err) => {
    console.error('Erro ao conectar com o PostgreSQL', err);
  });

  module.exports = client;