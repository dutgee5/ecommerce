import { Request, Response } from "express";


export function getProducts(req:Request, res:Response) {
  res.send("getProducts");
}

export function getProductById(req:Request, res:Response) {
  res.send("getProductById");
}

export function createProduct(req:Request, res:Response) {
  res.send("createProduct");
}

export function deleteProduct(req:Request, res:Response) {
  res.send("deleteProduct");
}

export function updateProduct(req:Request, res:Response) {
  res.send("updateProduct");
}