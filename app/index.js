let express = require('express');

let app = express();

const BookDB = require('./BookDB');

let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.get('/', function(request, response){
    
    response.send("API Livros");
    
});

app.get('/book', function(request, response){
    
    BookDB.getBook(function(book){
        
        response.json(book);
    
    });

});

app.get('/book/:id(\\d+)', function(request, response){
    
    let id = request.params.id;

    BookDB.getBookById(function(book){
        
        response.json(book);
    
    });

});

app.delete('/book/:id', function(request, response){

    let id = request.params.id;

    console.log("delete " + id);

    BookDB.deleteById(id, function(affectedRows){

        response.json({msg:"Livro deletado com sucesso"});
    
    });

});



app.get('/book/:type',function(request, response){
    
    let type = request.params.type;

    BookDB.getBookByType(type, function(book){
       
        response.json(book);
   
    });

});

app.post('/book', function(request, response){
    
    let book = request.body;

    BookDB.save(book, function(book){
    
        response.json(book);
    
    });

});

app.put('/book', function(request, response){
    
    let book = request.body;

    BookDB.update(book, function(book){
        
        response.json({msg: "Livros atualizados"});
    
    });

});


let server = app.listen(3000, function(){
    
    let host = server.address().address;
    
    let port = server.address().port;

    console.log("Servidor iniciado em http://%s%s", host, port);

});