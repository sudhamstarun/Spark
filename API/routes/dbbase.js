'use strict'

var sql = require('mssql');

var dbConfig = {
    user: "admin",
    password: "spark123",
    server: "sparkdb.c3sn68vhke9a.ap-south-1.rds.amazonaws.com,1433",
    database: "Spark"
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