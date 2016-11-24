(function () {
  'use strict';

angular.module('data')
.component('categories', {
  templateUrl: 'src/tmp/ShowCategories.html',
  bindings: {
    items: '<',
    myTitle: '@title'
  }
});

})();
