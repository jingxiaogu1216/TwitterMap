/**
 * Created by huisu on 10/18/15.
 */
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var twitterSchema = new Schema({
    tweet_id: String,
    user_id: String,
    time: String,
    text: String,
    lat: Number,
    lng: Number,
    keyword: String
});

var Twitter = mongoose.model("twitter", twitterSchema,"twitter");
exports.twitter = function (Id, tweetId, userId, time,text,lat,lng,keyword) {
    var _this = this;
    _this._id = Id;
    _this.tweet_id = tweetId;
    _this.user_id = userId;
    _this.time = time;
    _this.lat = lat;
    _this.lng = lng;
    _this.keyword = keyword;

}
exports.twitter.getTweetLocationData = function (keyword, callback) {
 console.log(keyword)
    Twitter.find({keyword: keyword},function (err, doc) {
        if (err) {
            console.log("error")
            callback(err, null)
        }
        var ret =[]
        for(var key in doc){
          var list=[]
            list.push(doc[key].lat)
            list.push(doc[key].lng)
            ret.push(list)
        }
        callback(null, ret)
    });
}


exports.twitter.getTweetNYCdata = function (callback) {
    console.log("NYC")
    Twitter.find({lat:{$lt:45,$gt:39},lng:{$lt:-70.5,$gt:-75}},function (err, doc) {
        if (err) {
            console.log("error")
            callback(err, null)
        }
        callback(null, doc)
    });
}