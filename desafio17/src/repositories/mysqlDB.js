
const optionsMariaDb = {
    client:"mysql2",
    connection:{
        host: process.env.railwayhost,
        port: process.env.railwayport,
        user: process.env.railwayuser,
        password: process.env.railwaypass,
        database: process.env.railwaydatabase

    }
}
const optionsSQL = {
    client: 'sqlite3',
    connection: {
        filename: "./DB/ecommerce.sqlite"
    },
    useNullAsDefault: true
}

module.exports = {
    optionsMariaDb,
    optionsSQL
}