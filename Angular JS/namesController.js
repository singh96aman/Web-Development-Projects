angular.module('MyApp', []).controller('namesCtrl', function($scope) {
	$scope.names = [
		{name:'aman', country:'IN'},
		{name:'singh', country:'US'},
		{name:'thakur', country:'UK'}
	];
});