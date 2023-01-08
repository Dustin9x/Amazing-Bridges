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
        var datalist = response.data
        $scope.bridge = $filter('filter')(datalist, {id: parseInt($scope.bridgeId)},true)[0];
        $scope.random = function() {
            return 0.5 - Math.random();
        }
    }),
    $http.get("json/bridges.json")
    .then(function(response){
        $scope.datalist = response.data;
    }),
    $http.get("json/comments.json")
    .then(function(response){
        $scope.commentslist = response.data;
    },
    function(err){
        $scope.text = "Data error, please try again!"
    });
    var ratingTotal = 5; 
        $scope.getRepeater = function() {
            return new Array(ratingTotal);
        };
}]);

// app.controller("commentCtrl", function($scope,$http){
//     $http.get("json/comments.json")
//     .then(function(response){
//         $scope.commentslist = response.data;
//     },
//     function(err){
//         $scope.text = "Data error, please try again!"
//     });
// });
