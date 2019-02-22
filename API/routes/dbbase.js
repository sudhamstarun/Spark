'use strict'

var sql = require('mssql');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

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

  //var connection = new Connection(dbConfig);
  
//   exports.executequery = function (req, res, query) {
//     connection.on('connect', function (err) {
//       if (err) {
//         console.log("Error while connecting database :- " + err);
//         res.send(err);
//       }
//       else {
//         console.log('Connection Done!');
  
//         // create Request object
//         var request = new Request(query, function(err, result){
//             if(err){
//                 console.log("Error while querying database :- " + err);
//                 res.send(err);
//                 process.exit();
//             }
//             else{
//                 res.send(result);
//                 process.exit();
//             }
//         });
//         connection.execSql(request);
//       }
//     });
//   }

//   exports.executequery = function (req, res, query) {
//     connection.on('connect', function (err) {
//       if (err) {
//         console.log("Error while connecting database :- " + err);
//         res.send(err);
//       }
//       else {
//         console.log('Connection Done!');
  
//         // create Request object
//         var request = new Request(query, function(err, rowCount, rows){
//             console.log(rowCount + ' row(s) returned');
//             process.exit();
//         });
//         request.on('row', function(columns) {
//             columns.forEach(function(column) {
//                 console.log("%s\t%s", column.metadata.colName, column.value);
//             });
//         });
//         connection.execSql(request);
//       }
//     });
//   }

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