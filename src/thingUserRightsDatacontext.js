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
                url: thingsUserRoleStatusUrl(parameter.thingId) + "?&parentId=" +
                    (parameter.id == null || parameter.id == undefined ? "" : parameter.id) +
                    ((parameter.filter != null || parameter.filter != undefined) ? ("&$filter=" + parameter.filter) : "") +
                    ((parameter.top != null || parameter.top != undefined) ? ("&$top=" + parameter.top) : "") +
                    ((parameter.skip != null || parameter.skip != undefined) ? ("&$skip=" + parameter.skip) : "") +
                    ((parameter.orderBy != null || parameter.orderBy != undefined) ? ("&$orderby=" + parameter.orderBy) : "")
            }).then(function (response) {
                return response.data;
            }, function (response) {
                return $q.reject(response);
            });
            return req;
        },

        createThingUserRights: function (thingId, thingUserRights) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: thingsUserRoleStatusUrl(thingId),
                data: thingUserRights
            }).then(function (response) {
                return response.data;
            }, function (response) {
                return $q.reject(response);
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
            }, function (response) {
                return $q.reject(response);
            });
            return req;
        },

        deleteThingUserRights: function (thingId, userId) {
            var req = $http({
                method: 'DELETE',
                headers: helpers.getSecurityHeaders(),
                url: thingsUserRoleStatusUrl(thingId, userId)
            }).then(function (response) {
                return response.data;
            }, function (response) {
                return $q.reject(response);
            });
            return req;
        }
    }
}]);
}());