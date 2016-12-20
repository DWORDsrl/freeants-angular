(function () {
    'use strict';
    angular.module('freeants').factory('imagesDatacontext', ['$http', 'helpers','path', function ($http, helpers, path) {

    function imagesRawUrl(id) { return path.api + "/imagesRaw/" + (id || ""); }

    return {

        createImageRaw : function (imageData) {
            var req = $http({
                method: 'POST',
                headers: helpers.getSecurityHeaders(),
                url: imagesRawUrl(),
                data: '"' + imageData + '"'
            }).then(function (response) {
                return response.data;
            });
            return req;
        },

        deleteImageRaw: function (fileName) {
            var req = $http({
                method: 'DELETE',
                headers: helpers.getSecurityHeaders(),
                url: imagesRawUrl(fileName)
            }).then(function (response) {
                return response.data;
            });
            return req;
        }
    }
}]);
}());
