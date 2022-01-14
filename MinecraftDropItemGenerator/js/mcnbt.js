function toMCNBT(target) {
    return target.replace(/"/g, "")
}

function mcNBTHL(type, text) {
    if (type == "string") {
        return `<span style='color: rgb(84, 251, 84); text-shadow: 3px 3px rgb(21, 61, 21);'>${text}</span>`
    }
    else if (type == "number") {
        return `<span style='color: rgb(251, 168, 0); text-shadow: 3px 3px rgb(62, 41, 0);'>${text}</span>`
    }
    else if (type == "unit") {
        return `<span style='color: rgb(251, 84, 84); text-shadow: 3px 3px rgb(62, 21, 21);'>${text}</span>`
    }
    else if (type == "key") {
        return `<span style='color: rgb(84, 251, 251); text-shadow: 3px 3px rgb(21, 62, 62);'>${text}</span>`
    }
    else if (type == "nau") {
        return `<span style='color: rgb(251, 168, 0); text-shadow: 3px 3px rgb(62, 41, 0);'>${text[0]}</span><span style='color: rgb(251, 84, 84); text-shadow: 3px 3px rgb(62, 21, 21);'>${text[1]}</span>`
    }
}




// Minecraft NBT对象
class MCNBTObject {
    constructor() {
        this.nbtObject = {}
    }

    add(keyAndValue, keyColor=true) {
        for (let key in keyAndValue) {
            if (keyColor == true) {
                this.nbtObject[mcNBTHL("key", key)] = keyAndValue[key]
            }
            else {
                this.nbtObject[key] = keyAndValue[key]
            }
        }
        return this.nbtObject
    }

    del(key) {
        delete this.nbtObject[key]
    }

    getRaw() {
        return this.nbtObject
    }

    getString(keymark="", valuemark="") {
        let result = []
        for (let i in this.nbtObject) {
            result.push(`${keymark}${i}${keymark}:${valuemark}${this.nbtObject[i]}${valuemark}`)
        }
        return "{" + result.join(", ") + "}"
    }
}





// Minecraft NBT数组
class MCNBTArray {
    constructor() {
        this.nbtArray = []
    }

    add(eles) {
        for (let ele of eles) {
            this.nbtArray.push(ele)
        }
        return this.nbtArray
    }

    getRaw() {
        return this.nbtArray
    }

    getString() {
        return JSON.stringify(this.nbtArray)
    }
}
