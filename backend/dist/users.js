"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (verifyUser) {
        return verifyUser !== undefined && verifyUser.email === this.email && verifyUser.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    "juliana@example.com": new User('juliana@example.com', 'Juliana', 'juliana123'),
    "amanda@example.com": new User('amanda@example.com', 'Amanda', 'amanda123')
};
