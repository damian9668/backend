
const optionsMariaDb = {
    client:"mysql2",
    connection:{
        host: "containers-us-west-84.railway.app",
        port: 7031,
        user: "root",
        password: "AmgfvdGsvM7njeK7F7FM",
        database: "railway"

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