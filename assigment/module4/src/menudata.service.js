(function () {
  'use strict';

  angular.module('data')
  .service('MenuDataService',MenuDataService);

  MenuDataService.$inject = ['$http','MenuPath'];
  function MenuDataService($http, MenuPath){
    var service = this;

    service.getAllCategories = function(){
      return $http({
        method: "GET",
        url: (MenuPath + "/categories.json")
      }).then(function (result) {
        var foundCategories = [];
        foundCategories = result.data;
        return foundCategories;
      });
    };

    service.getItemsForCategory = function(categoryShortName){
      return $http({
        method: "GET",
        url: (MenuPath + "/menu_items.json?category=" + categoryShortName)
      }).then(function (result) {
        var foundItems = [];
         foundItems = result.data.menu_items;
        return foundItems;
      });
    };
    return service;
  }

})();
