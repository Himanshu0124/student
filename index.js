const express = require('express');
const path = require('path');
const exhbs = require('express-handlebars'); 
const hbs = require('hbs');
const multer = require('multer');
require('./src/db/db')
const Register = require('./src/models/register');
var app = express();
const { json } = require("express");
 
const static_path = path.join(__dirname , "/public");
const templates_path = path.join(__dirname , "/templates/views");
const partials_path = path.join(__dirname , "/templates/partials");
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended : false}));


app.use(express.json());
app.use(express.static(static_path));
app.set('view engine' , 'hbs'); 
app.set('views' , templates_path);
hbs.registerPartials(partials_path);


//-----sotrage Content Start-------//
var storage = multer.diskStorage({
   destination:function(req,file,cb){
      cb(null , 'upload');
   },
   filename:function(req,file,cb){
      cb(null,Date.now() + file.originalname);
   }
})

var upload = multer({ storage: storage });
   


//-----sotrage Content End-------//

app.get('/' , (req , res)=>{
   res.render('index');
});
app.get('/login' , (req , res)=>{
   res.render('login');
});
app.get('/register' , (req , res) =>{
    res.render('register');
})


app.post('/register' ,upload.single('img') , async (req , res) =>{
   try {
      const registerStu = new Register({
         name:req.body.name , 
         email:req.body.email,
         psw:req.body.psw , 
         college:req.body.college, 
         contact:req.body.contact ,
         city:req.body.city, 
         course:req.body.course,
         image:req.file.filename
      })

      const registered = await registerStu.save();
      res.status(201).render("index" , {title:'Success!' , success:'Data Inserted SuccessFully' , check:'true'})
      
   } catch (error) {
      res.status(404).send(error);
   }
})


app.post('/login' , async (req , res) =>{
   try {
     const email = req.body.email;
     const pswd = req.body.pwd; 

     const userEmail = await Register.findOne({email:email});
   //   res.send(userEmail);
   //   console.log(userEmail);
     if(userEmail.psw === pswd){

        res.status(201).render("shoping" , {
         clg : {
            myName : userEmail.name
         },
         mail:{
            myEmail : userEmail.email
         },
         college:{
            myClg : userEmail.college
         },
         con:{
            myContact : userEmail.contact
         },
         city:{
            myCity : userEmail.city
         },
         mycou:{
            myCourse:userEmail.course
         },
         myimg:{
            myimage:userEmail.image
         }
        });
     } 
   } catch (error) {
     res.status(404).send("Invalid Login Details"); 
   }
})

//Here I am Creating a 404 Page.
app.get('*' , (req , res) =>{
   res.render('404' , {
      errorComment : "404 Error. Page Not Found",
   });
}) 


app.listen(8000 , ()=>{
   console.log('Server is running on 8000');
})