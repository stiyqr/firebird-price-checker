const productsArr = [];
const availableProductCodes = [];

// function to check is product code exists in productsArr
function checkCurrentTable(productCode, productName, productPrice) {
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
        productsArr.unshift([productCode, productName, productPrice]);
    }
    else {
        productsArr.unshift([productCode, productName, productPrice]);
    }
}

function addDataToTable(productCode, productName, productPrice) {
    if (productPrice == null) {
        productPrice = '(no data)';
    }
    else {
        productPrice = formatPrice(productPrice);
    }

    checkCurrentTable(productCode, productName, productPrice);

    // set max table length
    const maxTableLength = 10;
    while (productsArr.length > maxTableLength) {
        productsArr.pop();
    }
}

function formatPrice(price) {
    var result = "Rp" + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",-";
    return result;
}

module.exports = {
    productsArr,
    addDataToTable
};