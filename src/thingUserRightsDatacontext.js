(function () {
    'use strict';
    angular.module('freeants').factory('thingUserRightsDataContext', ['$q', '$http', 'helpers', 'path', function ($q, $http, helpers, path) {

    // routes
    function thingsUserRoleStatusUrl(thingId, userId) {
        return path.api + "/things/" + thingId + "/usersrights" + (userId != undefined ? ("/" + userId) : "");
    }

    return {

        getThingUsersRights: function (parameter) {
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: thingsUserRoleStatusUrl(parameter.thingId) + "?" +
                    (!!parameter.filter ? ("&$filter=" + parameter.filter) : "") +
                    (!!parameter.top ? ("&$top=" + parameter.top) : "") +
                    (!!parameter.skip ? ("&$skip=" + parameter.skip) : "") +
                    (!!parameter.orderBy ? ("&$orderby=" + parameter.orderBy) : "")
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        createThingUserRights: function (thingId, thingUserRights) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: thingsUserRoleStatusUrl(thingId),
                data: thingUserRights
            })
            .then(function (response) {
                return response.data;
            });
            return req;
        },

        updateThingUserRights: function (thingId, userId, thingUserRights) {
            var req = $http({
                method: 'PUT',
                headers: helpers.getSecurityHeaders(),
                url: thingsUserRoleStatusUrl(thingId, userId),
                data: thingUserRights
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        deleteThingUserRights: function (thingId, userId) {
            var req = $http({
                method: 'DELETE',
                headers: helpers.getSecurityHeaders(),
                url: thingsUserRoleStatusUrl(thingId, userId)
            })
            .then(function (response) {
                return response.data;
            });
            return req;
        }
    }
}]);
}());