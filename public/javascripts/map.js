/**
 * Created by huisu on 10/16/15.
 */
google.maps.event.addDomListener(window, 'load', function(){
    var map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(40.760145, -73.964963),
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var socket = io.connect('http://localhost:8081');
    //var socket = io.connect('http://54.173.207.92:8081');

    socket.on('Twit', function(data) {
        if (data.geo && data.user.description != null) {
            var location = new google.maps.LatLng(data.geo.coordinates[0], data.geo.coordinates[1]);

            var infowindow = new google.maps.InfoWindow();
            infowindow.setContent('<a style="color: #55ACEE">'+data.user.screen_name + ': '+'</a>'+ '<p style="color: #0f0f0f" >' + data.user.description+'</p>');


            var marker = new google.maps.Marker({
                position: location,
                title: "Client Geolocation",
                animation: google.maps.Animation.DROP,
                draggable: true
            });

            marker.setMap(map);

            google.maps.event.addListener(marker, 'mouseover', function() {
                infowindow.open(map, marker);
            });
            google.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close(map, marker);
            });
        }
    });
    socket.on('disconnect',function(){
        console.log('disconneted');
    });
});
