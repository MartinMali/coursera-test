(function () {
  'use strict';

  angular.module('data')
  .controller('CategoriesController',CategoriesController);

  CategoriesController.$inject = ['MyData'];
  function CategoriesController(MyData){
    var menu = this;
    menu.MyData = MyData;
  }

})();
