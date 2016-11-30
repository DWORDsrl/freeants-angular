(function () {
    'use strict';

    angular.module('freeants').factory('UsersManager', ['$q', '$filter', 'userDataContext', function ($q, $filter, userDataContext) {
        
        function UsersManager() {

            this.skip = 0;
            this.usersTotalItems = Number.MAX_SAFE_INTEGER;

            this.users = [];

            this.getUsersParams = {			
                filter: "",
                top: 5,
                skip: this.skip,
                orderBy: null,
            };
        }

        UsersManager.prototype.getMoreUsers = function getMoreUsers(cancel) {
            var self = this;

            self.getUsersParams.skip = self.skip;

            return userDataContext.getUsers(this.getUsersParams, cancel)
            .then(function(data) {

                self.usersTotalItems = data.itemsRange.totalItems;
                self.skip += self.getUsersParams.top;
                //  Fix range
                if (self.skip > self.usersTotalItems) {
                    self.skip = self.usersTotalItems;
                }

                for (var i = 0; i < data.users.length;i++)
                    self.users.push(data.users[i]);

                return data;
            });              
        }

        UsersManager.prototype.getUsersTotalItems = function() {
            return this.usersTotalItems;
        }

        return UsersManager;

    }]);
	
}());