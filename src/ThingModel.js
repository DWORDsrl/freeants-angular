(function() {
    'use strict';

    angular.module('freeants').factory('ThingModel', [function () {
		
        function ThingModel(thingData) {
            
            this.childrenSkip = 0;
            this.childrenTotalItems = Number.MAX_SAFE_INTEGER;
            this.children = [];
            
            this.setData(thingData);
        };

        ThingModel.prototype = {
            setData: function (thingData) {

                if (thingData) {
                    angular.extend(this, thingData);
                }

                if (this.value == null || this.value == "") {
                    this.value = {};
                }
                this.value = angular.fromJson(this.value);
            }
        };

        return ThingModel;
    }]);
}());