const express = require('express');

const db = require('../data/database');

const { productsArr, addDataToTable } = require('./functions')

const router = express.Router();

var productNotFound = null;


router.get('/', function (req, res) {
    res.redirect('/query-page');
});

router.get('/query-page', async function (req, res) {
    res.render('query-page', { products: productsArr, productNotFound: productNotFound });
    productNotFound = null;
});

router.post('/query-page', async function (req, res) {
    const inputData = [req.body.inp_product_code.trim()];
    const [products] = await db.query('SELECT * FROM lestari WHERE item_no = ?', [inputData[0]]);
    if (products.length == 0) {
        productNotFound = inputData;
    }
    else {
        for (const product of products) {
            addDataToTable(product.item_no, product.unit_price);
        }
    }
    res.redirect('/query-page');
});

module.exports = router;
