const isValidEmail = (collaboratorEmail) => {
  const re = /\S+@\S+\.\S+/;
  // console.log(re.test(collaboratorEmail));
  if (!collaboratorEmail || typeof collaboratorEmail !== 'string') {
    return false;
  }

  if (!re.test(collaboratorEmail)) {
    return false;
  }

  return true;
};

const isValidPassword = (password) => {
  if (!password || typeof password !== 'string') {
    return false;
  }

  if (password.length < 6) {
    return false;
  }

  return true;
};

module.exports = { isValidEmail, isValidPassword };