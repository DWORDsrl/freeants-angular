(function() {
    'use strict';

    angular.module('freeants').factory('ThingModel', [function () {
		
        function ThingModel(thingRaw, children, skip, totalItems) {
            
            this.childrenSkip = !!skip ? skip : 0;
            this.childrenTotalItems = !!totalItems ? totalItems : Number.MAX_SAFE_INTEGER;
            this.children = !!children ? children : [];
            
            this.setData(thingRaw);
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
            },
            dispose: function() {
                this.children = [];
                this.childrenSkip = 0;
                this.childrenTotalItems = Number.MAX_SAFE_INTEGER;
            }
        };

        

        return ThingModel;
    }]);
}());