const { Pool } = require ('pg');

const pool = new Pool({
    host: 'pruebast2022.cypym5wo7yt3.us-east-1.rds.amazonaws.com',
    port: '5432',
    user: 'servici1',
    password: 'rdsAdmin*tiv2',
    database: 'testProject'
});

const createUser = async (req,res) => {
    const { nombre, apellido, direccion, email } = req.body;
    const response = await pool.query('INSERT INTO users (nombre, apellido, direccion, email) VALUES ($1, $2, $3, $4)',
    [
        nombre, 
        apellido, 
        direccion, 
        email
    ]);
    console.log(response);
    res.json({
        message: 'Usuario creado satisfactoriamente',
        body: {
            user: {
                nombre, apellido, direccion, email
            }
        }
    })
};

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users');
    // console.log(response.rows);
    res.send(response.rows);
};

const getUserById = async (req,res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(response.rows);
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, direccion, email } = req.body;
    const response = await pool.query('UPDATE users SET nombre = $1, apellido = $2, direccion = $3, email = $4 WHERE id = $5' ,
    [
        nombre,
        apellido,
        direccion,
        email,
        id
    ]);
    res.json({
        message: 'Datos actualizados correctamente',
        body: {
            user: {
                nombre, apellido, direccion, email
            }
        }
    })
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    console.log(response);
    res.json(`User ${id} eliminado satisfactoriamente`);
}

module.exports = {
    getUsers,
    getUserById, 
    createUser,
    updateUser,
    deleteUser
};