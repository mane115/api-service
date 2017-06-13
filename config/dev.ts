import log from './log';
let config = {
    port: 3000,
    baseUrl: '/api/v1',
    saltTimes: 1,
    jwtSecret: {
        base: 'ghtest',
        access_token: 'ac_token',
        refresh_token: 'rf_token'
    },
    database: {
        mongo: '10.0.1.39:27017',
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