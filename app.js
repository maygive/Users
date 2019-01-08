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
    data["user4"]=req.body.user4;
    console.log(data);
    res.end(JSON.stringify(data));
  });
})
//Delete user
var id=2;
app.delete('/delete',function(req,res){
  fs.readFile(__dirname+"/"+"users.json",'utf8',function (req,data){
    data = JSON.parse(data);
    delete data ["user"+2];
    console.log(data);
    res.end(JSON.stringify(data));
  });
})
var server = app.listen(8080,function(){
  var port = server.address().port
})
console.log("Sample Code for RESTful API run at ");
