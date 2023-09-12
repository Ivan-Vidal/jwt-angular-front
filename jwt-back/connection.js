const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "12345678",
    database: 'first'
})

db.connect((err)=>{
    if (err) {
        console.error('Erro ao conectar ao MySQL', err);
    } else {
        console.log('Conectado ao MySQL');
    }
})

module.exports = db