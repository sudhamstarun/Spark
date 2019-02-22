'use strict'

var sql = require('mssql');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var dbConfig = {
    user: "sparkadmin",
    password: "spark@123",
    server: "dbspark.database.windows.net",
    options:
    {
        database: "SparkDB",
        encrypt: true
    }
  };
  var connection = new Connection(dbConfig);
  
  exports.executequery = function (req, res, query) {
    connection.on('connect', function (err) {
      if (err) {
        console.log("Error while connecting database :- " + err);
        res.send(err);
      }
      else {
        console.log('Connection Done!');
  
        // create Request object
        var request = new Request(query, function(err, result){
            if(err){
                console.log("Error while querying database :- " + err);
                res.send(err);
                process.exit();
            }
            else{
                res.send(result);
                process.exit();
            }
        });
        connection.execSql(request);
      }
    });
  }