let express = require('express');

let app = express();

app.get('/', function(request,response ){

    response.send("API dos carros");

});

let server = app.listen(3000, function(){
    
    let host = server.address().address;
    
    let port = server.address().port;

    console.log("Serv %s % ", host, port);
});