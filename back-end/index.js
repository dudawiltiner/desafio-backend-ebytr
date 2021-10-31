const userModel = require('./models/collaboratorModel');

const djhd = userModel.getOne({ 
  collaboratorEmail: 'nome@nome.com',
  collaboratorPassword: 'secreta',
}).then((res) => console.log(res));

djhd();