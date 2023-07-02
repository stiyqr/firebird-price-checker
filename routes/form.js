const express = require('express');

const db = require('../data/database');

const router = express.Router();

const productsArr = []


router.get('/', function (req, res) {
    res.redirect('/query-page');
});

router.get('/query-page', function (req, res) {
    res.render('query-page', { products: productsArr });
});

router.get('/new-post', async function (req, res) {
    const [authors] = await db.query('SELECT * FROM authors');
    res.render('create-post', { authors: authors });
});

router.post('/query-page', async function (req, res) {
    const data = [req.body.inp_product_code.trim()];
    const [products] = await db.query('SELECT * FROM product_prices WHERE ProductCode = ?', [data[0]]);
    for (const product of products) {
        addToTable(product.ProductCode, product.ProductPrice);
    }
    res.redirect('/query-page');
});

module.exports = router;


// function to check is product code exists in productsArr
function checkCurrentTable(product_code, product_price) {
    let matching_code_index = -1;
    let temp_price = "";
    for (let i = 0; i < productsArr.length; i++) {
        if (product_code == productsArr[i][0]) {
            matching_code_index = i;
            temp_price = productsArr[i][1];
            break;
        }
    }

    if (matching_code_index > -1) {
        // move searched product code to top
        productsArr.splice(matching_code_index, 1);
        productsArr.unshift([product_code, temp_price]);
    }
    else {
        productsArr.unshift([product_code, product_price]);
    }
}

function addToTable(product_code, product_price) {
    checkCurrentTable(product_code, product_price);

    // set max table length
    const maxTableLength = 10;
    while (productsArr.length > maxTableLength) {
        productsArr.pop();
    }
}