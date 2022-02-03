import { Pool } from 'pg'

const pool = new Pool({
    host: '127.0.0.1',
    port: '5432',
    user: 'postgres',
    password: '12345',
    database: 'siga'
})

module.exports = pool