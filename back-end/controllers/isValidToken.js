const jwt = require('jsonwebtoken');
const status = require('http-status');
const collaboratorModel = require('../models/collaboratorModel');

const secretKey = process.env.SECRET_KEY;

const isValid = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(status.UNAUTHORIZED).json({ error: 'Token não encontrado' });
  }

  try {
    /* Através o método verify, pode-se validar e decodificar o JWT. */
    const decoded = jwt.verify(token, secretKey); // payload
    
    const user = await collaboratorModel.findId({ id: decoded.data.id });
    
    /* Não existe um colaborador na nossa base com o id informado no token. */
    if (!user) {
      return res
        .status(status.UNAUTHORIZED)
        .json({ message: 'Não exite um colaborador com esse Token' });
    }

    // req.userId = { userId: decoded.data.id };
    // req.user = user;

    /* Por fim, chamamos o próximo middleware que, no nosso caso,
       é a própria callback da rota. */
    next();
  } catch (err) {
    return res.status(status.UNAUTHORIZED).json({ message: 'Colaborador não autorizado' });
  }
};

// const validationOK = async (_req, res) => {
//   try {
//     return res.status(status.OK).json({ message: 'usuário autorizado' });
//   } catch (error) {
  
//     return res.status(status.INTERNAL_SERVER_ERROR).json('Alguma coisa errada');
//   }
// };

module.exports = { isValid };