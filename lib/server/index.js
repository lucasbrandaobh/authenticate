require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compress = require('compression');
const packages = require('../../package.json');
const cors = require('cors');

const authenticate = require('../authenticate');
const users = require('../users');
const bearerStrategy = require('../authorization');

class Server {
  constructor() {
    this.serverUrl = "localhost";
    this.port = process.env.PORT || 3003;
    this.packages = packages;
    this.app = express();
    this.router = express.Router();
    this.defineRoutes();
    this.defineConfig();
  }

  defineRoutes() {
    authenticate.routes(this.router);
    users.routes(this.router);
  }

  defineConfig() {
    bearerStrategy.init();
    this.app.use(helmet());
    this.app.use(bodyParser.json({
      limit: '100mb'
    }));
    this.app.set('json replacer', (key, value) => {
      if (typeof value === 'undefined') {
        return null;
      }
      return value;
    });
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));
    this.app.use(compress());
    const corsOptions = {
      allowedOrigins: '*',
      headers: '*'
    };
    this.app.use(cors(corsOptions));
    this.app.use('/', this.router);
  }

  start() {
    return new Promise((resolve) => {
      const env = process.env.NODE_ENV;

      this.httpServer = this.app.listen(this.port, () => {
        console.log('------------------------------------------------------------------');
        console.log(`${this.packages.name} - Version: ${this.packages.version}`);
        console.log('------------------------------------------------------------------');
        console.log(`Express server listening on port: ${this.port}`);
        console.log('------------------------------------------------------------------');

        return resolve(this.app);
      });
    });
  }

  stop() {
    return new Promise((resolve) => {
      if (this.httpServer) {
        return this.httpServer.close(resolve);
      }
      return resolve();
    });
  }
}

module.exports = Server;
