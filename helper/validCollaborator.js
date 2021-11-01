/**
 * VALIDA O EMAIL DO COLOBORADOR
 * @param {*} collaboratorEmail uma STRING -> email do colaborador
 * @returns um BOOLEAN true ou false
 */

const isValidEmail = (collaboratorEmail) => {
  const re = /\S+@\S+\.\S+/;
  
  if (!collaboratorEmail || typeof collaboratorEmail !== 'string') {
    return false;
  }

  if (!re.test(collaboratorEmail)) {
    return false;
  }

  return true;
};

/**
 * VALIDA A SENHA DO COLOBORADOR
 * @param {*} collaboratorPassword uma STRING -> senha do colaborador
 * @returns um BOOLEAN true ou false
 */

const isValidPassword = (collaboratorPassword) => {
  if (!collaboratorPassword || typeof collaboratorPassword !== 'string') {
    return false;
  }

  if (collaboratorPassword.length < 6) {
    return false;
  }

  return true;
};

module.exports = { isValidEmail, isValidPassword };