var pool=require('./bd');

async function getMensajes(){                                                 // GET mensajes
    try{
        var query='select * from mensajes ORDER BY id DESC';
        var rows=await pool.query(query);
        return rows;
    }
    catch(error){
        console.log("error en getMensajes")
        console.log(error);
    }
}
async function postMensajes(obj){                                              // INSERTAR MENSAJE
    try{
        var query='INSERT INTO mensajes SET ?';
        var rows=await pool.query(query,[obj]);
        return rows;
    }
    catch(error){
        console.log("error en postMensajes")
        console.log(error);
    }
}
async function deleteMensaje(id){ // ELIMINAR USUARIO
    try{
        var query='DELETE FROM mensajes WHERE id=?';
        var rows=await pool.query(query,[id]);
        return rows;
    }
    catch(error){
        console.log("error en deleteMensaje")
        console.log(error);
    }
}

module.exports={getMensajes,postMensajes,deleteMensaje};