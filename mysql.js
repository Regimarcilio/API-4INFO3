import mysql from 'mysql2/promise';

const conexao = async () => {
  const con = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: '4info3'    
  });

    return con;
}

const getUsuario = async (id=undefined) => {    
    const con = await conexao();
    let dados;

    if(!id) {
        const dados = await con.query('SELECT * FROM usuarios;');
        }else {
        const dados = await con.query('SELECT * FROM usuarios WHERE id = ?;', [id]);
        con.close();
        return dados[0];
    }

}

console.log(await getUsuario(2));