
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
        this.childs = [];
        this.add_child = function (key, value) {
            var kv = new nbtKeyValue(key, value);
            this.childs.push(kv);
        };
        this.isempty = function () {
            return (this.childs.length == 0 ? true : false);
        };
        this.text = function (ispretty) {
            var tl = [];
            for (var i = 0; i < this.childs.length; i++) {
                tl.push(this.childs[i].text(ispretty));
            }
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

class nbtKeyValue {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.text = function (ispretty) {
            if (ispretty) {
                return `${highlight_code(this.key, "key")}: ${this.value.text(true)}`
            } else {
                return `${this.key}: ${this.value.text()}`
            };
        };
    };
};

class nbtNumber {
    constructor(value, unit) {
        if ((unit == "d") || (unit == "f")){
            this.value = change_to_float(value);
        }else{
            this.value = value;
        };
        this.unit = unit;
        this.text = function (ispretty) {
            if (ispretty) {
                return `${highlight_code(this.value, "num")}${highlight_code(this.unit, "unit")}`
            } else {
                return `${this.value}${this.unit}`
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