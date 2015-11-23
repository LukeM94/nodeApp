/**
 * Created by 1301651 on 23/11/2015.
 */
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
//and our HTTP server
var http = require('http');
//setup our port
var port = process.env.PORT || 1337;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://LukeM94:lmorton-16@ds054288.mongolab.com:54288/mongo'
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Connecting \n');
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        response.write('Connection Made \n');
        if (err) {
            response.write('Unable to connect to the mongoDB server. Error:' + err + "\n");
            //Error so close connection
            db.close();
        } else {
            //HURRAY!! We are connected. :)
            response.write('Connection established to' + url +"\n");
            // Get the documents collection
            var collection = db.collection('users');

            // do some work here with the database.

            //Done Close connection
            db.close();
        }
        response.end('Finished, Connection closed \n');

        // Insert some users
        collection.insert([user1, user2, user3], function (err, result) {
            if (err) {
                response.write('Insert failed ' + err + "\n");
            } else {
                console.log(result);
                response.write('Inserted ' + result.insertedCount +' documents ok. +"\n"');
            }
            //Close connection
            db.close();
            response.end('Finished, Connection closed \n');
            //remove any other db.close or response.end statement below this line
        });

    });

}).listen(port);

