const tableArr = []

// function to append new data to tableArr
function addDataToArr(addedProductCode) {
    var addedPrice = "price " + (tableArr.length + 1);
    tableArr.unshift([addedProductCode, addedPrice]);
}

// function to check is product code exists in tableArr
function checkCurrentTable(addedProductCode) {
    let matchingCodeIndex = -1;
    let tempPrice = "";
    for (let i = 0; i < tableArr.length; i++) {
        if (addedProductCode == tableArr[i][0]) {
            matchingCodeIndex = i;
            tempPrice = tableArr[i][1];
            break;
        }
    }

    if (matchingCodeIndex > -1) {
        // move searched product code to top
        tableArr.splice(matchingCodeIndex, 1);
        tableArr.unshift([addedProductCode, tempPrice]);
    }
    else {
        addDataToArr(addedProductCode);
    }
}


//store table data element
const tableDataElem = document.querySelector('#append_data');

// function to build table
function buildTable() {
    // get product code input
    var currentProductCode = document.getElementById('inp_product_code').value.trim();
    if (currentProductCode != "") {
        checkCurrentTable(currentProductCode);
    }

    // check if table data is empty
    if (tableArr.length <= 0) {
        return;
    }

    // reset table data
    tableDataElem.innerHTML = "";

    // build table according to newest data
    for (let i = 0; i < tableArr.length; i++) {
        tableDataElem.innerHTML += `
                <tr>
                    <td>${tableArr[i][0]}</td>
                    <td>${tableArr[i][1]}</td>
                </tr>
            `;
    }
}
buildTable();