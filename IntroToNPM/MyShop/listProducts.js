var faker = require('faker')

console.log(`${"=".repeat(20)}`)
console.log(`WELCOME TO MY SHOP!`)
console.log(`${"=".repeat(20)}`)

for (let i = 0; i < 10; i++) {
    // print product name and price
    let productName = faker.commerce.productName()
    let productPrice = faker.commerce.price()
    console.log(`${productName} - $${productPrice}`)
}

// let productName = faker.commerce.productName()
// console.log(productName)

// let productPrice = faker.commerce.price(100,1000,2,"$")
// console.log(productPrice)