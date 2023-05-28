import React, { useState } from 'react';
import axios from 'axios';

function UserLoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        senha,
      });

      const token = response.data.token;
    
      localStorage.setItem('token', token);

      alert('Login bem-sucedido');
      // Redirecione para a rota de criação de finanças ou faça alguma outra ação necessária após o login
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login');
    }
  };

  return (
    <div>
      <h1>Página de Login de Usuário</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default UserLoginPage;
