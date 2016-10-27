(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
 .controller('ToBuyController', ToBuyController)
 .controller('AlreadyBoughtController', AlreadyBoughtController)
 .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buyList = this;

  buyList.items = ShoppingListCheckOffService.getItems();

  buyList.itemName = "";
  buyList.itemQuantity = "";

  buyList.buyItem = function(itemIndex){
    ShoppingListCheckOffService.buyItem( itemIndex );
  };

  buyList.isToBuyListEmpty = function(){
    return ShoppingListCheckOffService.isToBuyListEmpty();
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var aBoughtList = this;

  aBoughtList.items = ShoppingListCheckOffService.returnItems();

  aBoughtList.itemName = "";
  aBoughtList.itemQuantity = "";

  aBoughtList.returnItem = function (itemIndex) {
    ShoppingListCheckOffService.returnItem(itemIndex);
  }

  aBoughtList.isBoughtListEmpty = function(){
    return ShoppingListCheckOffService.isBoughtListEmpty();
  }
}

// // If not specified, maxItems assumed unlimited2
function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyItems = [{itemName:'Cookies',itemQuantity:3},
      {itemName:'Milk',itemQuantity:1},
      {itemName:'Aples',itemQuantity:2},
      {itemName:'Bananas',itemQuantity:3},
      {itemName:'Chocolates',itemQuantity:4}];
  var boughtItems = [];

  service.getItems = function () {
    return toBuyItems;
  }

  service.returnItems = function () {
     return boughtItems;
  }

  service.buyItem = function (index) {
      boughtItems.push(toBuyItems[index]);
      toBuyItems.splice(index, 1);
  };

  service.returnItem = function (index) {
    toBuyItems.push(boughtItems[index]);
    boughtItems.splice(index, 1);
  };

  service.isToBuyListEmpty = function() {
    return toBuyItems.length==0;
  }

  service.isBoughtListEmpty = function() {
    return boughtItems.length==0;
  }
}

})();
