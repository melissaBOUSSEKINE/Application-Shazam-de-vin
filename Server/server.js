const express = require('express'); // définit expressJS
const pgClient = require('pg'); // définit le middleware pg à charger
const bodyParser = require("body-parser");
const path = require("path")

const cors = require('cors');



const app = express(); // appel à expressJS

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var server = app.listen(8080, function() {

  console.log('listening on 8080');


});

app.use(express.static(path.join(__dirname, "../www")));


app.all("/", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.use(cors({
  origin: 'http://192.168.0.15:8080'
}));



var pool = new pgClient.Pool({
  user: 'postgres',
  host: 'localhost',
  database:'ShazamDuVin',
  password: '123456',
  port: 5432 });


app.post('/signIn', (request, response)=> {

  var msg ;

  console.log(request.body)



        pool.connect(function(err, client, done) {
           if(err) {
              console.log('Error connecting to pg server' + err.stack);
           }else{
              console.log('Connection established with pg db server')

           }

        })

        pool.query(" INSERT INTO users (username, password, nom , prenom, photo) VALUES ( '"+request.body.username+"', '"+request.body.password+"' , '"+request.body.nom+"' , '"+request.body.prenom+"' ,'"+request.body.picture+"' );",(err, res) => {

          if(err){
              console.log("Error"+err)
          }else{
            console.log("User Created with success")
            msg = "User Created with success";
            response.send(JSON.stringify(msg));
          }

        })


      })


      app.post('/login', (request, response)=> {


        console.log(request.body);

              pool.connect(function(err, client, done) {
                 if(err) {
                    console.log('Error connecting to pg server' + err.stack);
                 }else{
                    console.log('Connection established with pg db server');

                 }

              })


              pool.query("Select * from users where username='"+request.body.Username+"' and password='"+request.body.Password+"'" ,(err, res) => {

                if(err){

                  console.log("Error"+err)


                }else if(res.rows[0]){

                  response.send(res.rows[0]);

                }else {
                  console.log("Data not founded");
                  response.send();

                }

              })


            })


            app.post('/scan', (request, response)=> {


              console.log(request.body.name);




                    pool.connect(function(err, client, done) {
                       if(err) {
                          console.log('Error connecting to pg server' + err.stack);
                       }else{
                          console.log('Connection established with pg db server');

                       }

                    })

                    var j = 0;

                    pool.query("Select * from vins where name LIKE '%"+request.body.name+"%' " ,(err, res) => {

                      if(err){

                        console.log("Error"+err)


                      }else if(res.rows[0]){

                        let boisson = res.rows[0];

                            boisson.commentaires = [];


                          pool.query("Select * from notes  FULL JOIN users ON notes.userid = users.id  where  vinid = '"+res.rows[0].id+"'" ,(err, res1) => {
                            if(err){

                              console.log("Error"+err)
                            }


                              while (res1.rows[j]){

                                  boisson.commentaires.push(res1.rows[j]);

                                j++;
                              }




                              response.send(boisson);

                          })




                      }else {
                        console.log("Data not founded");
                        response.send();

                      }

                    })


                  })






                  app.post('/notes', (request, response)=> {

                    var msg ;

                    console.log(request.body)



                          pool.connect(function(err, client, done) {
                             if(err) {
                                console.log('Error connecting to pg server' + err.stack);
                             }else{
                                console.log('Connection established with pg db server')

                             }

                          })

                          pool.query(" INSERT INTO notes (note, commentaire, userid , vinid) VALUES ( '"+request.body.note+"', '"+request.body.commentaire+"' , '"+request.body.id+"' , '"+request.body.boissonid+"');",(err, res) => {

                            if(err){
                                console.log("Error"+err)
                                response.send();

                            }else{
                              console.log("Note Created with success")
                              msg = "User Created with success";
                             response.send(JSON.stringify(msg));
                            }

                          })


                        })
