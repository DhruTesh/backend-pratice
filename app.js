const express = require("express")

const app = express()

const PORT = 3000

const ArrayDB = []

function logger(req, res, next){
    console.log(`REQ OBJ: ${req.originalUrl} ${req.path} ${req.method} ${req.baseUrl} `)
    if(req.method == "POST") {
        console.log(`REQ BODY: ${req.body}`)
    }
    next()
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(logger)

app.get("/", (req, res) => {
    res.send("Hello from server!")
})

app.get("/greetings", (req, res) => {
    res.send("Greetings! Server is running.")
})

// READ/GET
app.get("/products", (req, res) => {
    res.send(ArrayDB)
})

// CREATE/POST
app.post("/products", (req, res) => {
    if(Object.keys(req.body).length == 0) {
        res.status(400)
        return res.send("Request body is empty, Product not created.")
    }

    if(!req.body.id) {
        res.status(400)
        return res.send("ID not found, Product not created.")
    }

    let isIdRepeat = ArrayDB.find((value) => value.id == req.body.id)
    if(isIdRepeat != undefined){
        res.status(422)
        return res.send("ID is not unique, Product not created.")
    }

    ArrayDB.push(req.body)
    res.status(201)
    return res.send("Product created.")
})


//PUT
app.put("/products/:product_id", (req, res) => {
    let idFound = ArrayDB.findIndex((value) => value.id == req.params.product_id)
    console.log("idFound ", idFound)

    if(idFound == -1){
        res.status(404)
        return res.send("Product does not exist, Product not updated.")
    }

    ArrayDB[idFound] = req.body

    res.status(200)
    return res.send("Product updated.")
})


// DELETE
app.delete("/products", (req, res) => {
    ArrayDB = []
    return res.send("Products deleted.")
})

app.delete("/products/:product_id", (req, res) => {
    let idFound = ArrayDB.findIndex((value) => value.id == req.params.product_id)
    console.log("idFound ", idFound)

    if(idFound == -1){
        res.status(404)
        return res.send("Product does not exist, Product not updated.")
    }

    ArrayDB.splice(idFound, 1)

    return res.send("Products deleted.")
})


app.listen(PORT, function() {
    console.log("app is listening on port " + PORT)
})