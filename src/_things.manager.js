
(function () {
    'use strict';
    angular.module('freeants').factory('ThingsManager', [ '$q', 'ThingModel', function ($q, ThingModel) {

        var objDataContexts;

        function ThingsManager(dataContexts) {
            objDataContexts = dataContexts;
        };
        ThingsManager.prototype = {
            getThings: function (parameter, defer) {
                function getSucceeded(data) {
                    var pool = [];

                    for (var i = 0; i < data.length; i++) {
                        var thing = new ThingModel(data[i]);
                        pool.push(thing);
                    }

                    return pool;
                }
                return objDataContexts.thingsDataContext.getThings(parameter, defer)
                    .then(getSucceeded,
                    function (response) {
                    return $q.reject(response);
                });
            },

            //TODO: A cosa serve?
            toThingModel: function (array, thingsModel, thingKind) {
                for (var i = 0; i < array.length; i++) {
                    var t = new ThingModel();
                    t.kind = thingKind;
                    t.value = array[i];
                    thingsModel.push(t);
                }
            },
            getThingsTree: function (parameter, timeout) {

                function getThingsSuccess(deferred, pool) {

                    var things = pool || [];

                    objDataContexts.thingsDataContext.getThings(parameter, timeout)
					.then(function (data) {

					    if (data.length == 0) {
					        deferred.resolve(things);
					    }

					    var promises = [];

					    for (var i = 0; i < data.length; i++) {

					        var thing = new ThingModel(data[i]);

					        things.push(thing);

					        var def = $q.defer();
					        promises.push(def.promise);

					        parameter.parentThingId = thing.id;
					        getThingsSuccess(def, thing.children);
					    }

					    $q.all(promises).then(function (data) {
					        deferred.resolve(things);
					    }, function (data) {
					        deferred.reject(data);
					    });

					}
					, function (data) {
					    deferred.reject(data);
					});

                    return deferred.promise;

                }

                var deferred = $q.defer();
                return getThingsSuccess(deferred);
            }
    };

    return ThingsManager
}]);

	angular.module('freeants').factory('thingsManager1', ['$q', 'thingsDataContext', 'ThingModel', function ($q, thingsDataContext, ThingModel) {

        function getThings(parameter, defer) {
            function getSucceded(data) {
                var pool = [];

                for (var i = 0; i < data.length; i++) {
                    var thing = new ThingModel(data[i]);
                    pool.push(thing);
                }

                return pool;
            }
            return thingsDataContext.getThings(parameter, defer)
                .then(getSucceded);
        }        
          
        function elapseThing(thing, parameter, defer) {
            if (thing.elapsed == true)
                return;

            parameter.parentThingId = thing.id;
            
            return getThings(parameter, defer)
            .then(function (things) {
                if (thing.elapsed == false) {
                    thing.children = things;
                    thing.elapsed = true;
                    return;
                }
                // Useful for pagination
                for (var i = 0; i < things.length;i++)
                    thing.children.push(things[i]);

                return things;
            });
        }

        return {
            getThings: getThings,
            elapseThing: elapseThing 
        }
    }]);
	
}());