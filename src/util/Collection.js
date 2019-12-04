const resolveIterable = obj => {
    const isKeyValArr = arr => arr.map(kv => kv.length === 2).reduce((acc, val) => acc && val);

    if (obj[Symbol.iterator] && (obj[Symbol.iterator].constructor.name === "GeneratorFunction" || /*typeof obj[Symbol.iterator].next === "function")*/ false)) return obj;
    if (obj instanceof Object) {
        obj[Symbol.iterator] = function* () {
            for (const kv of Object.entries(this)) yield kv;
        }
    }
    if (obj instanceof Array && obj[0] && isKeyValArr(obj)) {
        const arr = obj;
        obj = {};
        arr.map(([key, val]) => {
        	obj[key] = val;
        });
        obj[Symbol.iterator] = function* () {
            for (const kv of Object.entries(this)) yield kv;
        }
        return obj;
    } 
    return obj;
};

const defaultSymbol = Symbol("default");
module.exports = class Collection {
    constructor (iterable = defaultSymbol) {
        iterable = resolveIterable(iterable);
        
        this._array = [];
        this._keyArray = [];
        Object.defineProperty(this, "_obj", {
            value: {},
            configurable: false
        });
        
        this._setArrays = () => {
            this._array = [];
            this._keyArray = [];

            for (const k of Object.keys(this._obj)) this._array.push(this[k]) && this._keyArray.push(k);
            this[Symbol.iterator] = function* () {
                for (const k of this._keyArray) yield [k, this[k]];
            }
        };
        
                
        if (typeof iterable[Symbol.iterator] === "function") {
            for (const [key, val] of iterable) this.set(key, val);
        } else if (iterable !== defaultSymbol) throw new TypeError(typeof iterable + " is not iterable");
    }
    set (key, val) {
        if (key === Symbol.iterator) return key;
        this._obj[key] = val;
        this._setArrays();
    }
    get (key) {
        if (key !== Symbol.iterator) return this._obj[key];
        return key;
    }
    delete (key) {
        if (key !== Symbol.iterator) {
            const bool = delete this._obj[key];
            this._setArrays();
            return bool;
        }
        return false;
    }
    clear () {
        for (const key of Object.keys(this._obj)) this.delete(key);
    }
    random () {
        return this._array[Math.floor(Math.random() * this._array.length)];
    }
    randomKey () {
        return this._keyArray[Math.floor(Math.random() * this._keyArray.length)];
    }
    map (callback) {
        return this._array.map(callback);
    }
    mapKeys (callback) {
        return this._keyArray.map(callback);
    }
    forEach (callback) {
        this._array.forEach(callback);
    }
    forEachKey (callback) {
        this._keyArray.forEach(callback);
    }
    reduce (callback) {
        return this._array.reduce(callback);
    }
    reduceKeys (callback) {
        return this._keyArray.reduce(callback);
    }
    find (callback) {
        return this._array.find(callback);
    }
    findKeys (callback) {
        return this._keyArray.find(callback);
    }
    get size () {
        return this._array.length;
    }
    array () {
        this._setArrays();
        return this._array;
    }
    keyArray () {
        this._setArrays();
        return this._keyArray;
    }
}
