'use strict'

var sql = require('mssql');

var dbConfig = {
    user: "sparkadmin",
    password: "spark@123",
    server: "dbspark.database.windows.net",
    database: "SparkDB",
    options:
    {
        database: "SparkDB",
        encrypt: true
    }
  };

exports.executequery = function (req, res, query) {
    sql.connect(dbConfig, function (err) {
      if (err) {
        console.log("Error while connecting database :- " + err);
        res.send(err);
      }
      else {
        console.log('Connection Done!');
  
        // create Request object
        var request = new sql.Request();
  
        // query to the database
        request.query(query, function (err, result) {
          if (err) {
            console.log("Error while querying database :- " + err);
            res.send(err);
            sql.close();
          }
          else {
            //console.log(result);
            res.send(result);
            sql.close();
          }
        });
      }
    });
  }