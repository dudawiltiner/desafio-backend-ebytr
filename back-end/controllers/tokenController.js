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
    
    const collaborator = await collaboratorModel.findId({ id: decoded.data.id });
    
    /* Não existe um colaborador na nossa base com o id informado no token. */
    if (!collaborator) {
      return res
        .status(status.UNAUTHORIZED)
        .json({ message: 'Não exite um colaborador com esse Token' });
    }

    next();
  } catch (err) {
    return res.status(status.UNAUTHORIZED).json({ message: 'Colaborador não autorizado' });
  }
};

module.exports = { isValid };