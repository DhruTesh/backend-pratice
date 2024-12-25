const fs = require("fs")
const path = require("path")

class ProductsDatabase {
    FILEPATH = path.join(__dirname, "..", "database", "products.json")

    readFile() {
        const data = fs.readFileSync(this.FILEPATH, { encoding: "utf8" })
        return JSON.parse(data)
    }

    writeFile(data) {
        return fs.writeFileSync(this.FILEPATH, JSON.stringify(data), { encoding: "utf8" } )
    }

    isIdRepeating(id) {
        const arrData = this.readFile()
        console.log("arrData", arrData, typeof arrData)

        let isIdRepeat = arrData.find((value) => value.id == id)

        return isIdRepeat != undefined
    }

    getIndexById(id) {
        let idFound = this.readFile().findIndex((value) => value.id == id)

        if(idFound == -1) {
            throw Error("id not found")
        }

        return idFound
    }

    create(obj) {
        if(this.isIdRepeating(obj.id)) {
            throw Error("Id is not unique")
        }

        const oldArrData = this.readFile()
        oldArrData.push(obj)

        return this.writeFile(oldArrData)
    }

    getAll() {
        return this.readFile()
    }

    getById(id) {
        const arrData = this.readFile();
        const product = arrData.find((value) => value.id == id);

    }

    updateById(id, obj) {
        const currentIndex = this.getIndexById(id)

        const arrData = this.readFile()
        arrData[currentIndex] = obj

        this.writeFile(arrData)
    }

    deleteAll() {
        this.writeFile([])

    }

    deleteById(id) {
        const currentIndex = this.getIndexById(id)

        const arrData = this.readFile()
        arrData.splice(currentIndex, 1)

        this.writeFile(arrData)

    }
}

module.exports = ProductsDatabase