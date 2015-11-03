'use strict';

var mean = require('meanio');

module.exports = function(Myby){
    return {
        all:function(req,res){
            res.render('index');
        }
        //aggregatedList:function(req,res) {
        //    res.send(res.locals.aggregatedassets);
        //}
    };
};
