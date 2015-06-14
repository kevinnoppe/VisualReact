// Partly based on the implementation of HashTables in JavaScript by
// Dan Allen (http://www.mojavelinux.com/articles/javascript_hashes.html)

var Dictionary = function () {
    this.length = 0;
    this.dict = {};
};

Dictionary.prototype.isEmpty = function () {
    return (this.length === 0);
};

Dictionary.prototype.add = function (key, value) {
    var previous = undefined;
    if (this.hasItem(key)) {
        previous = this.dict[key];
    }
    else {
        this.length++;
    }
    this.dict[key] = value;
    return previous;
};

Dictionary.prototype.remove = function (key) {
    if (this.hasItem(key)) {
        var previous = this.dict[key];
        delete this.dict[key];
        this.length--;
        return previous;
    }
    return undefined;
};

Dictionary.prototype.get = function (key) {
    return this.hasItem(key) ? this.dict[key] : undefined;
};

Dictionary.prototype.hasItem = function (key) {
    return this.dict.hasOwnProperty(key);
}

Dictionary.prototype.keys = function () {
    var keys = [];
    for (var key in this.dict) {
        if (this.hasItem(key)) {
            keys.push(key);
        }
    }
    return keys;
};

Dictionary.prototype.values = function () {
    var values = [];
    for (var key in this.dict) {
        if (this.hasItem(key)) {
            values.push(this.dict[key]);
        }
    }
    return values;
};

Dictionary.prototype.forEach = function (func) {
    for (key in this.dict) {
        func(key, this.dict[key]);
    }
};

Dictionary.prototype.clear = function () {
    this.dict = {};
    this.length = 0;
};

Dictionary.prototype.each = function (fn) {
    for (var k in this.dict) {
        if (this.hasItem(k)) {
            fn(k, this.dict[k]);
        }
    }
}