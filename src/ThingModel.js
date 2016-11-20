(function() {
    'use strict';

    angular.module('freeants').factory('ThingModel', [function () {
		
        function ThingModel(thingData) {
                        
            this.setData(thingData);

        };

        ThingModel.prototype = {
            childrenSkip : 0,
            childrenTotalItems: Number.MAX_SAFE_INTEGER,
            children: [],
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