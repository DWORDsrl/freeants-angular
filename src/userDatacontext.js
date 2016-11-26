(function () {
    'use strict';
    angular.module('freeants').factory('userDataContext', ['$http', 'helpers', function ($http, helpers) {

    function usersUrl(id) { return GlobalPathApiUri + "/users/" + (id || ""); }

    return {

        getUsers : function (filter, orderBy, top, skip) {
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: usersUrl() + "?&parentId=" +
                    (parameter.id == null || parameter.id == undefined ? "" : parameter.id) +
                    ((parameter.filter != null || parameter.filter != undefined) ? ("&$filter=" + parameter.filter) : "") +
                    ((parameter.top != null || parameter.top != undefined) ? ("&$top=" + parameter.top) : "") +
                    ((parameter.skip != null || parameter.skip != undefined) ? ("&$skip=" + parameter.skip) : "") +
                    ((parameter.orderBy != null || parameter.orderBy != undefined) ? ("&$orderby=" + parameter.orderBy) : "")
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        getUser : function (userId) {
            var req = $http({
                method: 'GET',
                headers: helpers.getSecurityHeaders(),
                url: usersUrl(userId)
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        createUser : function (userModel) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: usersUrl(),
                data: userModel
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        updateUser : function (userId, userModel) {
            var req = $http({
                method: 'PUT',
                headers: helpers.getSecurityHeaders(),
                url: usersUrl(userId),
                data: userModel
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        deleteUser: function (userId) {
            var req = $http({
                method: 'DELETE',
                headers: helpers.getSecurityHeaders(),
                url: usersUrl(userId)
            }).then(function (response) {
                return response.data;
            });
            return req;
        }
    }
}]);
}());