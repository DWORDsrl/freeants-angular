(function () {
    'use strict';

    angular.module('freeants').factory('translationService', ['$translate', function ($translate) {

        var languages = {};
        var supportedLanguages = [];
        var localStorageLabel = "Language";
    return {
        getSupportedLanguages: function(){
            return supportedLanguages;
        },
        changeLanguage: function (language) {
            var lang = supportedLanguages[0].code;;
            for (var i = 0; i < supportedLanguages.length; i++) {
                if (language == supportedLanguages[i].code) {
                    localStorage.setItem(localStorageLabel, language);
                    lang = language;
                    break;
                }
            }
            $translate.refresh(lang);
            $translate.use(lang);
        },
        setLocalStorageLabel: function (label) {
            localStorageLabel = label;
        },
        getCurrentLanguage: function(){
            return localStorage.getItem(localStorageLabel);
        },
        initLanguage: function (language) {
            var lang = localStorage.getItem(localStorageLabel);
            if (!lang) {
                lang = supportedLanguages[0].code;
                for (var i = 0; i < supportedLanguages.length; i++) {
                    if (language == supportedLanguages[i].code) {
                        lang = language;
                        break;
                    }
                }
            }
            $translate.refresh(lang);
            $translate.use(lang);
        },
        setLanguages: function (data) {
            angular.merge(languages, data);
        },
        initialize: function (obj) {
            angular.merge(languages, obj);
         },
        getLanguages: function (data) {
            return languages;
        },
        setSupportedLanguages: function (supportedLang) {
            supportedLanguages = supportedLang;
        },
        getSupportedLanguages: function () {
            return supportedLanguages;
        },
        setGlobalization: function (culture) {
            var deviceLanguage = "English";
            var deviceCulture = "en-GB";

            var language = culture;
            if (!language)
                language = $translate.use();
            for (var i = 0; i < supportedLanguages.length; i++) {
                if (language == supportedLanguages[i].code) {
                    deviceLanguage = supportedLanguages[i].deviceLanguage;
                    deviceCulture = supportedLanguages[i].deviceCulture;
                }
            }
            $translate.refresh(deviceCulture);
            $translate.use(deviceCulture);
        }
    }
    }]);
}());