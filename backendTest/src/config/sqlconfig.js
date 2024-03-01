"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfig = void 0;
exports.sqlConfig = {
    user: 'sa',
    password: 'atopwudan',
    database: 'ANGULARTESTING',
    server: 'DESKTOP-8U9CNUE',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
};
console.log(exports.sqlConfig);
