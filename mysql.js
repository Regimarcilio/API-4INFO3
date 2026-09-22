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

const createUsuario = async (nome, email) => {
    const con = await conexao();
    const dados = await con.query('INSERT INTO usuarios (nome, email) VALUES (?, ?);', [nome, email]);

    con.close();
    return `Usuario ${nome} adicionado ao SQL!`;
}

const deleteUsuario = async (id) => {
    const con = await conexao();
    const dados = await con.query('DELETE FROM usuarios WHERE id = ?;', [id]);
    
    con.close();
    return `Usuario com ID ${id} removido do SQL!`;
}

console.log(await getUsuario(2));
console.log(await createUsuario('João', 'joao@example.com'));
console.log(await deleteUsuario(2));