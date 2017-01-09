(function () {
    'use strict';

    angular.module('freeants').factory('localizator', ['$translate',  function ($translate) {
        var localStorageLabel = "Language";
        var supportedLanguages = [
            {
                name: "English",
                code: "en-GB"
            },
            {
                name: "Italian",
                code: "it-IT"
            }
        ];

        return {
            setLocalStorageLabel : function(label){
                localStorageLabel = label;
            },
            setSupportedLanguages:function(supportedLangs){
                supportedLanguages = supportedLangs;
            },
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
                $translate.use(lang);
            },

            initLanguage: function (language) {
                var lang = localStorage.getItem(localStorageLabel);
                if (!lang) {
                    lang = supportedLanguages[0].code;
                    for (var i = 0; i < supportedLanguages.length; i++) {
                        if (language == supportedLanguages[i].code) {
                            lang = language;
                            localStorage.setItem(localStorageLabel, lang);
                            break;
                        }
                    }
                }
                $translate.use(lang);
            }
        }
    }]);
}());