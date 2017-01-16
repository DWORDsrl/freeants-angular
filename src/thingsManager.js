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

	angular.module('freeants').factory('thingsManager', ['$q', 'thingsDataContext', 'thingUserRightsDataContext', 'ThingModel', 
    function ($q, thingsDataContext, thingUserRightsDataContext, ThingModel) {

        function getMoreThingChildren(thing, parameter, cancel) {

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

        function deleteThingChildren(parentThingId, recursive) {

            return thingsDataContext.getChildrenIds(parentThingId)
            .then(function (childrenIds) {

                var childrenPromises = [];

                for (var i = 0; i < childrenIds.length; i++) {
                    childrenPromises.push(deleteThing(childrenIds[i], recursive));
                }

                return $q.all(childrenPromises);
            });
        }        

        function addThingChild(thing, childThingRaw) {
            thing.children.unshift(new ThingModel(childThingRaw));
        }

        function collapseThing(thing, cancel) {
            if (cancel)
                cancel.resolve();
            thing.collapse();
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
        
        function createThing(thingRaw) {
            return thingsDataContext.createThing(thingRaw)
            .then(function (data) {
                return new ThingModel(data);
            });
        }        

        function deleteThing(thingId, recursive) {
            
            if (recursive) {
              return deleteThingChildren(thingId, recursive)
              .then(function(data){
                  return thingsDataContext.deleteThing(thingId);
              });   
            }

            return thingsDataContext.deleteThing(thingId);
        }        

        function shallowCopyThing(thing) {
            return thing.shallowCopy();
        }

        function addUser(thingId, thingUserRights, recursive) {

            if (recursive) {
                return thingsDataContext.getChildrenIds(thingId)
                .then(function (childrenIds) {

                    var childrenPromises = [];

                    for (var i = 0; i < childrenIds.length; i++) {
                        childrenPromises.push(addUser(childrenIds[i], thingUserRights, recursive));
                    }

                    return $q.all(childrenPromises);
                })
                .then(function(data) {
                    return thingUserRightsDataContext.createThingUserRights(thingId, thingUserRights)
                });
            }
            return thingUserRightsDataContext.createThingUserRights(thingId, thingUserRights)
        }

        function updateUser(thingId, userId, thingUserRights, recursive) {

            if (recursive) {
                return thingsDataContext.getChildrenIds(thingId)
                .then(function (childrenIds) {

                    var childrenPromises = [];

                    for (var i = 0; i < childrenIds.length; i++) {
                        childrenPromises.push(updateUser(childrenIds[i], userId, thingUserRights, recursive));
                    }

                    return $q.all(childrenPromises);
                })
                .then(function(data) {
                    return thingUserRightsDataContext.updateThingUserRights(thingId, thingUserRights)
                });
            }
            return thingUserRightsDataContext.updateThingUserRights(thingId, thingUserRights)
        }

        function removeUser(thingId, userId, recursive) {

            function deleteThingUserRights(thingId, userId) {
                var def = $q.defer();

                thingUserRightsDataContext.deleteThingUserRights(thingId, userId)
                .then(function(data) {
                    def.resolve(data);
                    return data;
                }, function(data) {
                    // Se non trovo lo User considero risolta la promise
                    if (data.status == 404/*Not Found*/)
                        def.resolve(data);
                    else
                        def.reject(data);
                    return data;
                });

                return def.promise;
            }

            if (recursive) {
                return thingsDataContext.getChildrenIds(thingId)
                .then(function (childrenIds) {

                    var childrenPromises = [];

                    for (var i = 0; i < childrenIds.length; i++) {
                        childrenPromises.push(removeUser(childrenIds[i], userId, recursive));
                    }

                    return $q.all(childrenPromises);
                })
                .then(function(data) {
                    return deleteThingUserRights(thingId, userId);
                });
            }
            return deleteThingUserRights(thingId, userId);
        }

        return {
            getThing: getThing,
            getThings: getThings,//INFO: Evitare di usare. Meglio usare getMoreThingChildren
            createThing: createThing,
            deleteThing: deleteThing,
            getMoreThingChildren: getMoreThingChildren,
            deleteThingChildren: deleteThingChildren,
            addThingChild: addThingChild,
            collapseThing: collapseThing,
            shallowCopyThing: shallowCopyThing,
            addUser : addUser,
            updateUser : updateUser,
            removeUser : removeUser
        }
    }]);
	
}());