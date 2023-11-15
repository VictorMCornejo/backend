var express = require('express');
var router = express.Router();
var usuariosModel=require('../../models/usuariosModel');
var md5 = require('md5');

router.get('/', async function(req, res, next) { // GET LISTADO DE USUARIOS
  var usuarios=await usuariosModel.getUsuarios();
  res.render('admin/usuarios',{
    layout: 'admin/layout',
    persona: req.session.nombre,
    id: req.session.id_usuario,
    usuarios
  });
});

router.get('/agregarusuario', async function(req, res, next) { // GET PAGINA AGREGAR USUARIO
  res.render('admin/agregarusuario',{
    layout: 'admin/layout',
    persona: req.session.nombre,
    id: req.session.id_usuario,
  });
});

router.get('/eliminar/:id', async function(req, res, next) { // GET PAGINA ELIMINAR USUARIO
  var id=req.params.id;
  await usuariosModel.deleteUsuarios(id);
  res.redirect('/admin/usuarios');
});

router.post('/agregarusuario',async function(req,res,next){ // POST FORMULARIO DE NUEVO USUARIO
  try{ // no utilizo req.body para asignarlo al objeto para poner encriptar el password (¿¿¿Se podria encriptar desde el hbs???)
    var obj={
      usuario:req.body.usuario,
      email:req.body.email,
      password:md5(req.body.password)
    };
    
    await usuariosModel.postUsuario(obj);
    res.redirect('/admin/usuarios');
  }
  catch(error){
    console.log(error);
  }
});

module.exports = router;