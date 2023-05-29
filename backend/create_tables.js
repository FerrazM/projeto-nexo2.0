const client = require('./db_connection.js');

async function addColumns() {
  try {
    // Adicionar coluna "entrada"
    const addEntradaColumnQuery = `
      ALTER TABLE financas
      ADD COLUMN entrada BOOLEAN NOT NULL DEFAULT false
    `;
    await client.query(addEntradaColumnQuery);

    // Adicionar coluna "saida"
    const addSaidaColumnQuery = `
      ALTER TABLE financas
      ADD COLUMN saida BOOLEAN NOT NULL DEFAULT false
    `;
    await client.query(addSaidaColumnQuery);

    console.log('Colunas adicionadas com sucesso');
  } catch (error) {
    console.error('Erro ao adicionar colunas:', error);
    throw error;
  }
}

module.exports = addColumns;
