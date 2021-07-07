gettype = Object.prototype.toString;

function change_to_float(val) {
    if ((val / 1).toString().includes(".")) {
        return (val / 1);
    } else {
        return (val / 1).toFixed(1);
    };
};

function highlight_code(text, type) {
    if (type == "key") {
        return `<span style="color:aqua">${text}</span>`
    } else if (type == "str") {
        return `<span style="color:rgb(84,351,84)">${text}</span>`
    } else if (type == "num") {
        return `<span style="color:orange">${text}</span>`
    } else if (type == "bool") {
        return `<span style="color:yellow">${text}</span>`
    } else if (type == "unit") {
        return `<span style="color:red">${text}</span>`
    };

}

class nbtObject {
    constructor(childsal) {
        this.childs = {};
        this.add_child = function (key, value) {
            this.childs[key] = value;
        };
        this.isempty = function () {
            return (Object.keys(this.childs).length == 0 ? true : false);
        };
        this.get = function () {
            var args = Array.prototype.slice.call(arguments);
            if (gettype.call(args[0]) == "[object Array]") {
                args = args[0];
            };
            if (args.length == 1) {
                return this.childs[args[0]];
            } else if (args.length > 1) {
                return this.childs[args[0]].get(args.slice(1));
            } else {
                return this;
            };
        };
        this.set = function (index, value) {
            if (["[object String]", "[object Number]"].includes(gettype.call(index))) {
                this.childs[index] = value;
            } else if (gettype.call(index) == "[object Array]") {
                if (index.length == 1) {
                    this.childs[index[0]] = value;
                } else if (index.length > 1) {
                    this.get(index.slice(0, -1)).set(index.slice(-1), value);
                };
            };
        };
        this.text = function (ispretty) {
            var tl = [];
            for (var i in this.childs) {
                tl.push(`${ispretty ? highlight_code(i, "key") : i}: ${this.childs[i].text(ispretty)}`);
            };
            return `{${tl.join(", ")}}`;
        };
        if (childsal) {
            for (var index in childsal) {
                this.add_child(index, childsal[index])
            };
        };
    };
};

class nbtList {
    constructor(childsal) {
        this.childs = [];
        this.add_child = function (value) {
            this.childs.push(value)
        };
        this.isempty = function () {
            return (this.childs.length == 0 ? true : false);
        };
        this.get = function () {
            var args = Array.prototype.slice.call(arguments);
            if (gettype.call(args[0]) == "[object Array]") {
                args = args[0];
            };
            if (args.length == 1) {
                return this.childs[args[0]];
            } else if (args.length > 1) {
                return this.childs[args[0]].get(args.slice(1));
            } else {
                return this;
            };
        };
        this.set = function (index, value) {
            if (["[object String]", "[object Number]"].includes(gettype.call(index))) {
                this.childs[index] = value;
            } else if (gettype.call(index) == "[object Array]") {
                if (index.length == 1) {
                    this.childs[index[0]] = value;
                } else if (index.length > 1) {
                    this.get(index.slice(0, -1)).set(index.slice(-1), value);
                };
            };
        };
        this.text = function (ispretty) {
            var tl = [];
            for (var i = 0; i < this.childs.length; i++) {
                tl.push(this.childs[i].text(ispretty));
            }
            return `[${tl.join(", ")}]`;
        };
        if (childsal) {
            for (var i = 0; i < childsal.length; i++) {
                this.add_child(childsal[i]);
            }
        };
    };
};

class nbtNumber {
    constructor(value, unit) {
        if (["d", "f"].includes(unit)) {
            this.value = change_to_float(value);
        } else if (["i", "s", "b", ""].includes(unit)) {
            this.value = Math.round(value);
        } else {
            this.value = value;
        };
        this.unit = unit;
        this.text = function (ispretty) {
            if (ispretty) {
                return `${highlight_code(this.value, "num")}${unit ? highlight_code(this.unit, "unit") : ""}`
            } else {
                return `${this.value}${unit ? this.unit : ""}`
            };
        };
    };
};

class nbtString {
    constructor(value) {
        this.value = value;
        this.text = function (ispretty) {
            if (ispretty) {
                return highlight_code(`'${this.value}'`, "str")
            } else {
                return `'${this.value}'`
            };
        };
    };
};

class nbtBool {
    constructor(value) {
        this.value = value ? "true" : "false";
        this.text = function (ispretty) {
            if (ispretty) {
                return highlight_code(`${this.value}`, "bool")
            } else {
                return `${this.value}`
            };
        };
    };
};

function decode_nbt_str(str) {
    js_obj = eval("obj=" + str.replace(/([0123456789\.]+)([bfdis])?/g, 'new nbtNumber($1,"$2")'));
    return change_obj(js_obj);
}

function change_obj(js_obj) {
    if (gettype.call(js_obj) == "[object String]") {
        return new nbtString(js_obj);
    } else if (gettype.call(js_obj) == "[object Boolean]") {
        return new nbtBool(js_obj);
    } else if (gettype.call(js_obj) == "[object Object]") {
        if (js_obj instanceof nbtNumber) {
            return js_obj;
        } else {
            var a = new nbtObject();
            for (var i in js_obj) {
                a.add_child(i, change_obj(js_obj[i]))
            }
            return a;
        }
    } else if (gettype.call(js_obj) == "[object Array]") {
        var a = new nbtList();
        for (var i in js_obj) {
            a.add_child(change_obj(js_obj[i]));
        }
        return a;
    }
}
