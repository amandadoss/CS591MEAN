
angular.module('cs411', [])
    .directive('nameDisplay', function() {
        return {
            scope: true,
            restrict: 'EA',
            template: "<b>This can be anything {{name}}</b>"}
    })
    .controller('cs411ctrl', function($scope, $http){

        //CREATE (POST)
        $scope.createUser = function() {
                var request = {
                    method: 'post',
                    url: 'http://localhost:3000/api/db',
                    data: {
                        cuisine: $scope.cuisine,
                        address: $scope.address
                    }
                };
                $http(request)
                    .then(function(response){
                        $scope.inputForm.$setPristine();
                        $scope.cuisine = $scope.address = '';
                        $scope.getUsers();
                    })

        }
        //READ (GET)
        $scope.getUsers = function() {
            $http.get('http://localhost:3000/api')
                .then(function(response){
                    $scope.users = response.data;

                })
        };

        $scope.getRestaurants = function(){
            $http.get('http://localhost:3000/api/restaurants')
                .then(function(response){
                $scope.restaurants = response.data;
            })
        }


        $scope.initApp = function () {
            $scope.buttonState = "create";
            $scope.buttonMessage = "Search";
            $scope.getUsers();
            $scope.createUser();
            $scope.getRestaurants();
        }
    })
    //This controller handles toggling the display of details in the user list
    .controller('listController', function ($scope){
        $scope.display = false;

        $scope.showInfo = function() {
            $scope.display = !$scope.display;
        }


    });
