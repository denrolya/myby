'use strict';

/* jshint -W098 */
angular.module('mean.myby').controller('MybyController', ['$scope', 'Global', 'Myby',
  function($scope, Global, Myby) {
    $scope.global = Global;
    $scope.package = {
      name: 'myby'
    };
  }
]);
