var express = require('express');
const { deleteTurno } = require('../../models/turnosModel.js');
var router = express.Router();
var turnosModel=require('../../models/turnosModel.js');

router.get('/', async function(req, res, next) {
    
  var turnos= await turnosModel.getTurnos();
  res.render('admin/turnos',{
     layout: 'admin/layout',
     turnos
   });
});

router.get('/agregarturno',async function(req,res,next){ // POST TURNO
  res.render('admin/agregarturno',{
    layout: 'admin/layout',
    persona: req.session.nombre,
    id: req.session.id_usuario,
  })
});
router.get('/eliminar/:id',async function(req,res,next){ // DELETE TURNO
   var id = req.params.id;
   await turnosModel.deleteTurno(id);
   res.redirect('/admin/turnos');

});
router.post('/agregarturno',async function(req,res,next){ // POST FORMULARIO DE NUEVO TURNO
  try{
    await turnosModel.postTurno(req.body);
    res.redirect('/admin/turnos');
  }
  catch(error){
    console.log(error);
  }
});

module.exports = router;