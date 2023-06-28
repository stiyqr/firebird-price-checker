// Importing module
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "secretpass0",
    database: "dummydb"
})

// Connecting to database
connection.connect(function (err) {
    if (err) {
        console.log("Error in the connection")
        console.log(err)
    }
    else {
        console.log(`Database Connected`)
        // Edit the line below for query commands
        connection.query(`SELECT ProductPrice FROM product_prices WHERE ProductCode = 'ProductCode1'`,
            function (err, result) {
                if (err)
                    console.log(`Error executing the query - ${err}`)
                else {
                    console.log("Result: ", result)
                    console.log(result[0].ProductPrice)
                }
            })
    }
})