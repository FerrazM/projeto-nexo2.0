const express = require('express');
const bcrypt = require('bcrypt');
const client = require('./db_connection.js');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());


// Rota para criar um novo usuário
app.post('/auth/register', async (req, res) => {
  const { nome, email, senha, confirm_senha } = req.body;

  try {
    // Verificar se a senha e a confirmação de senha correspondem
    if (senha !== confirm_senha) {
      return res.status(400).json({ msg: 'A senha e a confirmação de senha não correspondem' });
    }

    // Verificar se o usuário já existe no banco de dados
    const checkUserQuery = 'SELECT * FROM registro WHERE email = $1';
    const existingUser = await client.query(checkUserQuery, [email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    // Criptografar a senha antes de salvar no banco de dados
    const saltRounds = 10;
    if (!senha) {
      return res.status(400).json({ msg: 'A senha é obrigatória' });
    }
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    // Inserir o novo usuário no banco de dados
    const insertUserQuery = 'INSERT INTO registro (id,nome, email, senha) VALUES ($1, $2, $3)';
    await client.query(insertUserQuery, [nome, email, hashedPassword]);

    res.status(201).json({ msg: 'Usuário criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
});

// Rota para fazer login
app.post('/auth/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const checkUserQuery = 'SELECT * FROM registro WHERE email = $1';
    const existingUser = await client.query(checkUserQuery, [email]);

    if (existingUser.rows.length === 0) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    // Verificar a senha
    const user = existingUser.rows[0];
    const passwordMatch = await bcrypt.compare(senha, user.senha);

    if (!passwordMatch) {
      return res.status(401).json({ msg: 'Senha incorreta' });
    }

    // Gerar token
    const token = jwt.sign({ email: user.email }, 'djaodijsdkpaoskxkz'); // Defina sua chave secreta aqui


    // Enviar o token como resposta
    res.json({ msg: 'Login bem-sucedido', token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
});

// Rota protegida para criar uma nova finança
app.post('/auth/financas', async (req, res) => {
  const { titulo, valor, categoria, data, entrada, saida, user_id } = req.body;

  try {
    // Inserir a nova finança no banco de dados associada ao usuário
    const insertFinancaQuery =
      'INSERT INTO financas (titulo, valor, categoria, data, user_id) VALUES ($1, $2, $3, $4, $5)';
    await client.query(insertFinancaQuery, [titulo, valor, categoria, data, entrada, saida, user_id]);

    res.status(201).json({ msg: 'Finança criada com sucesso' });
  } catch (error) {
    console.error('Erro ao criar finança:', error);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
});

// Rota protegida para exibir a página de criação de finanças do usuário
app.get('/auth/financas', async (req, res) => {
  const { user_id } = req.query;

  try {
    // Fazer a requisição protegida
    const response = await axios.get('http://localhost:3000/auth/financas', {
      params: {
        user_id
      },
      transformRequest: [addAuthorizationHeader] // Adiciona o token ao cabeçalho de autorização
    });

    res.json({ financas: response.data.financas });
  } catch (error) {
    console.error('Erro ao obter finanças:', error);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
