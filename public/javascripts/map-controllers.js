var PageCtrl = function ($rootScope, $scope, $http) {
    $scope.keyword="please choose a keyword!!"
    url='/data'
    var map, heatmap;

    $.post(url, function(data, status) {
        var heatMapData = [];
        var data = JSON.parse(data);
        for (var i = 0; i < data.length; i++) {
            heatMapData.push(new google.maps.LatLng(data[i][0], data[i][1]));
            i++;
        }
        map = new google.maps.Map(document.getElementById('heatmap'), {
            zoom: 2,
            center: new google.maps.LatLng(35, 5),
            mapTypeId: google.maps.MapTypeId.MAP
        });

        heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatMapData,
            map: map
        });
    });

    function toggleHeatmap() {
        heatmap.setMap(heatmap.getMap() ? null : map);
    }

    function changeGradient() {
        var gradient = [
            'rgba(0, 255, 255, 0)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 191, 255, 1)',
            'rgba(0, 127, 255, 1)',
            'rgba(0, 63, 255, 1)',
            'rgba(0, 0, 255, 1)',
            'rgba(0, 0, 223, 1)',
            'rgba(0, 0, 191, 1)',
            'rgba(0, 0, 159, 1)',
            'rgba(0, 0, 127, 1)',
            'rgba(63, 0, 91, 1)',
            'rgba(127, 0, 63, 1)',
            'rgba(191, 0, 31, 1)',
            'rgba(255, 0, 0, 1)'
        ]
        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
    }

    function changeRadius() {
        heatmap.set('radius', heatmap.get('radius') ? null : 20);
    }

    function changeOpacity() {
        heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
    }

    $rootScope.setkeyword=function(keywords){
        $scope.keyword=keywords
        url='/data?keywords='+$scope.keyword
        var map, heatmap;

        $.post(url, function(data, status) {
            var heatMapData = [];
            var data = JSON.parse(data);
            for (var i = 0; i < data.length; i++) {
                heatMapData.push(new google.maps.LatLng(data[i][0], data[i][1]));
                i++;
            }
            map = new google.maps.Map(document.getElementById('heatmap'), {
                zoom: 2,
                center: new google.maps.LatLng(35, 5),
                mapTypeId: google.maps.MapTypeId.MAP
            });

            heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatMapData,
                map: map
            });
        });

        function toggleHeatmap() {
            heatmap.setMap(heatmap.getMap() ? null : map);
        }

        function changeGradient() {
            var gradient = [
                'rgba(0, 255, 255, 0)',
                'rgba(0, 255, 255, 1)',
                'rgba(0, 191, 255, 1)',
                'rgba(0, 127, 255, 1)',
                'rgba(0, 63, 255, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0, 0, 223, 1)',
                'rgba(0, 0, 191, 1)',
                'rgba(0, 0, 159, 1)',
                'rgba(0, 0, 127, 1)',
                'rgba(63, 0, 91, 1)',
                'rgba(127, 0, 63, 1)',
                'rgba(191, 0, 31, 1)',
                'rgba(255, 0, 0, 1)'
            ]
            heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
        }

        function changeRadius() {
            heatmap.set('radius', heatmap.get('radius') ? null : 30);
        }

        function changeOpacity() {
            heatmap.set('opacity', heatmap.get('opacity') ? null : 0.5);
        }
    }


}

var TrendCtrl = function ($rootScope, $scope, $http) {

    tweetmap.map.statMap.getNYCData(
        $http,
        'statisticsTrend',
        function (NYCList) {
            $rootScope.statisticsDataObj = NYCList;
        }
    )
}




