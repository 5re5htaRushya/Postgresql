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
       var q='select distinct loan_type from application; select distinct gender from application; select distinct own_car from application;';
       client.query(q, function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            //res.status(200).send(result[0].rows);
            res.status(200).send({result:[result[0].rows, result[1].rows, result[2].rows]});
            console.log(result[0].rows);
            console.log(result[1].rows);


       })
   })
});

/*app.get('/index', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       var q='select distinct loan_type from application; select distinct gender from application; select distinct own_car from application;';
       client.query(q, function (err, res) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            //res.status(200).send(result[0].rows);
            //res.status(200).send([res[0].rows, res[1].rows, res[2].rows]);
            console.log(res[0].rows);
            console.log(res[1].rows);
            res.render("index.ejs",{result:res[0].rows});

       })
   })
});*/
app.get("/index",function(req,res,done){
pool.connect(function(err,client,done){
if(err){
  console.log(err);
}
else{

   var q='select distinct loan_type from application;'+' select distinct gender from application;'+' select distinct own_car from application;'+' select distinct own_realty from application;'+
          ' select distinct suite_type from application;'+' select distinct income_type from application;'+' select distinct edu_level from application;'+' select distinct phone from application;'+
          ' select distinct email from application';
       client.query(q, function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            //res.status(200).send(result[0].rows);
            //res.status(200).send({result:[result[0].rows, result[1].rows, result[2].rows]});
            var i=0;

            for(i=0; i<3; i++)
            {
            	console.log(result[i]);
            }

  
            console.log(result[3].rows);
            var ar=[[{Name: "hi", Age: 2}, {Name: "bye", Age: 4} ], [{Name: "hi1", Age: 3}]];

             res.render("index.ejs", {result: result} );
});
}
});
});


app.post("/index",function(req,res,done){

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

  if(suite_type==''||suite_type==undefined)
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

  if(income_type==''||income_type==undefined)
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

  if(edu_level==''||edu_level==undefined)
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



app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});