var pool=require('./bd');

async function getTurnos(){
    try{
        var query='select * from turnos';
        var rows=await pool.query(query);
        return rows;
    }
    catch(error){
        console.log("error en turnosModel")
        console.log(error);
    }
}
async function postTurno(obj){
    try{
        var query='INSERT INTO turnos SET ?';
        var rows=await pool.query(query,[obj]);
        return rows;
    }
    catch(error){
        console.log("error en postUsuario");
        console.log(error);
    }
}
async function deleteTurno(obj){
    try{
        var query='DELETE FROM turnos WHERE id= ?';
        var rows=await pool.query(query,[obj]);
        return rows;
    }
    catch(error){
        console.log("error en postUsuario");
        console.log(error);
    }
}
module.exports={getTurnos,postTurno,deleteTurno};