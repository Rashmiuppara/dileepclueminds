var express = require('express');
var router = express.Router();
var Contacts       = require('../app/models/contacts');
var nodemailer = require("nodemailer");
var path = require('path'),
    fs = require('fs');



/* GET home page. */
router.get('/', function(request, response) {
    console.log(" runing / request")
    response.render('index.html');
  });

router.get('/index', function(request, response) {
    console.log("render index");
    response.render('index.html');
  });

router.get('/about', function(request, response) {
    response.render('about.html')
  });
router.get('/service', function(request, response) {
    response.render('service.html')
  });
router.get('/projects',function(request, response) {
    response.render('projects.html')
  });
router.get('/contact', function(request, response) {
    response.render('contact.html')
  });
router.get('/iot', function(request, response) {
    response.render('iot.html')
  });
router.get('/embedded', function(request, response) {
    response.render('embedded.html')
  });
router.get('/fullstack', function(request, response) {
    response.render('fullstack.html')
  });
router.get('/testing', function(request, response) {
    response.render('testing.html')
  });
router.get('/analytics', function(request, response) {
    response.render('analytics.html')
  });

router.post('/contact',function(request, response) {
  if(request.body) {
    var contactsDetails = new Contacts();

    /*
    console.log(" value request.body.name",request.body.name);
    console.log(" value request.body.email",request.body.email);
    console.log(" value request.body.phoneno",request.body.phoneno);
    console.log(" value request.body.name",request.body.subject);
    console.log(" value request.body.name",request.body.message);

    console.log("contacts details",JSON.stringify(contactsDetails)); */
    
    contactsDetails.name    = request.body.name;
    contactsDetails.email   = request.body.email;
    contactsDetails.phoneno = request.body.phoneno;
    contactsDetails.subject = request.body.subject;

    contactsDetails.message = request.body.message; 
     //UserQuery;
    contactsDetails.save(function (err) {
      
    if (err) {
      return err;
    }
    else {
      console.log("err ",err);
      console.log("user details saved");
      response.render('contact.html');
    }
    });
  }
  if(request.body.email == "" || request.body.subject == "") {
   response.send("Error: Email & Subject should not blank");
   return false; }

   var smtpTransport = nodemailer.createTransport("SMTP",{
             host: "smtp.gmail.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
            auth: {
                 user: "info.clueminds@gmail.com",
                 pass: "rashmi2511"
            }
        });
        var mailOptions1 = {
            from: "clueminds  <no-reply@iamrohit.in>", // sender address
            to: request.body.email, // list of receivers
            subject: request.body.subject, // Subject line
            //text: "Hello world ✔", // plaintext body
            html: "Thank you for contacting us, we will get back to you soon......." // html body
        }
        smtpTransport.sendMail(mailOptions1, function(error){
        if(error){
             console.log("Email could not sent due to error: "+error);
        }

      });
        var mailOptions = {
            from: "clueminds  <no-reply@clueminds.in>", // sender address
            to: "info.clueminds@gmail.com", // list of receivers
            subject: request.body.subject, // Subject line
            //text: "Hello world ✔", // plaintext body
            html: "<b>"+"E-mail = "+request.body.email+"<br>"+"Phone No = "+request.body.phoneno+"<br>"+"Message = "+request.body.message+"</b>" // html body
        }
        smtpTransport.sendMail(mailOptions, function(error){
        if(error){
             console.log("Email could not sent due to error: "+error);
        }
      //else{ response.send("Email has been sent successfully");  }
    });
});


module.exports = router;

