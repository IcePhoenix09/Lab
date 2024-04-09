const date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738));

console.log("English format:");
console.log(new Intl.DateTimeFormat('en-US').format(date));

console.log("\nFrench format:");
console.log(new Intl.DateTimeFormat('fr-FR').format(date));

console.log("\nChinese format:");
console.log(new Intl.DateTimeFormat('zh-Hans-CN').format(date));

console.log("\nThai format:");
console.log(new Intl.DateTimeFormat('th-TH-u-nu-thai').format(date));

console.log("\nEgypt format:");
console.log(new Intl.DateTimeFormat('ar-EG').format(date));
