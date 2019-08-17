"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    return User;
}());
exports.User = User;
exports.users = {
    "juliana@example.com":  = new User('juliana@example.com', 'Juliana', 'juliana123'),
    "amanda@example.com":  = new User('amanda@example.com', 'Amanda', 'amanda123')
};
