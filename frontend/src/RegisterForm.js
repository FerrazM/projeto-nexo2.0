import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        nome,
        email,
        senha,
        confirm_senha: confirmSenha,
      });

      console.log(response.data.msg); // Mensagem de sucesso da API
      // Lógica adicional após o registro bem-sucedido
    } catch (error) {
      console.error('Erro ao registrar:', error);
      // Lógica para lidar com erros
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
        <input
          type="password"
          value={confirmSenha}
          onChange={(e) => setConfirmSenha(e.target.value)}
          placeholder="Confirme a senha"
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterForm;
