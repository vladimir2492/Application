const { setupDB } = require('../src/setup/db-setup');
setupDB('app_test');
const app = require('../src/server');
