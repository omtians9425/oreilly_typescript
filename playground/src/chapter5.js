/**
 * Class and Interface
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
var Game = /** @class */ (function () {
    function Game() {
        this.pieces = Game.makePieces();
    }
    Game.makePieces = function () {
        return [
            new King('White', 'E', 1),
            new King('Black', 'E', 8),
        ];
    };
    return Game;
}());
var Piece = /** @class */ (function () {
    function Piece(color, file, rank) {
        this.color = color;
        this.position = new Position(file, rank);
    }
    Piece.prototype.moveTo = function (position) {
        this.position = position;
    };
    return Piece;
}());
var Position = /** @class */ (function () {
    function Position(file, rank) {
        this.file = file;
        this.rank = rank;
    }
    Position.prototype.distanceFrom = function (position) {
        return {
            rank: Math.abs(position.rank - this.rank),
            file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
        };
    };
    return Position;
}());
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    King.prototype.canMoveTo = function (position) {
        var distance = this.position.distanceFrom(position);
        return distance.rank < 2 && distance.file < 2;
    };
    return King;
}(Piece));
var Set1 = /** @class */ (function () {
    function Set1() {
    }
    Set1.prototype.has = function (value) {
        return true; // tmp
    };
    Set1.prototype.add = function (value) {
        return this; // tmp
    };
    return Set1;
}());
var MutableSet1 = /** @class */ (function (_super) {
    __extends(MutableSet1, _super);
    function MutableSet1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MutableSet1;
}(Set1));
var set1 = new MutableSet1();
var set2 = set1.add(1); // type is `MutableSet1`
var c1 = {
    good: function (x) {
        return '';
    },
    bad: function (x) {
        return '';
    }
};
var c2 = {
    good: function (x) {
        return '';
    },
    bad: function (x) {
        return '';
    }
};
var user1 = {
    name: 'name',
    age: 1
};
// Typescript is nominal typing for class which has private or protected fields.
var AA = /** @class */ (function () {
    function AA() {
        this.x = 1;
    }
    return AA;
}());
var BB = /** @class */ (function (_super) {
    __extends(BB, _super);
    function BB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BB;
}(AA));
function takeAA(aa) { }
takeAA(new AA);
takeAA(new BB);
// takeAA({x: 1}) // Not compilable
var G = /** @class */ (function () {
    function G(hoge, huga) {
        this.hoge = hoge;
    }
    G.prototype.f = function () {
        console.log(this.hoge);
        // console.log(this.fuga) // not compilable: only private and protected assigns value as property.
    };
    return G;
}());
var g = new G(1, 'huga');
g.f();
// Generics
var MyMap = /** @class */ (function () {
    function MyMap(initialKey, initialValue) {
        // ...
    }
    MyMap.prototype.get = function (key) {
        // ...
    };
    MyMap.prototype.set = function (value) {
        // ...
    };
    MyMap.prototype.merge = function (map) {
        return this;
    };
    MyMap.of = function (k, v) {
        return new MyMap(k, v);
    };
    return MyMap;
}());
var myMap1 = new MyMap('k', 1);
var myMap2 = new MyMap('k', true);
