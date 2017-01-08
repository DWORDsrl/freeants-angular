(function() {
    'use strict';
    
    angular.module('freeants').factory('thingsDataContext', ['$http', 'helpers', 'path', '$q', function ($http, helpers, path, $q) {

    //End points
    function thingChildrenUrl(parentThingId, childrenId) {
        return path.api + "/things/" + (parentThingId) + "/childrenIds/" + (childrenId || "");
    }
    function thingsUrl(id) { return path.api + "/things/" + (id || ""); }
    function thingsValueUrl(id) { return path.api + "/things/" + id + "/value" }
    function thingsPositionUrl() { return path.api + "/things/position" }
    function thingsPositionsUrl() { return path.api + "/things/positions" }
    function thingDeleteChild(parentThingId, childThingId) { return path.api + "/things/" + parentThingId + "/childrenIds/" + childThingId }

    //TODO: Ma funziona? E' stata mai provata?
    var getThingsWithAbort = function () {
        var canceller = $q.defer();

        var cancel = function (reason) {
            canceller.resolve(reason);
        };

        var promise =
            $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                timeout: canceller.promise,
                url: thingsUrl() + "?" +
                    (!!parameter.parentThingId ? ("&$parentId=" + parameter.parentThingId) : "") +
                    (!!parameter.filter ? ("&$filter=" + parameter.filter) : "") +
                    (!!parameter.top ? ("&$top=" + parameter.top) : "") +
                    (!!parameter.skip ? ("&$skip=" + parameter.skip) : "") +
                    (parameter.deleteStatus == null || parameter.deleteStatus == undefined ? "" : "&$deletedStatus=" + parameter.deleteStatus) +
                    (!!parameter.orderBy ? ("&$orderby=" + parameter.orderBy) : "") +
                    (!!parameter.valueFilter ? ("&$valueFilter=" + parameter.valueFilter) : "")
            })
            .then(function (response) {
                return response.data;
            });

        return {
            promise: promise,
            cancel: cancel
        };
    };

    return {

        // Deprecate
        getThings: function (parameter, defer) {
            var urlRaw = thingsUrl() + "?" +
                    (!!parameter.parentThingId ? ("&$parentId=" + parameter.parentThingId) : "") +
                    (!!parameter.filter ? ("&$filter=" + parameter.filter) : "") +
                    (!!parameter.top ? ("&$top=" + parameter.top) : "") +
                    (!!parameter.skip ? ("&$skip=" + parameter.skip) : "") +
                    (parameter.deleteStatus == null || parameter.deleteStatus == undefined ? "" : "&$deletedStatus=" + parameter.deleteStatus) +
                    (!!parameter.orderBy ? ("&$orderby=" + parameter.orderBy) : "") +
                    (!!parameter.valueFilter ? ("&$valueFilter=" + parameter.valueFilter) : "");
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                timeout: (defer) ? (defer.promise) : null,
                url: urlRaw
            }).then(function (response) {                
                return response.data;
            });
            return req;
        },
        getThings1: function (parameter, timeout) {
            var urlRaw = thingsUrl() + "?" +
                    (!!parameter.parentThingId ? ("&$parentId=" + parameter.parentThingId) : "") +
                    (!!parameter.filter ? ("&$filter=" + parameter.filter) : "") +
                    (!!parameter.top ? ("&$top=" + parameter.top) : "") +
                    (!!parameter.skip ? ("&$skip=" + parameter.skip) : "") +
                    (parameter.deleteStatus == null || parameter.deleteStatus == undefined ? "" : "&$deletedStatus=" + parameter.deleteStatus) +
                    (!!parameter.orderBy ? ("&$orderby=" + parameter.orderBy) : "") +
                    (!!parameter.valueFilter ? ("&$valueFilter=" + parameter.valueFilter) : "");
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                timeout: (timeout) ? (timeout.promise) : null,
                url: urlRaw
            }).then(function (response) {                                            
                return {
                    things: response.data,
                    itemsRange: helpers.getRangeItemsFromResponse(response)
                };
            });
            return req;
        },
        getThing: function (thingId) {
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: thingsUrl(thingId)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        getThingsWithAbort: getThingsWithAbort,
        
        createThing: function (thing) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: thingsUrl(),
                data: thing
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        updateThing: function (thingId, thing) {
            var req = $http({
                method: 'PUT',
                headers: helpers.getSecurityHeaders(),
                url: thingsUrl(thingId),
                data: thing
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        deleteThing: function (thingId) {
            var req = $http({
                method: 'DELETE',
                headers: helpers.getSecurityHeaders(),
                url: thingsUrl(thingId)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        getChildrenIds: function (parentThingId){
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: thingChildrenUrl(parentThingId)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        addChildToParent: function (parentThingId, childThingId) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: thingChildrenUrl(parentThingId),
                data: angular.toJson(childThingId)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        deleteThingChild: function (parentThingId, childThingId) {
            var req = $http({
                method: 'DELETE',
                headers: helpers.getSecurityHeaders(),
                url: thingDeleteChild(parentThingId, childThingId)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        getThingValue: function (thingId, value) {
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: thingsValueUrl(thingId)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        putThingValue: function (thingId, value) {
            var req = $http({
                method: 'PUT',
                headers: helpers.getSecurityHeaders(),
                url: thingsValueUrl(thingId),
                data: value
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        putThingPosition: function (parentThingId, childThingId, position) {
            var req = $http({
                method: 'PUT',
                headers: helpers.getSecurityHeaders(),
                url: thingsPositionUrl(),
                data: JSON.stringify({ "parentId": parentThingId, "childId": childThingId, "pos": position })
            }).then(function (response) {
                return response.data;
            });
            return req;
        },
        putThingsPositions: function (positions) {
            var req = $http({
                method: 'PUT',
                headers: helpers.getSecurityHeaders(),
                url: thingsPositionsUrl(),
                data: positions
            }).then(function (response) {
                return response.data;
            });
            return req;
        }
    }
}]);
}());