var express = require('express');
var router = express.Router();
var mensajesModel=require('../../models/mensajesModel.js');

router.get('/', async function(req, res, next) {                                    // GET PAGINA MENSAJES
  var mensajes= await mensajesModel.getMensajes();
  res.render('admin/mensajes',{
    layout: 'admin/layout',
    persona: req.session.nombre,
    id: req.session.id_usuario,
    mensajes
  });
});
router.get('/eliminar/:id', async function(req, res, next) {                        // GET PAGINA ELIMINAR MENSAJE
  var id=req.params.id;
  await mensajesModel.deleteMensaje(id);
  res.redirect('/admin/mensajes');
});


module.exports = router;