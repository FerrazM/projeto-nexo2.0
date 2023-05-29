import React, { useState } from 'react';
import axios from 'axios';
import * as C from '../styles';


const Form = ({ handleAdd }) => {
  const [titulo, setTitulo] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState('');
  const [entrada, setEntrada] = useState('');
  const [saida, setSaida] = useState('');
  
  const handleSave = async () => {
    if (!titulo || !valor || !categoria || !data) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/auth/financas',
        {
          titulo,
          valor,
          categoria,
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data); // Dados da nova transação

      const transaction = response.data;

      handleAdd(transaction);

      setTitulo('');
      setValor('');
      setCategoria('');
      setData('');
      setEntrada('');
      setSaida('');
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
      // Lógica para lidar com erros
    }
  };

  return (
    <C.Container>
      <C.InputContent>
        <C.Label>Título</C.Label>
        <C.Input value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      </C.InputContent>
      <C.InputContent>
        <C.Label>Valor</C.Label>
        <C.Input value={valor} type="number" onChange={(e) => setValor(e.target.value)} />
      </C.InputContent>
      <C.InputContent>
        <C.Label>Categoria</C.Label>
        <C.Input value={categoria} onChange={(e) => setCategoria(e.target.value)} />
      </C.InputContent>
      <C.InputContent>
        <C.Label>Data</C.Label>
        <C.Input value={data} type="date" onChange={(e) => setData(e.target.value)} />
      </C.InputContent>
      <C.RadioGroup>
        <C.Label>Entrada</C.Label>
        <C.Input value={entrada} type="radio" onChange={(e) => setData(e.target.value)} />
      </C.RadioGroup>
      <C.RadioGroup>
        <C.Label>Saída</C.Label>
        <C.Input value={saida} type="radio" onChange={(e) => setData(e.target.value)} />
      </C.RadioGroup>
      <C.Button onClick={handleSave}>Adicionar</C.Button>
    </C.Container>
  );
  
};

export default Form;
