const status = require('http-status');
const jwt = require('jsonwebtoken');
const collaboratorService = require('../services/collaboratorService');

// CONFIGURAÇÃO DO JWT //
const secretKey = process.env.SECRET_KEY;
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

/**
 * CONFIGURAÇÃO DO MIDDLEWARE PARA A AUTENTICAÇÃO DO COLABORADOR 
 * @param {*} req // recebe a requisição
 * @param {*} res // resebe a resposta
 * @returns um status + json (message ou array)
 */

const getOne = async (req, res) => {
  try {
    const { collaboratorEmail, collaboratorPassword } = req.body;
    const collaborator = await collaboratorService.getOne({ 
      collaboratorEmail, collaboratorPassword });
    
    if (collaborator) {
      const collaboratorData = {
        // eslint-disable-next-line no-underscore-dangle
        id: collaborator._id,
        collaboratorEmail: collaborator.collaboratorrEmail,
      };
  
      const token = jwt.sign({ data: collaboratorData }, secretKey, jwtConfig);
     
      return res.status(status.OK).json({ token, collaborator: collaborator.collaboratorName });
    }
  
    return res.status(status.UNAUTHORIZED).json({ message: 'Usuário não autorizado' });
  } catch (error) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({ message: 'Alguma coisa errada' });
  }
};

module.exports = { getOne };