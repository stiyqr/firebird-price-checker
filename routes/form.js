const express = require('express');

const dbpool = require('../data/database');

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
    const queryStr = 'SELECT ITEMNO, ITEMDESCRIPTION, UNITPRICE FROM ITEM WHERE ITEMNO = \'' + inputData + '\'';

    await dbpool.get(function(err, db){
        if (err) throw err;

        db.query(queryStr, function(err, result) {
            if (result.length == 0) {
                productNotFound = inputData;
            }
            else {
                for (const product of result) {
                    addDataToTable(product.ITEMNO, product.ITEMDESCRIPTION, product.UNITPRICE);
                }
            }
            db.detach();
            res.redirect('/query-page');
        });
    });
});

router.post('/query-page/clear', function (req, res) {
    productsArr.splice(0, productsArr.length);
    res.redirect('/query-page');
})

module.exports = router;
