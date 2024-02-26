// 1. Виведіть число згенероване випадковим чином.
function generate(min, max) { 
    console.log(Math.random() * (max - min) + min);
}

// 2. Створити змінні базових типів, виведіть їх на екран.
function basic_types(){
    function print_type(variable){
        console.log(variable.toString() + " is type of - " + typeof variable);
    }

    const number = 10;
    print_type(number);

    const number2 = 10.5;
    print_type(number2);

    const test = "10";
    print_type(test);

    const isTrue = true;
    print_type(isTrue);

    const big_number = 100000000000000000n;
    print_type(big_number);

    const symbol = Symbol("10");
    print_type(symbol);

    const obj = Object("10");
    print_type(obj);
}

// 3. Збережіть суму двох чисел і збережіть її у третю змінну, виведіть її на екран.
function sum(){
    let a = 1;
    let b = 2;
    let c = a + b;
    console.log(c);
}

// 4. Створіть файл script.js. Підключіть його в нижню частину файлу index.html. створіть три
// діалогових вікна з alert(), prompt(), confirm().
// 5. Запитайте у користувача його вік. Виведіть фразу “Ваш вік ____”
function test_alert(){
    prompt("Ваш вік ____");
    alert("HelloWorld");
    prompt("test");
    confirm("test2");
}

// 6. Ввести кількість купленого товару, ціну за одиницю. Виведіть суму покупки.
function price_count(){
    let amount = prompt("Кількість купленого товару");
    let price = prompt("Ціна за одиницю");
    console.log(amount * price);
}

// 7. Введіть число – визначте чи воно від’ємне.
function isNegative(){
    let a = prompt();
    if (a < 0){
        console.log("Negative");
    } else {
        console.log("Positive");
    }
}

// 8. Введіть номер дня тижня, виведіть його назву.
function week(){
    let number = Number(prompt());
    let name ="None";
    switch(number){
        case 1:
            name = "Понеділок";
            break;
        case 2:
            name = "Вівторок";
            break;
        case 3:
            name = "Середа";
            break;
        case 4:
            name = "Четверг";
            break;
        case 5:
            name = "П'ятниця";
            break;
        case 6:
            name = "Субота";
            break;
        case 7:
            name = "Неділя";
            break;
    }
    console.log(name);
    document.getElementById("field").innerHTML = name;
}

// 9. Виведіть таблицю множення числа 6.
function table(a){
    let table = document.getElementById("Table"); 

    for (let i = 1; i < 10; i++){
        let newRow = table.insertRow(table.rows.length);
        newRow.insertCell(0).innerHTML = i; 
        newRow.insertCell(1).innerHTML = i * a; 
    }
}

// 10. Задайте одномірний масив n=5. Виведіть квадрат третього числа, суму першого і останнього
// елемента суму квадратів від’ємних елементів.
function test_array(){ 
    let numbers = [3, -4, 5, -6, 7];

    let power = numbers[2]**3;
    let sum = numbers[0] + numbers[4];

    let sum_neg = 0
    numbers.forEach(myFunction);
    function myFunction(value) {
        if (value < 0){
            sum_neg += value;
        }
    }

    document.getElementById("field").innerHTML = "Квадрат третього числа: " + power + 
    ". Cума першого і останнього: " + sum +
    ". Cума квадратів від’ємних елементів: " + sum_neg;
}

// 11. Створіть об’єкт машина. Поля: ім’я власника, назва моделі, об’єм двигуна. Створіть масив з
// кількома об’єктами, виведіть машину з мінімальним об’ємом двигуна.

function car_object(){
    const car_test = {owner_name:"Roma", model:"Fiat500", engine:20};
    car_list = [{owner_name:"Ben", model:"Fiat5033", engine:10}, {owner_name:"Roma", model:"Fiat500", engine:20}, {owner_name:"Jack", model:"l3", engine:30}];

    car_min = car_list[0];
    for (let car of car_list){
        if (car.engine < car_min.engine){
            car_min = car;
        }
    }

    document.getElementById("field").innerHTML = "Машина з мінімальним ою'ємом двигуна - " + car_min.model
    + "<br>Власник - " + car_min.owner_name
    + "<br>Об'єм двигуна - " + car_min.engine;
}


// 12. Введіть 4 числа, Знайти max{min(a, b), min(c, d)
function min_max(){
    function min(a, b){
        if (a <= b){
            return a;
        } else {
            return b;
        } 
    }

    function max(a, b){
        if (a >= b){
            return a;
        } else {
            return b;
        } 
    }

    a = prompt("Введіть 1 число");
    b = prompt("Введіть 2 число");
    c = prompt("Введіть 3 число");
    d = prompt("Введіть 4 число");
    
    result = max(min(a, b), min(c, d));
    console.log(result);
    document.getElementById("field").innerHTML = result;
}

// 13. Задайте слово, виведіть його довжину та запишіть його в зворотному порядку.
function reverse(){
    word = prompt("Введіть слово");
    console.log(word.length);

    let letter_array = word.split("");
    let reverse_array = letter_array.reverse();
    reverse_word = reverse_array.join("")

    console.log(reverse_word);
    document.getElementById("field").innerHTML = reverse_word;

}

// generate(5, 15);
// basic_types();
// sum();
// test_alert();
// price_count();
// isNegative();
// week();
// table(6);
// test_array();
// car_object();
// min_max();
reverse();
