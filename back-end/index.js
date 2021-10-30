const userModel = require('./models/userModel');

const djhd = userModel.getOne({ 
  collaboratorEmail: 'nome@nome.com',
  collaboratorPassword: 'secreta',
}).then((res) => console.log(res));
