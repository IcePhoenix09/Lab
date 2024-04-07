import crypto from "simple-crypto-js"

const secretKey = "test12233test"

const simpleCrypto = new crypto.SimpleCrypto(secretKey)

const plainText = "Vlasuk Roman"
const cipherText = simpleCrypto.encrypt(plainText)

console.log("Plain Text    : " + plainText)
console.log("Cipher Text   : " + cipherText)

const decipherText = simpleCrypto.decrypt(cipherText)
console.log("Decipher Text : " + decipherText);
