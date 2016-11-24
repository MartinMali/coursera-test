(function () {
  'use strict';

angular.module('data')
.component('itemsComponent', {
  templateUrl: 'src/tmp/ShowItems.html',
  bindings: {
    items: '<',
    myTitle: '@title'
  }
})

})();
