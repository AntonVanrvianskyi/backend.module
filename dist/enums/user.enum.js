"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EUserRoles = exports.EUserBanStatus = exports.EUserTypeAccount = void 0;
var EUserTypeAccount;
(function (EUserTypeAccount) {
    EUserTypeAccount["Base"] = "Base";
    EUserTypeAccount["Premium"] = "Premium";
})(EUserTypeAccount || (exports.EUserTypeAccount = EUserTypeAccount = {}));
var EUserBanStatus;
(function (EUserBanStatus) {
    EUserBanStatus["Banned"] = "banned";
    EUserBanStatus["NotBanned"] = "not banned";
})(EUserBanStatus || (exports.EUserBanStatus = EUserBanStatus = {}));
var EUserRoles;
(function (EUserRoles) {
    EUserRoles["Buyer"] = "Buyer";
    EUserRoles["User"] = "User";
    EUserRoles["Manager"] = "Manager";
    EUserRoles["Admin"] = "Admin";
})(EUserRoles || (exports.EUserRoles = EUserRoles = {}));
