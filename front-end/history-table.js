const table = [];

for (let i = 0; i < 10; i++) {
    const tableEntry = { code: "product code" + (i + 1), price: "price" + (i + 1) };
    table[table.length] = tableEntry;

}

function addMoreRows() {
    var currentProductCode = document.getElementById('product_code').value;
    var table = document.getElementById('price_table');



    var row = table.insertRow(1);

    var productCodeCol = row.insertCell(0);
    var priceCol = row.insertCell(1);

    productCodeCol.innerHTML = currentProductCode;
    priceCol.innerHTML = "price";
    //total.innerHTML = (price_col.innerHTML + points.innerHTML).toString();
}
