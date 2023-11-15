var express = require('express');
var router = express.Router();
var mensajesModel=require('../../models/mensajesModel.js');

router.get('/', async function(req, res, next) {
  var mensajes= await mensajesModel.getMensajes();
  res.render('admin/mensajes',{
    layout: 'admin/layout',
    persona: req.session.nombre,
    id: req.session.id_usuario,
    mensajes
  });
});

module.exports = router;