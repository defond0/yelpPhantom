var express = require('express'),
exphbs  = require('express-handlebars');
handlebars = require('./adapter/handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var controllers = require('./controllers');
YPSettings = require('./settings');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.engine('.html', 
            exphbs({helpers: handlebars,
                                defaultLayout: 'main', 
                                extname: '.html'}));
app.set('view engine', '.html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res,next){
    var phantom = require('node-phantom');
    console.log(req.headers['user-agent']);
    if(typeof(req.query._escaped_fragment_)!=='undefined'){
        console.log('ding');
        phantom.create(function(err,ph){
            return ph.createPage(function(err,page){
                return page.open('https://localhost:3000/'+req.query._escaped_fragment_,function(status){
                    return page.evaluate((function(){
                        return document.getElementsbyTagName('html')[0].innerHTML;
                    }),function(err,result){
                        console.log(result);
                        res.send(result);
                        return ph.exit();
                    });
                });
            });
        });
    }
    else{
        console.log('ping');
        controllers.home.index(req,res,next);
    }
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
