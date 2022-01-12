// Minecraft NBT对象
class MCNBTObject {
    constructor() {
        this.nbtObject = {}
    }

    add(key, value) {
        this.nbtObject[key] = value
    }

    get() {
        return JSON.stringify(this.nbtObject)
    }
}




// Minecraft NBT数组
class MCNBTArray {
    constructor() {}
}




var textJSON = new MCNBTObject()
console.log(textJSON.get())
textJSON.add("text", "This is text")
console.log(textJSON.get())
