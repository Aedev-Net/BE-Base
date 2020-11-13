'use strict';

const database = require('./startup/database');
const server = require('./startup/server');

class App {
  async start() {
    try {
      await database.connect();
      server.start();
    } catch (e) {
      console.error(`Cannot start server. Error: ${e}`);
      console.error(e.stack);
    }
  }
}

module.exports = new App();
