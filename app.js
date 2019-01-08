/*var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

*/
var express = require('express');
var fs = require("fs");//requireอ่านไฟล์
var bodyParser =require('body-Parser'); // เป็นlibary ของ json

var app = express();
app.use(bodyParser.json()); // แปลงอยู่ในรูปแบบformatของjson
app.get('/',function (req,res){
  res.send("Sample Code for RESTful API");
})
app.get('/listUsers',function(req,res){
  fs.readFile(__dirname+"/"+"users.json",'utf8',function (err,data){
    console.log(data);
    res.end(data);
  });
})



app.get('/showbyID/:id',function(req,res){
  var id1 = req.params.id;
  fs.readFile(__dirname+"/"+"users.json",'utf8',function (err,data){
    data = JSON.parse(data);
    for(i in data){
      if(data[i].id == id1 ){

        break;
      }
    }
    console.log(i);
    console.log(data [i]);
    // console.log(data);
    res.end(JSON.stringify(data[i]));
  });
})



// {
//    "user4" : {
//       "name" : "mahesh",
//       "password" : "password1",
//       "profession" : "teacher",
//       "id": 4
//    }
// }

app.post('/addUsers',function(req,res){
  var json = req.body;
  fs.readFile(__dirname+"/"+"users.json",'utf8',function (err,data){
    data = JSON.parse(data);
    data["user5"] = req.body.user5;
    console.log(data);
    res.end(JSON.stringify(data));
  });
})

app.post('/addMultiUser', function(req,res) {

  var be = "user";
  var i = 4;
  // console.log(req)
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
  data = JSON.parse( data );
  // data["user5"] = req.body[0];
  // console.log( data );
  var countt = req.body.length;
  // console.log(countt)
  // console.log(req.body[0])
  var n=0;
  for(n=0; n<countt; n++)
  {
    i++;
    istr = i.toString();
    data["user"+istr] = req.body[n];
    data["user"+istr]["id"] = i;
  }

  res.end( JSON.stringify(data));
 });
})


//Delete user
// var id=2;

// app.delete('/deleteUser/:id',function(req,res){
//   var id = req.params.id;
//   fs.readFile(__dirname+"/"+"users.json",'utf8',function (req,data){
//     data = JSON.parse(data);
//
//     for(i in data){
//       if(data[i].id == id1 ){
//
//         break;
//       }
//     }
//
//     delete data ["user"+id];
//     console.log(data);
//     res.end(JSON.stringify(data));
//   });
// })

app.delete('/deleteUser/:id',function(req,res){

  fs.readFile(__dirname + "/" + "users.json",'utf8',function (err,data){
    user = JSON.parse(data);
    for(i in user){
      if (user[i].id == req.params.id){
        var thisIs = user[i];
        console.log(i);
        delete user[""+i];
        res.end(JSON.stringify(user));
        break;}
    }

  });
})
// app.delete('/deleteUser/:id',function(req,res){
//   var id = req.params.id;
//   fs.readFile(__dirname+"/"+"users.json",'utf8',function (req,data){
//     data = JSON.parse(data);
//     delete data ["user"+id];
//     console.log(data);
//     res.end(JSON.stringify(data));
//   });
// })
var server = app.listen(8080,function(){
  var port = server.address().port
})
console.log("Sample Code for RESTful API run at ");
