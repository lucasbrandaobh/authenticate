const repository = require('./repository');

const usersController = (() => {
  const get = async (req, res) => {
    try {
      const users = await repository.find().toArray();
      res.json(users);
    } catch (error) {
      console.error('Erro ao chamar função get de users. %o', error);
      res.sendStatus(500);
    }
  };
  const post = async (req, res) => {
    const { body } = req;
    try {
      const resultInsert = await repository.insertOne(body);
      const userInserido = resultInsert.ops[0];
      console.log('------------------------------------------------------------------');
      console.log('Não conformidade incluida com sucesso');
      res.status(201).send(userInserido);
    } catch (error) {
      console.error('Erro ao chamar função post de users. %o', error);
      res.sendStatus(500);
    }
  };
  return {
    get,
    post
  };
})();

module.exports = usersController;
