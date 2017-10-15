/* © 2017 Goalify
 * @author Thanh
 *
 * Static configs, can be overwritten by env variables
 */
const dotenv = require('dotenv');

dotenv.config({});

const config = {
    MONGO_URI: 'mongodb://usename:password@localhost/demo?authSource=admin',
    SERVER_PORT: 3030,
    email: {
        notify: 'notify@tuanquynet.click',
        noreply: 'noreply@tuanquynet.click'
    },
    runAt: new Date(),
    HOSTNAME: 'localhost',
};
// overwrite config value from ENV variable
const env = process.env;
for (let name in config) {
    let value = env[name];
    switch (value) {
        case undefined:
            break;
        case 'false':
            config[name] = false;
            break;
        case 'null':
            config[name] = null;
            break;
        default:
            if (typeof value === 'string') {
                value = value.replace(/\\n/g, '\n');
            }
            config[name] = value;
            break;
    }
}

module.exports = config;
