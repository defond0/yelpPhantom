var Handlebars = require('handlebars');

// usage: {{toJson Object}}
Handlebars.registerHelper('toJson', function(context) {
    return JSON.stringify(context);
});

//Console.log {{log obj}}
Handlebars.registerHelper('log', function(obj) {
    console.log(obj);
});

module.exports = Handlebars;