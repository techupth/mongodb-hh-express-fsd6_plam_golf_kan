import { Router } from "express";
import { db } from "../utils/db";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const products = await collection.limit(5).toArray();
    return res.json({ data: products });
  } catch (error) {
    return res.json({
      message: "Error",
    });
  }
});

productRouter.get("/:id", (req, res) => {});

productRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productData = { ...req.body };
    const products = await collection.insertOne(productData);
    return res.json({
      message: "Product has been created successfully”",
    });
  } catch {
    return res.json({
      message: "Error",
    });
  }
});

productRouter.put("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productId = ObjectId(req.params.id);
    const newProductData = { ...req.body };
    await collection.updateOne(
      {
        _id: productId,
      },
      {
        $set: newProductData,
      }
    );
    return res.json({
      message: "Product has been updated successfully",
    });
  } catch {
    return res.json({
      message: "Error",
    });
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productId = ObjectId(req.params.productId);
    await collection.deleteOne({
      _id: productId,
    });
    return res.json({
      message: "Product has been deleted successfully",
    });
  } catch {
    return res.json({
      message: "Error",
    });
  }
});

export default productRouter;
