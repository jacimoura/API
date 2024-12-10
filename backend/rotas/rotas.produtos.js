import express from "express";

import { getProducts, postProducts,deleteProducts, putProducts } from "../controles/controles.produtos.js";

const router =express.Router();

router.get("/", getProducts);

router.post("/", postProducts);

router.delete("/:id", deleteProducts);

router.put("/:id", putProducts)

export default router;