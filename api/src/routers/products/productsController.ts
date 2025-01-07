import { Request, Response } from "express";
import { db } from "../../db/index";
import { createProductSchema, productsTable } from "../../db/productsSchema";
import { eq } from "drizzle-orm";

export async function getProducts(req: Request, res: Response) {
  try {
    // select * from products;
    const products = await db.select().from(productsTable);
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(req.params.id)));
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    // try to insert into products values (req.body) returning *;
    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning(); // insert into products values (req.body) returning *;
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function deletedProduct(req: Request, res: Response) {
  try {
    const [deleteProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, Number(req.params.id)))
      .returning();
    if (deleteProduct) {
      res.send(204).json(deleteProduct);
    }
    res.status(404).json({ message: "Product was not found" });
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const [productUpdate] = await db
      .update(productsTable)
      .set(req.body)
      .where(eq(productsTable.id, Number(req.params.id)))
      .returning();
    if (productUpdate) {
      res.json(productUpdate);
    }
    res.status(404).json({ message: "Product was not found" });
  } catch (err) {
    res.status(500).json(err);
  }
}
