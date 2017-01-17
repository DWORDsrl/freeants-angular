(function () {
    
    'use strict';

    angular.module('freeants').constant("thingClaims", {
    
        ThingUserRoleAdministrator: 1,
        ThingUserRoleUser: 2,
        ThingUserRoleSuperAdministrator: 4,// TODO: forse non serve

        ThingUserStatusOk: 1,
        ThingUserStatusWaitForAuth: 2,

        ThingUserVisibilityVisible: 1,
        ThingUserVisibilityHidden: 2,

        ThingDeletedStatusOk: 1,
        ThingDeletedStatusDeleted: 2,

        ThingUserReadClaimsCanReadThingUserChangeClaims: 1,
        ThingUserReadClaimsCanReadCreationDate: 2,
        ThingUserReadClaimsCanReadName: 4,
        ThingUserReadClaimsCanReadDescription: 8,
        ThingUserReadClaimsCanReadKind: 16,
        ThingUserReadClaimsCanReadValue: 32,
        ThingUserReadClaimsCanReadDeletedStatus: 64,
        ThingUserReadClaimsCanReadThingUserRights: 128,
        ThingUserReadClaimsCanReadThingUserRole: 256,
        ThingUserReadClaimsCanReadThingUserStatus: 512,
        ThingUserReadClaimsCanReadThingUserReadClaims: 1024,
        //ThingUserReadClaimsCanReadThingUserChangeClaims: 1,
        ThingUserReadClaimsCanReadPublicReadClaims: 2048,
        ThingUserReadClaimsCanReadPublicChangeClaims: 4096,
        ThingUserReadClaimsCanReadEveryoneReadClaims: 8192,
        ThingUserReadClaimsCanReadEveryoneChangeClaims: 16384,

        ThingUserReadClaimsNoClaims: 0x0,
        ThingUserReadClaimsAllClaims: 32767,
        /*
            ThingUserReadClaimsCanReadThingUserChangeClaims |
            ThingUserReadClaimsCanReadCreationDate | ThingUserReadClaimsCanReadName |
            ThingUserReadClaimsCanReadDescription | ThingUserReadClaimsCanReadKind |
            ThingUserReadClaimsCanReadValue | ThingUserReadClaimsCanReadDeletedStatus |
            ThingUserReadClaimsCanReadThingUserRights | ThingUserReadClaimsCanReadThingUserRole |
            ThingUserReadClaimsCanReadThingUserStatus | ThingUserReadClaimsCanReadThingUserReadClaims |
            ThingUserReadClaimsCanReadPublicReadClaims | ThingUserReadClaimsCanReadPublicChangeClaims |
            ThingUserReadClaimsCanReadEveryoneReadClaims | ThingUserReadClaimsCanReadEveryoneChangeClaims,
        */

        ThingUserChangeClaimsCanDeleteThing: 1,
        ThingUserChangeClaimsCanChangeName: 2,
        ThingUserChangeClaimsCanChangeDescription: 4,
        ThingUserChangeClaimsCanChangeKind: 8,
        ThingUserChangeClaimsCanChangeValue: 16,
        ThingUserChangeClaimsCanChangeDeletedStatus: 32,
        ThingUserChangeClaimsCanAddThingUserRights: 64,
        ThingUserChangeClaimsCanDeleteThingUserRights: 128,
        ThingUserChangeClaimsCanChangeThingUserRole: 256,
        ThingUserChangeClaimsCanChangeThingUserStatus: 512,
        ThingUserChangeClaimsCanChangeThingUserReadClaims: 1024,
        ThingUserChangeClaimsCanChangeThingUserChangeClaims: 2048,
        ThingUserChangeClaimsCanChangePublicReadClaims: 4096,
        ThingUserChangeClaimsCanChangePublicChangeClaims: 8192,
        ThingUserChangeClaimsCanChangeEveryoneReadClaims: 16384,
        ThingUserChangeClaimsCanChangeEveryoneChangeClaims: 32768,
        ThingUserChangeClaimsCanAddChildrenThing: 65536,
        ThingUserChangeClaimsCanRemoveChildrenThing: 131072,

        ThingUserChangeClaimsNoClaims: 0x0,

        ThingUserChangeClaimsAllClaims: 262143,
            /*
            ThingUserChangeClaimsCanDeleteThing |
            ThingUserChangeClaimsCanChangeName | ThingUserChangeClaimsCanChangeDescription |
            ThingUserChangeClaimsCanChangeKind | ThingUserChangeClaimsCanChangeValue |
            ThingUserChangeClaimsCanChangeDeletedStatus | ThingUserChangeClaimsCanAddThingUserRights |
            ThingUserChangeClaimsCanDeleteThingUserRights | ThingUserChangeClaimsCanChangeThingUserRole |
            ThingUserChangeClaimsCanChangeThingUserStatus | ThingUserChangeClaimsCanChangeThingUserReadClaims |
            ThingUserChangeClaimsCanChangeThingUserChangeClaims | ThingUserChangeClaimsCanChangePublicReadClaims |
            ThingUserChangeClaimsCanChangePublicChangeClaims | ThingUserChangeClaimsCanChangeEveryoneReadClaims |
            ThingUserChangeClaimsCanChangeEveryoneChangeClaims | 
            ThingUserChangeClaimsCanAddChildrenThing | ThingUserChangeClaimsCanRemoveChildrenThing
            */
    });

}());