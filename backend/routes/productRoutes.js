const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const {
    getProductos,
    createProduct,
    updateProduct,
    deleteProduct,
    comprarProducto,
} = require("../controllers/productController.js");
const { validarCampos } = require("../middlewares/validar-campos.js");

router.get("/products", getProductos);
router.post("/create", createProduct);
router.put("/update", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.put("/comprar", comprarProducto);

module.exports = router;
