'use strict';

/**
 * @ngdoc function
 * @name clientAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientAppApp
 */
angular.module('clientAppApp')
  .controller('UsersCtrl', function ($scope, $http, $alert) {
  	function loadData() {
		$scope.loadedUsers = false;	
	  	$http.get('http://server.local/account').
          then(function successCallback(response) {
  			$scope.users = response.data;
  			$scope.loadedUsers = true;
      	}, function errorCallback(response){
          	$scope.error = response;
          	console.log(JSON.stringify(response)); 
   		   	var myAlert = $alert({
  				title: 'Error loading data!', 
  				content: 'Check your internet connection', 
  				placement: 'top-left', 
  				type: 'danger', 
  				show: true, 
  				dismissable: true,
  				container: 'body'
  			});
  	  	}); 
  	};
	  
	  
	  
	  
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	
    $scope.submitMyForm=function(){
		console.log("Sending form data...");
         /* while compiling form , angular created this object*/
         var data=$scope.fields;  
         /* post to server*/
         $http.post("http://server.local/account", data); 
	   	 var myAlert = $alert({
			title: 'Data saved!', 
			content: 'Your data has been saved', 
			placement: 'top-left', 
			type: 'success', 
			show: true, 
			 delay: 2,
			dismissable: true,
			container: 'body'
		});
		loadData();
		        
     };
	
	loadData();
	
		
  });
