/**
 * Chapter 6. Advanced types
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function deleteUser(user) {
    delete user.id;
}
var existingUser = {
    id: 12345,
    name: 'Ima User'
};
deleteUser(existingUser);
console.log(existingUser.id); // NOTE: undefined but inferred as 'number' by TypeScript
var legacyUser = {
    id: '79331',
    name: 'Xin Yang'
};
// deleteUser(legacyUser) // Not compilable
/**
 * BUT: function is contravariant
 * function A is subtype of function B -> parameters and this are contravariant, returned type is covariant
 */
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Bird = /** @class */ (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bird.prototype.chirp = function () { };
    return Bird;
}(Animal));
var Crow = /** @class */ (function (_super) {
    __extends(Crow, _super);
    function Crow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Crow.prototype.caw = function () { };
    return Crow;
}(Bird));
// 'b' is contravariant, retured type of block is covariant
function clone(block) {
    var parent = new Bird;
    var babyBird = block(parent);
    babyBird.chirp();
}
function animalToBird(animal) {
    return new Bird; // tmp
}
function crowToBird(crow) {
    return new Bird; // tmp
}
function animalToAnimal(animal) {
    return new Animal; // tmp
}
function animalToCrow(animal) {
    return new Crow; // tmp
}
clone(animalToBird);
// clone(crowToBird) // Not compilable because argument is subtype
// clone(animalToAnimal) // Not compilable because returned type is supertype
clone(animalToCrow);
