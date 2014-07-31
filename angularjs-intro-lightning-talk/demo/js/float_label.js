'use strict';

angular.module('floatLabelApp', [])
.directive('floatLabel', function($compile){

  // Runs during compile
  return {
    scope: {
      label: '@placeholder',
      id: '@'
    }, 
    restrict: 'A', 
    replace: true,
    compile: function(tElement, tAttrs, transclude) {

      // remove float-label to avoid infinite loop
      var newElement = tElement.eq(0).clone().removeAttr('float-label'),
      container = angular.element('<div class="fl-control-group" ></div>');

      container.append(newElement).append('<label for="{{id}}">{{label}}</label>');
      tElement.replaceWith(container);

      return function($scope, iElm, iAttrs, controller) {
        var input = iElm.find('input'), label = iElm.find('label');
        if (input.length === 0) {
          input = iElm.find('textarea');
        }
        
        // compile element for interpolation
        $compile(iElm)($scope);

        input.on('focus', function() {

          label.addClass('fl-highlight');
          setTimeout(function labelTransition() {
            var opacity = (parseFloat(label.css('opacity')) || 0.0);

            if (opacity < 1 && label.hasClass('fl-highlight')) {
              label.css('opacity', opacity + 0.17);
              setTimeout(labelTransition, 200);
            }
          }, 200);
        });

        input.on('blur', function() {
          label.removeClass('fl-highlight');
          if (input.val() === '') {
            label.css('opacity', '0.0');
          }
        });
      }
    }
  };
});
