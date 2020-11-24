/*var express = require('express');
var pg = require("pg");
var app = express();
 
var connectionString = "postgres://postgres:password@localhost:5432/postgres";
 
app.get('/', function (req, res, next) {
    pg.connect(connectionString,function(err,client,done) {
       if(err){
           console.log("not able to get connection "+ err);
           res.status(400).send(err);
       } 
       client.query('SELECT * FROM student where id = $1', [1],function(err,result) {
           done(); // closing the connection;
           if(err){
               console.log(err);
               res.status(400).send(err);
           }
           res.status(200).send(result.rows);
       });
    });
});
 
app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});*/
/*var express= require("express");
var app = express();
const pg = require('pg');
const pool = new pg.Pool({
user: 'postgres',
host: '127.0.0.1',
database: 'test',
password: 'password',
port: '5432'});

pool.query("SELECT * FROM users", (err, res) => {
console.log(err, res);
console.log("result:");
console.log(res.rows);
pool.end();
});

app.get("/", function(req, res){
  //res.send("This will be the show page one day!");
  res.render("show");
});

app.listen(4000, function(){
  console.log("The YelpCamp Server has Started!");
});*/



const pg        = require('pg');
const express   = require('express');
const app       = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

const config = {
    user: 'postgres',
    database: 'home_credits',
    password: 'password',
    port: 5432
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);

app.get('/', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       client.query('SELECT appl_id FROM application limit 10', function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
       })
   })
});

var obj = {};
app.get('/show', function(req, res){

    /*connection.query('SELECT * FROM customers', function(err, result) {

        if(err){
            throw err;
        } else {
            obj = {print: result};
            res.render('print.ejs', obj);                
        }
    });*/
    pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       client.query('SELECT appl_id, loan_type, gender, tot_child, family_status FROM application limit 100', function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            obj ={result: result.rows}
            res.render('show.ejs', obj);
       })
   })

 
});

app.get("/search",function(req,res,done){
pool.connect(function(err,client,done){
if(err){
  console.log(err);
}
else{
  res.render("search.ejs");
}
});
});


app.post("/search",function(req,res,done){

pool.connect(function(err,client,done){

if(err){
  console.log(err);
}
else{
  var i=0;
  var loan_type=req.body.loan_type;
  
  var lt='';
  var gender=req.body.gender;
  
  var gen='';

  var own_car=req.body.own_car;
  var oc='';

  var own_realty=req.body.own_realty;
  var or='';

  var suite_type=req.body.suite_type;
  
  var st='';

   var income_type=req.body.income_type;
  
  var it='';

   var edu_level=req.body.edu_level;
  
  var ed='';

  var phone=req.body.phone;
  
  var ph='';

  var email=req.body.email;
  
  var em='';

  console.log(loan_type);
  console.log(gender);
  if(loan_type=='')
  {
    loan_type="";
  }
  else{
    

    if(i==0){
      lt='where loan_type =';
      i++;
    }
  }
  if(gender==undefined)
  {
    gender="";
  }
  else{

    if(i==0){
      gen='where gender = ';
      i++
    }
    else{
      gen='and gender =';
      i++;
    }
  }
  if(own_car==undefined)
  {
    own_car="";
  }
  else{

    if(i==0){
      oc='where own_car = ';
      i++
    }
    else{
      oc='and own_car =';
      i++;
    }
  }

  if(own_realty==undefined)
  {
    own_realty="";
  }
  else{

    if(i==0){
      or='where own_realty = ';
      i++
    }
    else{
      or='and own_realty =';
      i++;
    }
  }

  if(suite_type=='')
  {
    suite_type="";
  }
  else{
    

    if(i==0){
      st='where suite_type =';
      i++;
    }
    else{
      st='and suite_type =';
      i++;

    }
  }

  if(income_type=='')
  {
    income_type="";
  }
  else{
    

    if(i==0){
      it='where income_type =';
      i++;
    }
    else{
      it='and income_type =';
      i++;

    }
  }

  if(edu_level=='')
  {
    edu_level="";
  }
  else{
    

    if(i==0){
      ed='where edu_level =';
      i++;
    }
    else{
      ed='and edu_level =';
      i++;

    }
  }

  if(phone==undefined)
  {
    phone="";
  }
  else{

    if(i==0){
      ph='where phone = ';
      i++
    }
    else{
      ph='and phone =';
      i++;
    }
  }
  
  if(email==undefined)
  {
    email="";
  }
  else{

    if(i==0){
      em='where email = ';
      i++
    }
    else{
      em='and email =';
      i++;
    }
  }
  
  console.log('Gender is '+gender);
  console.log('loan_type is '+loan_type);
  var q='select count(*) as cnt from application '+lt+loan_type+gen+gender+oc+own_car+or+own_realty+st+suite_type+it+income_type+ed+edu_level+ph+phone+em+email;
  console.log(q);
//console.log(id);

 client.query(q, function
  (err,result){
  console.log(result.rows);
  res.render("res.ejs",{result:result.rows});

  });


}
});
});





app.get("/find",function(req,res,done){
pool.connect(function(err,client,done){
if(err){
  console.log(err);
}
else{
  res.render("find.ejs");
}
});
});

app.post("/find",function(req,res,done){

pool.connect(function(err,client,done){

if(err){
  console.log(err);
}
else{
  var skills= req.body.skills;
  console.log(skills);
  var i;
  var gender="";
  var gen="";
  var tot_income="";
  var ti="";
  var loan_type="";
  var lt="";
  var own_car="";
  var oc="";
  var own_realty="";
  var or="";
  var family_status="";
  var fs="";
  var lim= parseInt(req.body.limit);
  skills1=["gender"];
  console.log(skills.length);
  for(i=0; i<skills.length; i++)
  {  
    console.log(skills[i]);
    if(skills[i]=="gender")
    {
      gender=", gender";
      gend="gender";
      if(i==0){
        gen='gender';
      }
    }
    else if(skills[i]=="tot_income")
    {
      tot_income=", tot_income";
      if(i==0){
        ti='tot_income';
      }
      else{
        ti=', tot_income';
      }
    }
    else if(skills[i]=="loan_type")
    {
      loan_type=", loan_type";
      if(i==0){
        lt='loan_type';
      }
      else{
        lt=', loan_type';
      }
      
    }
    else if(skills[i]=="own_car")
    {
      own_car=", own_car";
      if(i==0){
        oc='own_car';
      }
      else{
        oc=', own_car';
      }
    }
    else if(skills[i]=="own_realty")
    {
      own_realty=", own_realty";
      if(i==0){
        or='own_realty';
      }
      else{
        or=', own_realty';
      }
    }
    else if(skills[i]=="family_status")
    {
      family_status=", family_status";
      if(i==0){
        fs="family_status";
      }
      else{
        fs=", family_status";
      }
    }
  }

  var q='select appl_id'+gender+tot_income+loan_type+own_car+own_realty+family_status+' from application limit '+lim;
  var p='select '+gen+ti+lt+oc+or+fs+', count(*) as cnt from application group by '+gen+ti+lt+oc+or+fs;
  console.log(p);
  

  client.query(p, function
  (err,result){
  console.log(result.rows[0].gender);
  res.render("result.ejs",{result1:result.rows});

  });


}
});
});








app.get("/group",function(req,res,done){
pool.connect(function(err,client,done){
if(err){
  console.log(err);
}
else{
  res.render("group.ejs");
}
});
});

app.post("/group",function(req,res,done){

pool.connect(function(err,client,done){

if(err){
  console.log(err);
}
else{
 /* var skills= (req.body.skills);
  var i;
  var gender="";
  var tot_income="";
  var loan_type="";
  var own_car="";
  var own_realty="";
  var family_status="";
  var lim= parseInt(req.body.limit);*/
  /*for(i=0; i<skills.length; i++)
  {  
    console.log(skills[i]);
    if(skills[i]=="gender")
    {
      gender=", gender";
    }
    else if(skills[i]=="tot_income")
    {
      tot_income=", tot_income";
    }
    else if(skills[i]=="loan_type")
    {
      loan_type=", loan_type";
    }
    else if(skills[i]=="own_car")
    {
      own_car=", own_car";
    }
    else if(skills[i]=="own_realty")
    {
      own_realty=", own_realty";
    }
    else if(skills[i]=="family_status")
    {
      family_status=", family_status";
    }
  }*/
  var q='select gender, count(*) from application group by gender';
  console.log(q);
  

  client.query(q,function
  (err,result){
  console.log(result.rows);
  res.render("groupres.ejs",{result:result.rows});

  });


}
});
});


app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});

/*const pg        = require('pg');
const express   = require('express');
const app       = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));

const config = {
    user: 'postgres',
    database: 'home_credits',
    password: 'password',
    port: 5432
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);





app.get('/', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       client.query('SELECT * FROM application limit 10', function (err, result) {
 done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            console.log(result.rows);
            res.render("res.ejs",{result:result.rows});

       })

   })
});


app.get("/search",function(req,res,done){
pool.connect(function(err,client,done){
if(err){
  console.log(err);
}
else{
  res.render("search.ejs");
}
});
});


app.post("/search",function(req,res,done){

pool.connect(function(err,client,done){

if(err){
  console.log(err);
}
else{
  var id= parseInt(req.body.id);
//console.log(id);

 client.query('SELECT * from application where appl_id='+id,function
  (err,result){
  console.log(result.rows);

  res.render("res.ejs",{result:result.rows});

  });


}
});
});*/










/*app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});*/

