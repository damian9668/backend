const optionsMariaDb = {
    client:"mysql",
    connection:{
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "coderhouse"

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