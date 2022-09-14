var mysql = require('mysql');

class BookDB{
    
    static connect(){
        
        var connection = mysql.createConnection({
            
            host : '172.19.0.3',
            
            user: 'root',
            
            password: 'example',
            
            database:'Bookstore'
        });
        
        connection.connect();
        
        return connection;
    }
    static getBook(callback){
        
        let connection = BookDB.connect();

        let sql = "select * from book";

        let query = connection.query(sql, function(error, results, fields){
            
            if(error) throw error;
            
            callback(results);

        });

        console.log(query.sql);

        connection.end();
    }

    static getBookByType(typeBook, callback){
        
        let connection = BookDB.connect();
        
        let sql = "select id, name_Book, type_Book from book where type_Book = '" + typeBook + "'";

        let query = connection.query(sql, function(error, results, fields){

            if(error) throw error;
            
            callback(results);

        });

        console.log(query.sql);

        connection.end();

    }

    static getBookById(id, callback){

        let connection = BookDB.connect();

        let sql = "select * from book where id = ?";

        let query = connection.query(sql, id, function(error, results, fileds){
            
            if(error) throw error;

            if(results.length == 0){
                
                console.log("Nenhum livro encontrado");
                
                return
            }

            let book =results[0];

            callback(book);

        });

        console.log(query.sql);

        connection.end();
    }

    static save(book, callback){
        
        let connection = BookDB.connect();

        let sql = "insert into book set ?";

        let query = connection.query(sql, book, function(error, results, fields){
            
            if(error) throw error;
            
            book.id =results.insertId;

            callback(book);
        
        });

        
    }
    static update(book, callback) {
        
        let connection = BookDB.connect();

        let sql = "update  book  set ? where id = ?";

        let id = book.id;

        let query = connection.query(sql, [book, id], function(error, results, fields){
            
            if(error) throw error;

            callback(book);

        });

        console,log(query.sql);

        connection.end();

    }
    static delete(book, callback){

        let connection = BookDB.connect();

        let sql = "delete from book where id = ?";

        let id  =  book.id;

        let query = connection.query(sql, [book, id], function(error, results, fields){
            
            if (error) throw error;

            callback(book);
        
        });

      
    }

    static deleteById(id, callback){

        let connection = BookDB.connect();

        let sql = "delete from book where id = ?";

        let query = connection.query(sql, id, function(error, results, fields){

            if(error)throw error;

            callback(results.affectedRows);
            
        })

        console.log(query.sql);

        connection.end();

    }

};

module.exports = BookDB;