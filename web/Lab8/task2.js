const number = 123456.789;

console.log("English format:")
console.log(new Intl.NumberFormat("en-US").format(number));

console.log("\nArabic format:")
console.log(new Intl.NumberFormat("ar-EG").format(number));

console.log("\nThai format:")
console.log(new Intl.NumberFormat("th-TH-u-nu-thai").format(number));
