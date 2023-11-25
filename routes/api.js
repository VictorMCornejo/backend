var express = require('express');
var router = express.Router();
var usuariosModel=require('./../models/usuariosModel');
var novedadesModel=require('./../models/novedadesModel');
const util=require('util');
const cloudinary=require('cloudinary').v2
//const uploader=util.promisify(cloudinary.uploader.upload);

router.get('/usuarios', async function(req, res, next) {                      // GET LISTADO DE USUARIOS
    var usuarios=await usuariosModel.getUsuarios();
    usuarios=usuarios.map(usuarios=>{
        if(usuarios.img_id){
            const imagen=cloudinary.url(usuarios.img_id,{  // En este caso no devuelvo la imagen sino la URL para utilizar en HTML
              width:150,
              height:150,
              crop:'fill',
            });
            return{
              ...usuarios,
              imagen
            }
        }
        else{
            return{
              ...usuarios,
              imagen:'SIN IMAGEN'
          }
        }
    });
    res.json(usuarios);  
  });

  router.get('/novedades', async function(req, res, next) {                                      // GET NOVEDADES
    var novedades=await novedadesModel.getNovedadesActivas();
    novedades=novedades.map(novedades=>{
        if(novedades.img_id){
            const imagen=cloudinary.url(novedades.img_id,{  // En este caso no devuelvo la imagen sino la URL para utilizar en HTML
              width:250,
              height:150,
              crop:'fill',
            });
            return{
              ...novedades,
              imagen
            }
        }
        else{
            return{
              ...novedades,
              imagen:'SIN IMAGEN'
          }
        }
    });
    res.json(novedades);  
  });


  module.exports=router;