import log from './log';
let config = {
    port: 3001,
    baseUrl: '/api/v1',
    saltTimes: 10,
    jwtSecret: {
        base: 'ghtest',
        access_token: 'ac_token',
        refresh_token: 'rf_token'
    },
    database: {
        mongo: 'mongodb://127.0.0.1:27017/typescript',
        redis: {
            base: {
                host: '127.0.0.1',
                port: '6379',
                pwd: '',
                library: 1
            },
            db2: {
                host: '127.0.0.1',
                port: '6379',
                pwd: '',
                library: 2
            }
        }
    },
    log
};
export default config;