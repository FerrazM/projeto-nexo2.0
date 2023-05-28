const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('./db_connection.js');

const app = express();
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
    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
    const existingUser = await client.query(checkUserQuery, [email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    // Criptografar a senha antes de salvar no banco de dados
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    // Inserir o novo usuário no banco de dados
    const insertUserQuery = 'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3)';
    await client.query(insertUserQuery, [nome, email, hashedPassword]);

    res.status(201).json({ msg: 'Usuário criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
});

// Rota para fazer login e obter um token JWT
app.post('/auth/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const checkUserQuery = 'SELECT * FROM users WHERE email = $1';
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

    // Gerar um novo token JWT
    const payload = {
      id: user.id,
      nome: user.nome,
      email: user.email
    };

    const secretKey = 'your-secret-key'; // Chave secreta para assinar o token
    const options = { expiresIn: '1h' }; // Opções do token (1 hora de expiração)

    const token = jwt.sign(payload, secretKey, options);

    // Retornar o token como resposta
    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
});

// Middleware para verificar a autenticação do usuário
function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: 'Token de autenticação não fornecido' });
  }

  try {
    const secretKey = 'your-secret-key'; // Chave secreta usada para assinar o token
    const payload = jwt.verify(token, secretKey);

    req.user = payload;

    next();
  } catch (error) {
    console.error('Erro ao autenticar o token:', error);
    res.status(401).json({ msg: 'Token de autenticação inválido' });
  }
}

// Rota protegida para criar uma nova finança
app.post('/financas', authenticate, async (req, res) => {
  const { titulo, valor, categoria, data } = req.body;

  try {
    const userId = req.user.id; // ID do usuário obtido a partir do token

    // Inserir a nova finança no banco de dados associada ao usuário
    const insertFinancaQuery =
      'INSERT INTO financas (titulo, valor, categoria, data, user_id) VALUES ($1, $2, $3, $4, $5)';
    await client.query(insertFinancaQuery, [titulo, valor, categoria, data, userId]);

    res.status(201).json({ msg: 'Finança criada com sucesso' });
  } catch (error) {
    console.error('Erro ao criar finança:', error);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
});

// Rota protegida para exibir a página de criação de finanças do usuário
app.get('/financas', authenticate, async (req, res) => {
  const userId = req.user.id; // ID do usuário obtido a partir do token

  try {
    // Consultar as finanças do usuário
    const getFinancasQuery = 'SELECT * FROM reg WHERE user_id = $1';
    const financas = await client.query(getFinancasQuery, [userId]);

    res.json({ financas });
  } catch (error) {
    console.error('Erro ao obter finanças:', error);
    res.status(500).json({ msg: 'Erro interno do servidor' });
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
