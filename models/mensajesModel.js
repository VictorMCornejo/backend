var pool=require('./bd');

async function getMensajes(){
    try{
        var query='select * from mensajes';
        var rows=await pool.query(query);
        return rows;
    }
    catch(error){
        console.log("error en mensajesModel")
        console.log(error);
    }
}
module.exports={getMensajes};