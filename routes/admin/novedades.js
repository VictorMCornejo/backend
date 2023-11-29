var express = require('express');
var router = express.Router();
var novedadesModel=require('../../models/novedadesModel');
const util=require('util');
const cloudinary=require('cloudinary').v2
const uploader=util.promisify(cloudinary.uploader.upload);

router.get('/', async function(req, res, next) {                      // GET LISTADO DE NOVEDADES
  var novedades=await novedadesModel.getNovedades();

  novedades=novedades.map(novedad=>{
      if(novedad.img_id){
          const imagen=cloudinary.image(novedad.img_id,{
            width:50,
            height:50,
            crop:'fill',
            radius:'max'
          });
          return{
            ...novedad,
            imagen
          }
      }
      else{
          return{
            ...novedad,
            imagen:'SIN IMAGEN'
        }
      }
  });

  res.render('admin/novedades',{
    layout: 'admin/layout',
    persona: req.session.nombre,
    id: req.session.id_usuario,
    novedades
  })
});

router.get('/modificar/:id', async function(req, res, next) {                                 // GET NOVEDAD BY ID
  var id=req.params.id;
  var novedad=await novedadesModel.getNovedadById(id);
  var imagen='';

  novedad=novedad.map(i=>{     // OBTENGO LA IMAGEN DE CLOUDINARY 150x150
    if(i.img_id){
        imagen=cloudinary.image(i.img_id,{
          width:150,
          height:150,
          crop:'fill',
          radius:'max'
        })  
    }
    else{
        imagen='SIN IMAGEN'
    }

    res.render('admin/modificarnovedad',{
      layout: 'admin/layout',
      persona: req.session.nombre,
      id: req.session.id_usuario,
      novedad,
      imagen
    })
  });
});

router.post('/modificar', async function(req, res, next) {                                        // MODIFICAR NOVEDAD BY ID
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
        titulo:req.body.titulo,
        subtitulo:req.body.subtitulo,
        desc_corta:req.body.desc_corta,
        desc_larga:req.body.desc_larga,
        activo:req.body.activo,
        img_id,
      }
      await novedadesModel.modificarNovedad(obj,id);
      res.redirect('/admin/novedades');
  }
  catch(error){
    console.log(error)
    res.render('/admin/novedades/modificar',{
      layout: 'admin/layout',
      error: true,
      message: 'Error al modificar novedad'
    })
  }
});


router.get('/agregarnovedad', async function(req, res, next) {                      // GET PAGINA AGREGAR NOVEDAD
  res.render('admin/agregarnovedad',{
    layout: 'admin/layout',
    persona: req.session.nombre,
    id: req.session.id_usuario,
  })
});

router.get('/eliminar/:id', async function(req, res, next) {                        // GET PAGINA ELIMINAR NOVEDAD
  var id=req.params.id;
  await novedadesModel.deleteNovedad(id);
  res.redirect('/admin/novedades');
});

router.post('/agregarnovedad',async function(req,res,next){                         // POST FORMULARIO DE NUEVA NOVEDAD
  try{ 
    var img_id='NULL';

    if(req.files && Object.keys(req.files).length>0){   // SI SE ADJUNTO ARCHIVO
      console.log("Entre a enviar la imagen a cloudinary")
      imagen=req.files.imagen;
      img_id=(await uploader(imagen.tempFilePath)).public_id; // Le pasa la imagen a cloudinary
      console.log(img_id);
    }
    var obj={
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      desc_corta: req.body.desc_corta,
      desc_larga: req.body.desc_larga,
      activo: req.body.activo,
      img_id
    }

    await novedadesModel.postNovedad(obj);
    res.redirect('/admin/novedades');
  }
  catch(error){
    console.log(error);
  }
});
module.exports = router;