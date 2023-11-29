var pool=require('./bd');
var md5 = require('md5');

async function postNovedad(obj,img_id){                                                 // INSERTAR NOVEDAD
    try{
        var query='INSERT INTO novedades SET ?';
        var rows=await pool.query(query,[obj,img_id]);
        return rows;
    }
    catch(error){
        console.log("error en postNovedad");
        console.log(error);
    }
}

async function getNovedades(){                                                      // LISTADO DE NOVEDADES
    try{
        var query='SELECT * FROM novedades';
        var rows=await pool.query(query);
        return rows;
    }
    catch(error){
        console.log("error en getNovedades")
        console.log(error);
    }
}
async function getNovedadById(id){                                                   // GET NOVEDAD BY ID
    try{
        var query='SELECT * FROM novedades WHERE id=?';
        var rows=await pool.query(query,[id]);
        return rows;
    }
    catch(error){
        console.log("error en getNovedadById")
        console.log(error);
    }
}

async function getNovedadesActivas(){                                              // LISTADO DE NOVEDADES ACTIVAS
    try{
        var query='SELECT * FROM novedades WHERE activo Like "SI" ORDER BY id DESC';
        var rows=await pool.query(query);
        console.log("entre a get novedades");
        return rows;
    }
    catch(error){
        console.log("error en getNovedadesActivas")
        console.log(error);
    }
}
async function getNovedadById(id){ // GET NOVEDAD BY ID
    try{
        var query='SELECT * FROM novedades WHERE id=?';
        var rows=await pool.query(query,[id]);
        return rows;
    }
    catch(error){
        console.log("error en getNovedadById")
        console.log(error);
    }
}

async function modificarNovedad(obj,id){                                                // MODIFICAR NOVEDAD BY ID
    try{
        var query='UPDATE novedades SET ? WHERE id=?';
        var rows=await pool.query(query,[obj,id]);
        return rows;
    }
    catch(error){
        console.log("error en modificarNovedad")
        console.log(error);
    }
}

async function deleteNovedad(id){                                                       // ELIMINAR NOVEDAD
    try{
        var query='DELETE FROM novedades WHERE id=?';
        var rows=await pool.query(query,[id]);
        return rows;
    }
    catch(error){
        console.log("error en deleteNovedad")
        console.log(error);
    }
}


module.exports={getNovedades,postNovedad,deleteNovedad,getNovedadById,modificarNovedad,getNovedadesActivas};