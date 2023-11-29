var express = require('express');
var router = express.Router();
var usuariosModel=require('./../models/usuariosModel');
var novedadesModel=require('./../models/novedadesModel');
var mensajesModel=require('./../models/mensajesModel');
const util=require('util');
const { prototype } = require('events');
const cloudinary=require('cloudinary').v2;
var nodemailer=require('nodemailer');

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

  router.post('/contacto', async (req,res)=>{                          // RECIBIR MENSAJE DESDE EL FRONT
        const mail={
          to:'victor@gmail.com',
          subject:'Mensaje desde la web',
          html:`${req.body.nombre} ${req.body.apellido}: ${req.body.comentarios}. <br>Email:${req.body.email} <br> Telefono: ${req.body.telefono}`
        }
        const transport=nodemailer.createTransport({
          host:process.env.SMTP_HOST,
          port:process.env.SMTP_PORT,
          auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
          }
        });
        const fecha=new Date();
        var obj={
          nombre:req.body.nombre,
          apellido:req.body.apellido,
          email:req.body.email,
          telefono:req.body.telefono,
          comentarios:req.body.comentarios,
          fecha:fecha
        };
        console.log(fecha);
        await mensajesModel.postMensajes(obj);

        await transport.sendMail(mail);

        res.status(201).json({
          error:false,
          message:'Mensaje enviado'
        });

  });


  module.exports=router;