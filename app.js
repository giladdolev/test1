// var myQuestions = [
// 	{
// 		question: "What is 10/2?",
// 		answers: {
// 			a: '3',
// 			b: '5',
// 			c: '115',
// 			d: '134'
// 		},
// 		CurrentAnswer: 'b',
// 		studentAnswer: ''
// 	},
// 	{
// 		question: "What is the sky color?",
// 		answers: {
// 			a: 'red',
// 			b: 'blue',
// 			c: 'green',
// 			d: 'yellow'
// 		},
// 		CurrentAnswer: 'b',
// 		studentAnswer: ''
// 	}
// 	,
// 	{
// 		question: "What is the orange color?",
// 		answers: {
// 			a: 'red',
// 			b: 'orange',
// 			c: 'green',
// 			d: 'yellow'
// 		},
// 		CurrentAnswer: 'b',
// 		studentAnswer: ''
// 	}
// ];
var scope;

var app = angular.module('myApp', []);
//directive
app.directive("quiz", function () {
	return {
		template: '<p class="text-center">Question:{{currentQuestion.question}}' +
			'</p>' +
			'<div ng-repeat="(key, value)  in currentQuestion.answers track by $index">' +
			'<div class="form-check mb-4">' +
			'<input class="form-check-input" name="group1" type="radio" ng-model="currentQuestion.studentAnswer" id="radio-{{key}}" value={{key}}> ' +
			'<label class="form-check-label" for="radio-{{key}}">{{value}}</label>' +
			'</div>' +
			'</div>'
	};
});
app.directive("buttons", function () {
	return {
		template: '<div class="quiz-footer clearfix">' +
			'<a type="button" class="btn btn-outline-primary waves-effect " ng-click="prev()" ng-show=" current>0">Prev</a>' +
			'<a type="button" class="btn btn-outline-primary waves-effect float-right"  ng-click="next()" ng-show="doSelectAnswer() && (current+1 < totalQuestions)">Next</a>' +
			'<a type="button" class="btn btn-outline-primary waves-effect float-right"  ng-click="done()" ng-show="doSelectAnswer() && (current+1 == totalQuestions)">DONE</a>' +
			'</div>'
	};
});
app.controller('myCtrl', function ($scope, $http, $filter, $interval, $timeout) {
	$scope.test = false;
	$scope.scores = 0;
	$scope.quizFinish = false;
	$scope = $scope;
	// $http.post("./data.txt").then(function (res) {
	// 	$scope.myQuestions = res;
	// });

$scope.myQuestions = myQuestions;
$scope.current = 0;
//$scope.currentQuestion = $scope.myQuestions[$scope.current];
$scope.totalQuestions = myQuestions.length;
$scope.changeQuestion = () => {
	$scope.currentQuestion = $scope.myQuestions[$scope.current];
}
$scope.changeQuestion();//start
$scope.next = () => {
	$scope.current += 1;
	$scope.changeQuestion();
}
$scope.prev = () => {
	$scope.current -= 1;
	$scope.changeQuestion();
}
$scope.doSelectAnswer = () => {
	return $scope.currentQuestion.studentAnswer != '' ? true : false;
}
$scope.done = () => {
	$scope.getScores();
	$scope.quizFinish = true;
}
$scope.getScores = () => {
	amount = item => item.CurrentAnswer === item.studentAnswer ? 1 : 0;

	sum = (prev, next) => prev + next;

	if ($scope.totalQuestions > 0)
		$scope.scores = myQuestions.map(amount).reduce(sum) / $scope.totalQuestions * 100;


}
});
