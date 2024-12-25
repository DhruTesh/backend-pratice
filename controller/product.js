const Router = require("express")
const ProductsDatabase = require("../model/products")

const productRouter = Router()

const productDB = new ProductsDatabase()

// READ/GET
productRouter.get("/", (req, res) => {
    res.send(productDB.getAll())
})

// CREATE/POST
productRouter.post("/", (req, res) => {
    if (Object.keys(req.body).length == 0) {
        res.status(400)
        return res.send("Request body is empty, Product not created.")
    }

    if (!req.body.id) {
        res.status(400)
        return res.send("ID not found, Product not created.")
    }

    productDB.create(req.body)
    res.status(201)
    return res.send("Product created.")
})


// UPDATE/PUT
productRouter.put("/:product_id", (req, res) => {

    productDB.updateById(req.params.product_id, req.body)

    res.status(200)
    return res.send("Product updated.")
})


// DELETE
productRouter.delete("/", (req, res) => {
    productDB.deleteAll()
    return res.send("Products deleted.")
})

productRouter.delete("/:product_id", (req, res) => {
    productDB.deleteById(req.params.product_id)

    return res.send("Products deleted.")
})

module.exports = productRouter