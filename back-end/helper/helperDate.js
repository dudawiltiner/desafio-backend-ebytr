/**
 * GERA UMA DATA NO FORMATO DD/MM/YYYY
 * @returns uma STRING de data
 */

const dateNow = () => {
  const data = new Date();
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0');
      const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

module.exports = { dateNow };