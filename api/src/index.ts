import express, { urlencoded } from "express";
import { json } from "express"; // import json from express
import productsRouter from "./routers/products/products";
const app = express();
const port = 5000;

app.use(urlencoded({extended:false})) // POST ile gelen verileri bir nesneye dönüştürür ve ona request.body üzerinden ulaşmamızı sağlar. false değeri ile sadece string ve array değerlerini alırız. (Bu yüzden urlencoded middleware'ini kullanmamız gerekiyor.)
app.use(json()); // use json middleware and request body parser (Bu yüzden json middleware'ini kullanmamız gerekiyor.)


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/products",productsRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
