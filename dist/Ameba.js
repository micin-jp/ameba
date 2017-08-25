"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx = require("rxjs");
var Ameba = (function () {
    function Ameba(obj) {
        this._valueChanges = new Rx.Subject();
        var self = this;
        var entitier = {
            get: function (target, name) {
                return name in target ? target[name] : undefined;
            },
            set: function (target, prop, value) {
                target[prop] = value;
                self._emit(value);
                return true;
            }
        };
        obj = obj || {};
        this._entity = new Proxy(obj, entitier);
    }
    Object.defineProperty(Ameba.prototype, "props", {
        get: function () {
            return this._entity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ameba.prototype, "keys", {
        get: function () {
            return Object.getOwnPropertyNames(this._entity);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ameba.prototype, "valueChanges", {
        get: function () {
            return this._valueChanges;
        },
        enumerable: true,
        configurable: true
    });
    Ameba.prototype.copy = function () {
        var entity = {};
        for (var _i = 0, _a = this.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            entity[key] = this._copy(this._entity[key]);
        }
        return new Ameba(entity);
    };
    Ameba.prototype._copy = function (value) {
        if (Array.isArray(value)) {
            value = this._copyArray(value);
        }
        else if (typeof value === 'object') {
            value = this._copyObject(value);
        }
        return value;
    };
    Ameba.prototype._copyObject = function (object) {
        var entity = {};
        for (var key in object) {
            entity[key] = this._copy(object[key]);
        }
        return entity;
    };
    Ameba.prototype._copyArray = function (arr) {
        var entity = [];
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var value = arr_1[_i];
            entity.push(this._copy(value));
        }
        return entity;
    };
    Ameba.prototype._emit = function (val) {
        this._valueChanges.next(val);
    };
    Ameba.create = function (obj) {
        return new Ameba(obj);
    };
    Ameba.createBody = function (obj) {
        return (new Ameba(obj)).props;
    };
    return Ameba;
}());
exports.default = Ameba;
//# sourceMappingURL=Ameba.js.map