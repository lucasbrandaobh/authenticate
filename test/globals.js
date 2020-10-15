const { dropDatabase } = require('./database/drop-database');
const database = require('../lib/database');
const { authTokens: { authTokensFixture } } = require('./utils/fixtures');
const authorizationRepository = require('../lib/authorization/repository');

before('Sobrescreve a url do banco e add token default', async () => {
  const databaseUri = `${process.env.MONGO_URL}_test`;  
  const authTokenFixture = authTokensFixture.create({
    clientId: 'cliente',
    token: 'senha',
    userId: 'teste'
  });
  const authTokenFixture2 = authTokensFixture.create({
    clientId: 'cliente2',
    token: 'senha2',
    userId: 'teste2'
  });
  await database.connect(databaseUri);
  await authorizationRepository.insertOne(authTokenFixture);
  await authorizationRepository.insertOne(authTokenFixture2);
});

after('Remove a base de dados usada para testes', async () => {
  await dropDatabase();
  await database.close();
});

