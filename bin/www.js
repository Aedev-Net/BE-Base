const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const projectPath = path.resolve('.');
const isDeployed = fs.existsSync(path.resolve(projectPath, '../configs/.env'));
if (isDeployed) {
    dotenv.config({ path: path.resolve(projectPath, '../configs/.env') });
} else {
    dotenv.config({ path: path.resolve(projectPath, '.env') })
}

require('../app').start();