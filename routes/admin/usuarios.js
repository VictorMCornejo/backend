var express = require('express');
var router = express.Router();
var usuariosModel=require('../../models/usuariosModel');
var md5 = require('md5');
const util=require('util');
const cloudinary=require('cloudinary').v2
const uploader=util.promisify(cloudinary.uploader.upload);

router.get('/', async function(req, res, next) {                      // GET LISTADO DE USUARIOS
  var usuarios=await usuariosModel.getUsuarios();

  usuarios=usuarios.map(usuario=>{
      if(usuario.img_id){
          const imagen=cloudinary.image(usuario.img_id,{
            width:50,
            height:50,
            crop:'fill',
            radius:'max'
          });
          return{
            ...usuario,
            imagen
          }
      }
      else{
          return{
            ...usuario,
            imagen:'SIN IMAGEN'
        }
      }
  });

  res.render('admin/usuarios',{
    layout: 'admin/layout',
    persona: req.session.nombre,
    id: req.session.id_usuario,
    usuarios
  })
});

router.get('/modificar/:id', async function(req, res, next) {               // GET USUARIO BY ID
  var id=req.params.id;
  var usuario=await usuariosModel.getUsuarioById(id);
  var imagen='';

  usuario=usuario.map(i=>{     // OBTENGO LA IMAGEN DE CLOUDINARY 150x150
    if(i.img_id){
        imagen=cloudinary.image(i.img_id,{
          width:150,
          height:150,
          crop:'fill',
          radius:'max'
        })  
    }
    else{
        imagen='images/usuario_generico.png'
    }

    res.render('admin/modificarusuario',{
      layout: 'admin/layout',
      persona: req.session.nombre,
      id: req.session.id_usuario,
      usuario,
      imagen
    })
  });
});

router.post('/modificar', async function(req, res, next) {                                        // MODIFICAR USUARIO BY ID
  try{
      var id= req.body.id;
      var img_id=req.body.img_id; // Me aseguro de mantener img_id original en caso de no subir archivo
      

      if(req.files && Object.keys(req.files).length>0){  // SI SE ADJUNTO ARCHIVO
        if(img_id){ // Si adjunte archivo y si habia una imagen ya cargada, la borro de cloudinary
            const destroy=util.promisify(cloudinary.uploader.destroy);
            await(destroy(img_id));
        }

        imagen=req.files.imagen;
        img_id=(await uploader(imagen.tempFilePath)).public_id; // Le pasa la imagen a cloudinary y actualizo img_id con nuevo valor
      }
      var obj={
        id:req.body.id,
        usuario:req.body.usuario,
        email:req.body.email,
        password:req.body.password,
        img_id,
      }
      console.log(req.body,img_id);
      await usuariosModel.modificarUsuario(obj,id);
      res.redirect('/admin/usuarios');
  }
  catch(error){
    console.log(error)
    res.render('/admin/modificar',{
      layout: 'admin/layout',
      error: true,
      message: 'Error al modificar usuario'
    })
  }
});


router.get('/agregarusuario', async function(req, res, next) {                      // GET PAGINA AGREGAR USUARIO
  res.render('admin/agregarusuario',{
    layout: 'admin/layout',
    persona: req.session.nombre,
    id: req.session.id_usuario,
  })
});

router.get('/eliminar/:id', async function(req, res, next) {                        // GET PAGINA ELIMINAR USUARIO
  var id=req.params.id;
  await usuariosModel.deleteUsuarios(id);
  res.redirect('/admin/usuarios');
});

router.post('/agregarusuario',async function(req,res,next){                         // POST FORMULARIO DE NUEVO USUARIO
  try{ // (¿¿¿Se podria encriptar desde el hbs???)
    var img_id='no me cargaron nada';

    if(req.files && Object.keys(req.files).length>0){   // SI SE ADJUNTO ARCHIVO
      imagen=req.files.imagen;
      img_id=(await uploader(imagen.tempFilePath)).public_id; // Le pasa la imagen a cloudinary
    }

    var obj={
      usuario:req.body.usuario,
      email:req.body.email,
      password:md5(req.body.password),
      img_id
    };
    await usuariosModel.postUsuario(obj);
    res.redirect('/admin/usuarios');
  }
  catch(error){
    console.log(error);
  }
});

module.exports = router;