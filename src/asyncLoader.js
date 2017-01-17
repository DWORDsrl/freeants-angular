(function () {

    'use strict';

    angular.module('freeants').factory('asyncLoader', ['$q', '$timeout', 'translationService', 
    function ($q, $timeout, translationService) {
        var loader = function (options) {
            var deferred = $q.defer();
            var languages = translationService.getLanguages();
            var language = {};
            if (languages && languages[options.key])
                language = languages[options.key];

            $timeout(function () {
                deferred.resolve(language);
            }, 2000);
            return deferred.promise;
        };
        return loader;
    }]);
    
}());