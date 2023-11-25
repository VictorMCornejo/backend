var pool=require('./bd');
var md5 = require('md5');

async function getUserByNameAndPassword(user,password){ // LOGIN
    try{
        var query='select * from usuarios where usuario=? and password=? limit 1';
        var rows=await pool.query(query,[user,md5(password)]);
        return rows[0];
    }
    catch(error){
        console.log("error en getUserByNameAndPassword")
        console.log(error);
    }
}
async function postUsuario(obj){ // INSERTAR USUARIO
    try{
        var query='INSERT INTO usuarios SET ?';
        var rows=await pool.query(query,[obj]);
        return rows;
    }
    catch(error){
        console.log("error en postUsuario");
        console.log(error);
    }
}

async function getUsuarios(){ // LISTADO DE USUARIOS
    try{
        var query='SELECT * FROM usuarios ORDER BY id';
        var rows=await pool.query(query);
        return rows;
    }
    catch(error){
        console.log("error en getUsuarios")
        console.log(error);
    }
}
async function getUsuarioById(id){ // GET USUARIO BY ID
    try{
        var query='SELECT * FROM usuarios WHERE id=?';
        var rows=await pool.query(query,[id]);
        return rows;
    }
    catch(error){
        console.log("error en getUsuarioById")
        console.log(error);
    }
}

async function modificarUsuario(obj,id){ // MODIFICAR USUARIO BY ID
    try{
        var query='UPDATE usuarios SET ? WHERE id=?';
        var rows=await pool.query(query,[obj,id]);
        return rows;
    }
    catch(error){
        console.log("error en modificarUsuario")
        console.log(error);
    }
}

async function deleteUsuarios(id){ // ELIMINAR USUARIO
    try{
        var query='DELETE FROM usuarios WHERE id=?';
        var rows=await pool.query(query,[id]);
        return rows;
    }
    catch(error){
        console.log("error en getUsuarios")
        console.log(error);
    }
}


module.exports={getUserByNameAndPassword,getUsuarios,postUsuario,deleteUsuarios,getUsuarioById,modificarUsuario};