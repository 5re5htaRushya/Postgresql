const pg        = require('pg');
const express   = require('express');
const app       = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

const config = {
    user: 'postgres',
    database: 'Cust_analysis',
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
       var q='select distinct shop_week from transactions; select distinct shop_date from transactions; select distinct shop_weekday from transactions;';
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
app.get("/index1",function(req,res,done){
pool.connect(function(err,client,done){
if(err){
  console.log(err);
}
else{

       res.render("index1.ejs" );
}
});
});


app.post("/index1",function(req,res,done){

pool.connect(function(err,client,done){

if(err){
  console.log(err);
}
else{
  var i=0;
  var cust_id=req.body.cust_id;
  
 
  
  console.log('Cust_id is '+cust_id);
  var q='select * from transactions where cust_code = '+cust_id;
  console.log(q);
//console.log(id);

 client.query(q, function
  (err,result){
  console.log(result.rows);
  obj ={result: result.rows}
  res.render("res1.ejs", obj);

  });


}
});
});



app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});