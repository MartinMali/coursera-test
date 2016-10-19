(function () {
'use strict';

angular.module('LunchCheck',[])
.controller('LunchCheckController', LunchCheck);
 
LunchCheck.$inject = ['$scope'];
function LunchCheck($scope){
  $scope.text1 = "";  //input text
  $scope.text2 = "";  //output text
  $scope.color2 = "#000000"; //output color

  $scope.displayText = function () {
     calculateIT($scope.text1);
  };

  function calculateIT(s1) {
     var n = 0;
     var buffer = ""; //buffer for characters between commas
     var red = '#FF0000';
     var green = '#00FF00';
     if (s1==null){
       s1 = "";};
     for (var i = 0; i < s1.length; i++) {
        if (s1[i]==',') {
          if (buffer.length > 0) {
            n = n + 1;
            buffer = "";
          };
        }
        else{
          if (!((buffer.length==0) && (s1[i]==' '))){
             buffer = buffer + s1[i];
          };
        };
     };
     if (buffer.length>0)
       n += 1;
     if (n == 0)
      { $scope.text2 = "Please enter data first";
        $scope.color2 = red; }
     else if (n < 4)
      { $scope.text2 = "Enjoj!";
        $scope.color2 = green; }
     else {
       $scope.text2 = "Too much!";
       $scope.color2 = green;
     };
  }
}
})();
