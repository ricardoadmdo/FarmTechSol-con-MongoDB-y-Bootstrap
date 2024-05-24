const express = require('express');
const router = express.Router();
const { getProductos, createProduct, updateProduct, deleteProduct, comprarProducto } = require('../controllers/productController.js');

router.get('/products', getProductos);
router.post('/create', createProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);
router.put('/comprar', comprarProducto);

module.exports = router;
