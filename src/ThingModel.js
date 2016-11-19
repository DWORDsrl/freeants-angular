(function() {
    'use strict';

    angular.module('freeants').factory('ThingModel', [function () {
		
        function ThingModel(thingData) {
                        
            this.setData(thingData);

        };

        ThingModel.prototype = {
            elapsed : false,
            setData: function (thingData) {

                if (thingData) {
                    angular.extend(this, thingData);
                }

                if (this.value == null || this.value == "") {
                    this.value = {};
                }
                this.value = angular.fromJson(this.value);

                if (!this.children) {
                    angular.extend(this, { children: [] });
                }
            }
        };

        return ThingModel;
    }]);
}());