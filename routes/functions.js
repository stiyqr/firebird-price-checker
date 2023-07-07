const db = require('../data/database');

const productsArr = [];
const availableProductCodes = [];

// function to check is product code exists in productsArr
function checkCurrentTable(productCode, productPrice) {
    let matchingCodeIndex = -1;
    for (let i = 0; i < productsArr.length; i++) {
        if (productCode == productsArr[i][0]) {
            matchingCodeIndex = i;
            break;
        }
    }

    if (matchingCodeIndex > -1) {
        // move searched product code to top
        productsArr.splice(matchingCodeIndex, 1);
        productsArr.unshift([productCode, productPrice]);
    }
    else {
        productsArr.unshift([productCode, productPrice]);
    }
}

function addDataToTable(productCode, productPrice) {
    if (productPrice == null) {
        productPrice = '(no data)';
    }

    checkCurrentTable(productCode, productPrice);

    // set max table length
    const maxTableLength = 10;
    while (productsArr.length > maxTableLength) {
        productsArr.pop();
    }
}

async function getAvailableProductCodes() {
    const [results] = await db.query('SHOW COLUMNS FROM lestari');

    for (const result of results) {
        availableProductCodes.push(result.Field);
    }
}

getAvailableProductCodes();

module.exports = {
    productsArr,
    addDataToTable
};