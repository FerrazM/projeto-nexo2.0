import React, { useState } from 'react';
import axios from 'axios';

function UserRegistrationPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (senha !== confirmSenha) {
      alert('A senha e a confirmação de senha não correspondem');
      return;
    }

    try {
      await axios.post('http://localhost:3000/auth/register', {
        nome,
        email,
        senha,
        confirm_senha: confirmSenha,
      });

      alert('Usuário criado com sucesso');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário');
    }
  };

  return (
    <div>
      <h1>Página de Registro de Usuário</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmSenha}
          onChange={(e) => setConfirmSenha(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default UserRegistrationPage;
