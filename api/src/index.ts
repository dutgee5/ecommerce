const express = require("express");
import productsRouter from "./routers/products/products";

const app = express();
const port = 5000;

app.get("/",(req,res)=>{
    res.send("Hello World"); 
})


app.use("/products",productsRouter);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})