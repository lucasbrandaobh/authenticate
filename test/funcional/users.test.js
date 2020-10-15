const request = require('supertest');
const { assert } = require('chai');
const { dropCollections } = require('../database/drop-collection');
const { getCollection } = require('../../lib/database');
const Server = require('../../lib/server');
const { fixtures } = require('../utils')

const instanceServer = new Server();
const token = 'senha';

describe('Users: Testes funcionais', () => {
  let app;
  before(async () => {
    instanceServer.defineConfig();
    ({ app } = instanceServer);
  });
  after(async () => {
    await instanceServer.stop();
  });
  afterEach(async () => {
    await dropCollections(['users']);
  });
  it('GET 200, Obter usuarios da base com sucesso.', async () => {
    const user = fixtures.users.create();
    await getCollection('users').insertOne(user);
    const { body, statusCode } = await request(app)
      .get('/users')
      .set('authorization', `bearer ${token}`)
    assert.strictEqual(statusCode, 200);
    assert.strictEqual(body.length, 1);
  });
  it('POST 201, Inserir usuario na base com sucesso.', async () => {
    const user = fixtures.users.create();
    const { body, statusCode } = await request(app)
      .post('/users')
      .send(user)
      .set('authorization', `bearer ${token}`)
    assert.strictEqual(statusCode, 201);
  });
});
