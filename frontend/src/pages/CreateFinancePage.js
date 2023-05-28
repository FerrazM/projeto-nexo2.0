import React, { useState } from 'react';
import axios from 'axios';

function CreateFinancePage() {
  const [titulo, setTitulo] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState('');

  const handleCreateFinance = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/financas', {
        titulo,
        valor,
        categoria,
        data,
      });
    
      alert('Finança criada com sucesso');
    } catch (error) {
      console.error('Erro ao criar finança:', error);
      alert('Erro ao criar finança');
    }
    
  };

  return (
    <div>
      <h1>Página de Criação de Finanças</h1>
      <form onSubmit={handleCreateFinance}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        <input
          type="date"
          placeholder="Data"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button type="submit">Criar Finança</button>
      </form>
    </div>
  );
}
export default CreateFinancePage;
