(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to tab home if no other URL matches
    $urlRouterProvider.otherwise('/home');

  // Set up UI states
    $stateProvider
    .state('Home', {
      url: '/home',
      templateUrl: 'src/tmp/home.html'
    })

    .state('Categories', {
      url: '/categories',
      templateUrl: 'src/tmp/categories.html',
      controller: 'CategoriesController as MyData',
      resolve: {
                 MyData: ['MenuDataService', function(MenuDataService) {
                   return MenuDataService.getAllCategories();
                 }]
               }
    })

    .state('Items', {
      url: '/items/{itemId}',
      templateUrl: 'src/tmp/items.html',
      controller: 'ItemsController as MyData2',
      resolve: {
           MyData2: ['$stateParams','MenuDataService',
            function($stateParams,MenuDataService){
            return MenuDataService.getItemsForCategory($stateParams.itemId);
                   }]
               }
    });
  }
})();
