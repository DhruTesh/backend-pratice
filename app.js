const express = require("express")
const productRouter = require("./controller/products")

const PORT = 3000

const app = express()


// a middleware
function logger(req, res, next){
    console.log(`REQ OBJ: ${req.originalUrl} ${req.path} ${req.method} ${req.baseUrl} `)
    if(req.method == "POST") {
        console.log(`REQ BODY: ${req.body}`)
    }
    next()
}

// using a middleware for all APIs
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(logger)

app.get("/", (req, res) => {
    res.send("Hello from server!")
})

app.get("/greetings", (req, res) => {
    res.send("Greetings! Server is running.")
})

// attach other routers
app.use("/products", productRouter)

app.listen(PORT, function() {
    console.log("app is listening on port " + PORT)
})