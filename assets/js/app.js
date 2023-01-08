var app = angular.module("myApp", ["ngRoute","ngMap","ui.bootstrap","myApp.paginate-filter"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html",
        controller: "homdefaultCtrl"
    })
    .when("/category", {
        templateUrl : "category.html",
        controller: "categoryCtrl"
    })
    .when("/bridges/:id", {
        templateUrl : "bridges.html",
        controller: "bridgedetailCtrl"
    })
    .when("/gallery", {
        templateUrl : "gallery.html"
    })
    .when("/about", {
        templateUrl : "about.html"
    })
    .when("/contact", {
        templateUrl : "contact.html"
    });
});

app.controller("homdefaultCtrl", function($scope,$http){
    $http.get("json/bridges.json")
    .then(function(response){
        $scope.datalist = response.data;
    },
    function(err){
        $scope.text = "Data error, please try again!"
    });
    var ratingTotal = 5; 
        $scope.getRepeater = function() {
            return new Array(ratingTotal);
        };
});

app.controller("categoryCtrl", function($scope,$http){
    $http.get("json/bridges.json")
    .then(function(response){
        $scope.datalist = response.data;
        $scope.random = function() {
            return 0.5 - Math.random();
        }
        $scope.currentPage=1;
        $scope.pageSize=6;
    },
    function(err){
        $scope.text = "Data error, please try again!"
    });
    var ratingTotal = 5; 
        $scope.getRepeater = function() {
            return new Array(ratingTotal);
        };
});

app.controller("bridgedetailCtrl",['$scope','$filter','$routeParams','$http',function($scope,$filter,$routeParams,$http){
    $scope.bridgeId = $routeParams.id;
    $http.get("json/bridges.json")
    .then(function(response){
        var data = response.data
        $scope.bridge = $filter('filter')(data, {id: parseInt($scope.bridgeId)},true)[0];
    },
    function(err){
        $scope.text = "Data error, please try again!"
    });
    var ratingTotal = 5; 
        $scope.getRepeater = function() {
            return new Array(ratingTotal);
        };
}]);

app.controller("commentCtrl", function($scope,$http){
    $http.get("json/comments.json")
    .then(function(response){
        $scope.commentslist = response.data;
    },
    function(err){
        $scope.text = "Data error, please try again!"
    });
});

app.controller('MapController', function($scope, $ionicLoading) {
    // Map Settings //
    $scope.initialise = function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      // Geo Location /
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                animation: google.maps.Animation.DROP,
                title: "My Location"
            });
        });
        $scope.map = map;
        // Additional Markers //
        $scope.markers = [];
        var infoWindow = new google.maps.InfoWindow();
        var createMarker = function (info){
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(info.lat, info.long),
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                title: info.city
            });
            marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
            google.maps.event.addListener(marker, 'click', function(){
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });
            $scope.markers.push(marker);
        }  
        for (i = 0; i < cities.length; i++){
            createMarker(cities[i]);
        }
    };
    google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());
});