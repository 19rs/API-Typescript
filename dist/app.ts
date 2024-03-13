import * as dotenv from "dotenv"
import express from "express"
import * as bodyParser from "body-parser"
import { orderRouter } from "../routes/orderRouter"
import { productRouter } from "../routes/productRouter"
import { customerRouter } from "../routes/customerRouter"

const app = express()
dotenv.config()

//ele também pega o corpo em json e transforma em mysql se precisar
app.use(bodyParser.json())

//endpoint principal
app.use("/orders", orderRouter)

app.use("/products", productRouter)

app.use("/customers", customerRouter)

app.listen(process.env.PORT, () => {
    console.log("Node server started running")
})