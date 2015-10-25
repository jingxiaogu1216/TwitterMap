/**
 * Created by huisu on 10/17/15.
 */
var tweetmap = tweetmap || {}
tweetmap.map = tweetmap.map || {}
tweetmap.map.statMap = function(){

}
tweetmap.map.statMap.getStatMapData = function (ngHttp,keyword, callBack) {
    tweetmap.utils.ngWebService(
        'GET',
        tweetmap.map.config.StatGoogleMap,
        {
            keywords:keyword,
        },
        ngHttp,
        function (data) {
            callBack(data);
        });
}

tweetmap.map.statMap.getNYCData = function (ngHttp,targetId,callBack) {
   var generateChartObj = function (travel,food,music,sports){
    return {
        title: {
            text: 'Distribution of tweets in a day in NYC',
                x: -20 //center
        },
        subtitle: {
                x: -20
        },
        xAxis: {
            title: {
                text: 'Time(Hour)'
            }
        },
        yAxis: {
            title: {
                text: 'Tweet Number'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },

        legend: {
            layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
        },
        series: [{
            name: 'Travel',
            data: travel
        }, {
            name: 'Food',
            data: food
        }, {
            name: 'Music',
            data: music
        }, {
            name: 'Sports',
            data: sports
        }]
    }
}
    tweetmap.utils.ngWebService(
        'GET',
        tweetmap.map.config.NYCdata,
        {},
        ngHttp,
        function (data) {
            var sporthourArray = new Array([24])
            var musichourArray = new Array([24])
            var foodhourArray = new Array([24])
            var travelhourArray = new Array([24])
            for(var i=0;i<24;i++) {
                sporthourArray[i]=0
                musichourArray[i]=0
                foodhourArray[i]=0
                travelhourArray[i]=0

            }
            for(var key in data){
                var myDate = data[key].time
                var hour = myDate.substring(11,13)
                hour = (parseInt(hour)+19)%24
                if(data[key].keyword =='sports'){
                    sporthourArray[hour] = sporthourArray[hour]+1
                }
                if(data[key].keyword == 'music'){
                    musichourArray[hour]= musichourArray[hour]+1
                }
                if(data[key].keyword == 'food'){
                    foodhourArray[hour]=foodhourArray[hour]+1
                }
                if(data[key].keyword == 'travel'){
                    travelhourArray[hour]=travelhourArray[hour]+1
                }

            }
            $(function () {
                    Highcharts.setOptions({

                    });
                    $('#' + targetId).highcharts(
                        generateChartObj(
                            sporthourArray,
                            musichourArray,
                            foodhourArray,
                            travelhourArray
                        )

                    );
                    callBack
                }
            );
        });
}