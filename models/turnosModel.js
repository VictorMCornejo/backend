var pool=require('./bd');

async function getTurnos(){     // GET TODOS LOS TURNOS
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
async function getTurnoById(id){     // GET TURNO BY ID
    try{
        var query='select * from turnos WHERE id=?';
        var rows=await pool.query(query,[id]);
        return rows;
    }
    catch(error){
        console.log("error en getTurnosById")
        console.log(error);
    }
}
async function postTurno(obj){          // POST TURNO
    try{
        var query='INSERT INTO turnos SET ?';
        var rows=await pool.query(query,[obj]);
        return rows;
    }
    catch(error){
        console.log("error en postTurno");
        console.log(error);
    }
}
async function deleteTurno(obj){        // DELETE TURNO
    try{
        var query='DELETE FROM turnos WHERE id= ?';
        var rows=await pool.query(query,[obj]);
        return rows;
    }
    catch(error){
        console.log("error en deleteTurno");
        console.log(error);
    }
}

async function modificarTurnoById(obj,id){        // MODIFICAR TURNO BY ID
    try{
        var query='UPDATE turnos SET ? WHERE id= ?';
        var rows=await pool.query(query,[obj,id]);
        return rows;
    }
    catch(error){
        console.log("error en modificarTurnoById");
        console.log(error);
    }
}

async function consultarTurnosDisponibles(consultardia){         // CONSULTAR TURNOS DISPONIBLES
    try{  
        var query='SELECT dia, hora, horario FROM `turnos` INNER JOIN horarios WHERE dia Like ?';
        console.log(`** turnos model query: ${query} **`);
        var rows=await pool.query(query,[consultardia]);
        console.log(`** rows: ${rows} **`);
        return rows;
    }
    catch(error){
        console.log(`error en consultarTurnosDisponibles ${error}`);
        return error;
    }
}
module.exports={getTurnos,postTurno,deleteTurno,consultarTurnosDisponibles,getTurnoById,modificarTurnoById};