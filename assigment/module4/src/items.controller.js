(function () {
  'use strict';

  angular.module('data')
  .controller('ItemsController',ItemsController);

  ItemsController.$inject = ['MyData2'];
  function ItemsController(MyData2){
    var menu = this;
    menu.MyData2 = MyData2;
  }

})();
