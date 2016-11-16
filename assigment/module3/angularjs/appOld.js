(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('NarrowItDownService', NarrowItDownService)
.constant('MenuPath', "https://davids-restaurant.herokuapp.com")
.controller('FoundItemsDirectiveController', FoundItemsDirectiveController)
.directive('foundItems',FoundItemsDirective)
;

// FoundItemsDirective.$inject = [FoundItemsDirective];
// function FoundItemsDirective(){
//    var ddo = {
//      templateUrl : 'foundItems.html'
//     //  scope: {
//     //    items: '<',
//     //    title: '@title'},
//     //  controller : FoundItemsDirectiveController,
//     //  controllerAs : 'list',
//     //  bindToController : true
//      };
//  console.log('test 1');
//    return ddo;
// };
//
// FoundItemsDirectiveController.$inject = [FoundItemsDirectiveController];
// function FoundItemsDirectiveController(){
//   var list = this;
// // console.log('test 2 - searchTerm:', list.searchTerm);
// // console.log('length 2: ',list.length);
// //   // for (var i = 0; i < list.length; i++){
// //   //   var name = list.items[i].name;
// //   //   if (name.toLowerCase().indexOf(list.searchTerm) !== -1){
// //   //     return true;
// //   //   }
// //   // }
// //   console.log('test 3', list);
// // //  return true;
// //   // return true;
// };

NarrowItDownController.$inject = [NarrowItDownService];
function NarrowItDownController(NarrowItDownService) {
  var menu = this;
  console.log('to je to',menu);
  menu.menu_items = NarrowItDownService.getFounds();
//  menu.menu_items = NarrowItDownService.getFounds( menu.searchTerm);
//  var promise = NarrowItDownService.getFounds();

  // promise.then(function (response) {
  //   menu.categories = response.data;
  // console.log('xxx',menu.categories.menu_items.length);
  // console.log('xxx2',menu.categories);
  // })
  // .catch(function (error) {
  //   console.log("Something went terribly wrong.");
  // });

  // setFound = function(){
  //   menu.setfound();
  // }
  menu.addItem = function(){
    NarrowItDownService.addItem(name1,short_name1,description1)
  };

  menu.removeItem = function (itemIndex) {
    NarrowItDownService.removeItem(itemIndex);
  };

  menu.foundLength = function(){
    return NarrowItDownService.length;
  }

};


NarrowItDownService.$injec = ['$http','MenuPath'];
function NarrowItDownService($http, MenuPath) {
  var service = this;

  var searchTerm = "";
  // List of shopping items
  var found = [];


  found.addItem = function (name1, short_name1, description1) {
    var item = {
        name: name1,
        short_name: short_name1,
        description: description1
    };
    found.push(item);
  };

  service.addItem = function (name1, short_name1, description1){
    found.addItem(name1, short_name1, description1);
  };

  service.getFounds = function (searchTerm) {
    service.getMatchedMenuItems(searchTerm);
    return found;
  };

  service.getMatchedMenuItems = function(searchTerm){
    var allItems = $http({
      method: "GET",
      url: (MenuPath + "/menu_items.json")
    });
    return allItems.then( function(response){
 console.log('response:',response.data.menu_items[0]);

 for ( var i = 0; i < response.data.menu_items.length; i++){
   var item = {
     description : response.data.menu_items[i].description,
     name : response.data.menu_items[i].name,
     short_name : response.data.menu_items[i].short_name
   };
   if (item.description.toLowerCase().indexOf(searchTerm) !== -1){
     found.addItem( item.name, item.short_name, item.description);
   };
 };
   console.log('searchTerm: ', searchTerm);
   console.log('found: ',found);
      return found;
    });
    // console.log( 'AllItems',allItems );
    // console.log( allItems.items);
    // console.log('Test click - searchTerm:',searchTerm);
    // console.log('allItems:', service.allItems );
    // console.log('allItems.length:', allItems.length );
    // console.log('MenuPath:', MenuPath );
    //
    // for ( var i = 0; i < allItems.length; i++){
    //   var name = allItems.items[i].description;
    //   var item = allItems.items[i];
    //   if (name.toLowerCase().indexOf(searchTerm) !== -1){
    //     found.addItem( item.name, item.short_name, item.description);
    //   }
    // };
    // found.addItem( 'ime','I1', 'opis'); //item.name, item.short_name, item.description);
    // console.log('found.length:', found.length);
    // return found;
  };

  service.removeItem = function (itemIndex) {
    found.splice(itemIndex, 1);
  };

  // found.addItem = function(name1, short_name1, description1){
  //   found.addItem( name1, short_name1, description1);
  // };
  //
  service.foundLength = function(){
    return 5;
    // found.length;
  };

};

})();
