/**
 * Created by huisu on 10/17/15.
 */
var dbModels = require('./db-model');
var retObj = require('./ret-obj');

exports.getTweet= function(req, res){
    dbModels.twitter.getTweetLocationData(req.query.keywords,function (err, doc) {
        console.log(doc);
        if (err != null) {
            res.send(
                retObj.getOrdinaryReturnObject(
                    false,
                    err.message
                )
            );
        } else if (doc) {
            res.send(
                JSON.stringify(doc)
            );
        } else {
            res.send(
                retObj.getOrdinaryReturnObject(
                    true,
                    'ok,noData'

                )
            )
        }
    });
}

exports.getNYCTweet= function(req, res){
    dbModels.twitter.getTweetNYCdata(function (err, doc) {
        console.log(doc);
        if (err != null) {
            res.send(
                retObj.getOrdinaryReturnObject(
                    false,
                    err.message
                )
            );
        } else if (doc) {
            res.send(
                retObj.getReturnObject(
                    true,
                    'ok',
                    doc
                )
            );
        } else {
            res.send(
                retObj.getOrdinaryReturnObject(
                    true,
                    'ok,noData'

                )
            )
        }
    });
}