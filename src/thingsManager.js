(function () {
    'use strict';

    // Deprecate
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
                    .then(getSucceeded);
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

	angular.module('freeants').factory('thingsManager', ['$q', 'thingsDataContext', 'ThingModel', function ($q, thingsDataContext, ThingModel) {

        function createThing(thingRaw) {
            return thingsDataContext.createThing(thingRaw)
            .then(function (data) {
                return new ThingModel(data);
            });
        }

        function deleteChildrenThings(parentThingId, recursive) {

            return thingsDataContext.getChildrenIds(parentThingId)
            .then(function (childrenIds) {

                var def = $q.defer();

                var childrenPromises = [];

                for (var i = 0; i < childrenIds.length; i++) {
                    childrenPromises.push(deleteThing(childrenIds[i], recursive));
                }

                return $q.all(childrenPromises)
                    .then(function (data) {
                        def.resolve(data);
                        return data;
                    }, function (data) {
                        def.reject(data);
                        return data;
                    });
            });
        }

        function deleteThing(thingId, recursive) {
            
            if (recursive) {
              return deleteChildrenThings(thingId)
              .then(function(data){
                  return thingsDataContext.deleteThing(thingId);
              });   
            }

            return thingsDataContext.deleteThing(thingId);
        }

        function getThings(parameter, timeout) {
            function getSucceded(data) {
                var things = [];

                for (var i = 0; i < data.things.length; i++) {
                    var thing = new ThingModel(data.things[i]);
                    things.push(thing);
                }

                return {
                    things: things,
                    itemsRange: data.itemsRange
                }
            }
            return thingsDataContext.getThings1(parameter, timeout)
                .then(getSucceded);
        }

        function getThing(thingId) {
            function getSucceded(data) {

                var thing = null;

                if (data) {
                    thing = new ThingModel(data);
                }
                return thing;
            }
            return thingsDataContext.getThing(thingId)
                .then(getSucceded);
        }

        function shallowCopyThing(thing) {
            var currentThing = null;
            if (thing) {
                currentThing = JSON.parse(JSON.stringify(thing));
                if (thing.children)
                    currentThing.children = thing.children;
                if (thing.usersInfos)
                    currentThing.usersInfos = thing.usersInfos;
            }
            return currentThing;
        }
          
        function elapseThing(thing, parameter, cancel) {

            parameter.skip = thing.childrenSkip;
            parameter.parentThingId = thing.id;

            return getThings(parameter, cancel)
            .then(function (data) {

                thing.childrenTotalItems = data.itemsRange.totalItems;
                thing.childrenSkip = thing.childrenSkip + parameter.top;
                //  Fix range
                if (thing.childrenSkip > thing.childrenTotalItems) {
                    thing.childrenSkip = thing.childrenTotalItems;
                }

                for (var i = 0; i < data.things.length;i++)
                    thing.children.push(data.things[i]);

                return data;
            });
        }

        function collapseThing(thing, cancel) {
            if (cancel)
                cancel.resolve();
            thing.children = [];
            thing.childrenSkip = 0;
        }

        function addChildThing(thing, childThingRaw) {
            thing.children.unshift(new ThingModel(childThingRaw));
        }

        return {
            createThing: createThing,
            deleteChildrenThings: deleteChildrenThings,
            deleteThing: deleteThing,
            getThings: getThings,
            getThing: getThing,
            shallowCopyThing: shallowCopyThing,
            elapseThing: elapseThing,
            collapseThing: collapseThing,
            addChildThing: addChildThing             
        }
    }]);
	
}());