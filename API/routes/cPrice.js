'use strict'

var dbbase = require('./dbbase.js');

exports.pingserver = function (req, res, next) {
    res.json(["Chandan", "Jaydeep", "KD", "OM", "Pankaj"]);
  };

  exports.getLocationList = function (req, res) {
    var query = "select * from [Location] Where 1 = 1";
    dbbase.executequery(req, res, query);
  };