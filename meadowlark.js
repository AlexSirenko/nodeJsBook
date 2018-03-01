'use strict';

var express = require('express');
var handlebars = require('express-handlebars')
    .create({defaultLayout: 'main'});
var path = require('path');

var app = express();


app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

/*
 data here
 */

var fortunes = [
    "Победи свои страхи, или они победят тебя.",
    "Рекам нужны истоки.",
    "Не бойся неведомого.",
    "Тебя ждет приятный сюрприз.",
    "Будь проще везде, где только можно.",
];

app.set('port', process.env.PORT || 3000);
/*
    embeded middleware
*/
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.render('home');
});

app.get('/about', function(req, res) {
    var randomFortune =
        fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
});

// Обобщенный обработчик 404 (промежуточное ПО)
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});
// Обработчик ошибки 500 (промежуточное ПО)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log( 'Express запущен на http://localhost:' +
        app.get('port') + '; нажмите Ctrl+C для завершения.' );
});