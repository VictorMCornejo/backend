var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin/inicio',{
    layout: 'admin/layout',
    persona: req.session.nombre,
    id: req.session.id_usuario
  });
});

module.exports = router;