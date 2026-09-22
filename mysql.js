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

const getUsuarios = async (con) => await con.query('SELECT * FROM usuarios;');
const getUsuario = async (con, user) => await con.query('SELECT * FROM usuarios WHERE id=?;', [user.id]);

const createUsuario = async (user) => {
    const con = await conexao();
    await con.query(
        'INSERT INTO usuarios (nome, email) VALUES (?, ?);',
        [user.nome, user.email]
    );

    con.close();
    return `Usuário ${user.nome} adicionado ao MySQL!`;
}

const deleteUsuario = async (id) => {
    const con = await conexao();
    await con.query('DELETE FROM usuarios WHERE id=?', [id]);

    con.close();
    return `Usuário ${id} deletado do MySQL!`;
}

const attUsuario = async (user, id) => {
    const con = await conexao();
    await con.query(
        'UPDATE usuarios SET nome = ?,  email = ? WHERE id = ?',
        [user.nome, user.email, id]
    );

    con.close();
    return `Usuário ${user.nome} atualizado no MySQL!`;
}

const manipularSQl = async (user, callback) => {
    let resultado;
    try {
        const con = await conexao();
        resultado = await callback(con, user);
        con.close();
    } catch (e) {
        resultado = `Ocorreu um erro: ${e.message}`;
    } finally {
        return resultado;
    }
}

console.log(await manipularSQl({}, getUsuarios));