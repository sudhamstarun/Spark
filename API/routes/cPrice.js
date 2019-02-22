'use strict'

var dbbase = require('./dbbase.js');

exports.pingserver = function (req, res, next) {
    res.json(["Chandan", "Jaydeep", "KD", "OM", "Pankaj"]);
  };

  exports.getLocationList = function (req, res) {
    var query = "select * from [dbo].[Location] Where 1 = 1";
    dbbase.executequery(req, res, query);
  };

  exports.getPriceValuation = function (req, res) {
    var csSearchReq = req.body;
    console.log(csSearchReq);

    if (csSearchReq) {
        var Area_Val = csSearchReq.Area_Val;
        var csQuery = "Select PC.Price * " + Area_Val + " as Property_Val ";
        csQuery = csQuery + "From Price_Classification as PC ";
        csQuery = csQuery + "Inner Join Location as L on L.Location_ID = PC.Location_ID ";
        csQuery = csQuery + "Inner Join Property_Class as PrC on PrC.Class_ID = PC.Class_ID ";
        csQuery = csQuery + "Inner Join Property_Type as PT on PT.Type_ID = PC.Type_ID ";
        csQuery = csQuery + "where 1 = 1 ";

        if (csSearchReq.Type_ID) {
            csQuery += " And PT.Type_ID " + csSearchReq.Type_ID;
        }
        if (csSearchReq.Location_ID) {
            csQuery += " And L.Location_ID = " + csSearchReq.Location_ID;
        }
        csQuery += "And PrC.Start_Area <= " + Area_Val + " And PrC.End_Area >= " + Area_Val;

        dbbase.executequery(req, res, csQuery);
    } else {
        console.log("Wrong Data");
        res.statusMessage = "Wrong Data!";
        res.status(400).end();
    }
  };