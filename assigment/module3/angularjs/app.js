(function () {
'use strict';

angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .constant('MenuPath', "https://davids-restaurant.herokuapp.com")
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective(){
    var ddo = {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      scope: {
        foundItems: '<',
        onRemove: '&',
      } ,
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  };

  function FoundItemsDirectiveController(){

  };

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;

    menu.found=[];
    menu.nothingFoundFlag = false;

    menu.getItems = function (searchTerm ){
      if ((menu.searchTerm!=null) && (menu.searchTerm!="")){
        var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
        promise.then(function (response) {
            menu.found = response;
            menu.nothingFoundFlag = (menu.found.length==0) ;
        })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
        });
      } else {
        menu.nothingFoundFlag = true;
        menu.found = [];
      };
    };

    menu.removeItem = function (itemIndex) {
      menu.found.splice(itemIndex, 1);
      menu.nothingFoundFlag = menu.found.length == 0;
    };

  }

  MenuSearchService.$inject = ['$http','MenuPath'];
  function MenuSearchService($http, MenuPath){
    var service = this;

    service.getMatchedMenuItems = function(searchTerm){
      return $http({
          method: "GET",
          url: (MenuPath + "/menu_items.json")
      }).then(function (result) {
        var foundItems = [];
        for (var i=0; i<result.data.menu_items.length;i++){
          if ((result.data.menu_items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
              && (searchTerm != ""))
            foundItems.push(result.data.menu_items[i]);
        };
        return foundItems;
      });
    };

  }


})()
