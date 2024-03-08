// 1. Створіть функцію average, яка знаходить середнє значення із довільного числа аргументів,
// використайте spread … оператор.
function average(...numbers){
    let sum = 0;
    for (number of numbers){
        sum += number;
    }
    return sum / numbers.length;
}
// console.log(average(1, 2, 3, 4, 100));

// 2. Створіть функцію values(f, low, high), яка повертає масив значень [f(low), f(low + 1), ...,
//     f(high)].
function values(f, low, high){
    result = []
    for (let i = low; i <= high; i++){
        result.push(f(i));
    }
    return result;
}
// console.log(values((number) => number**2, 10, 20));

// 3. Своріть функцію callWithContext як приймає обєкт та функцію коллбек яка викликається з
// контекстом пережаного обєкта. Викличте цю функцію з обєктом person з полями імя та вік
// та функцією яка виведе в консоль ‘Today is ${date }! Happy birthday ${name}.
function callWithContext(obj, callback){
    callback.call(obj);
}

let myFunc = function(){
    console.log(`Today is ${this.date}! Happy birthday ${this.name}`);
}
// callWithContext({name: "Roma", date: "03.04"}, myFunc);

// 4. Створіть функцію, яка повертає об’єкт з двома методами: increment і getValue. Метод
// increment має збільшувати значення, яке зберігається в замиканні, а метод getValue має
// повертати поточне значення. 
function counter(){
    let count = 0;

    function increment(){
        count++;
    }
    
    function getValue(){
        return count;
    }

    return {increment: increment, getValue: getValue};
}

// let obj = counter();
// obj.increment();
// console.log(obj.getValue());

// let obj2 = counter();
// obj2.increment();
// console.log(obj2.getValue());

// 5. Створіть функцію getGreeting яка приймає імя та повертає текстовий фрагмент типу ‘Hello
// name’. Зробіть щоб функція зберігала значення останнього виклику та якщо аикликана
// знову з таким же аргументом – повертала кешовне значення.
var Greeting = function() {this.cachedName = null; this.cachedResult = null
    this.getGreeting = function(person_name) {
        if (this.cachedName == person_name){
            console.log("Returned cache")
            return this.cachedResult;
        }
        this.cachedName = person_name;
        this.cachedResult = "Hello " + person_name
        return this.cachedResult; 
    }};
var myGreeting = new Greeting();
// console.log(myGreeting.getGreeting("Roma"));
// console.log(myGreeting.getGreeting("Test"));
// console.log(myGreeting.getGreeting("Test"));

// 6. Створіть функцію, яка приймає число як аргумент і повертає функцію, яка приймає інше
// число як аргумент і повертає суму двох чисел. Перевірте функцію, викликавши її з різними
// номерами.
function add(first_number){
    return (second_number) => first_number + second_number;
}

let add5 = add(5);
// console.log(add5(3));
// console.log(add5(13));
// console.log(add5(1));

// 7. Створіть функцію, яка приймає масив текстових фрагментів як аргумент і повертає нову
// функцію, яка приймає текстовий фрагмент як аргумент і повертає логічне значення, яке
// вказує, чи існує текстовий фрагмент у вихідному масиві. 
function storeText(...strings){
    return (string) => strings.includes(string);
}
let isSave = storeText("Hello", "World", "Test");
// console.log(isSave("World"));

// 8. Створіть функцію, яка приймає масив об’єктів як аргумент і повертає новий масив об’єктів,
// де певна властивість написана з великої літери. Використовуйте стрілочну функцію.

function getObj(obj_array){
    let filter = (properties_name) =>  
    properties_name.charAt(0) == properties_name.charAt(0).toUpperCase();

    let new_array = []
    for (obj of obj_array){
        for (item of Object.keys(obj)){
            if (filter(item)){
                new_array.push(obj);
                break;
            }
        }
    }
    return new_array;
}
let persons = [{ Name: "John", Age: 23, city: "Boston"},
{Name: "Roma", age: 19, city: "Kyiv"},
{name: "Test", age: 20, city: "Test"},
{name: "Roma", age: 23, city: "Kyiv"}];
// console.log(getObj(persons));

// 9. Напишіть приклад для демонстрації функцій call, apply, bind.
function doWork(a, b, c){
    console.log(a + b + c + this.id)
}

function startWork1(){
    doWork.call({id: 45}, 1, 2, 3);
}

function startWork2(){
    doWork.apply({id: 45}, [1, 2, 3]);
} 
// startWork1();
// startWork2();

class App{
    constructor() {
        this.counter = 0;
        this.show = this.show.bind(this);
    }
    doWork(a, b){
        this.counter += a + b;
    }
    show(){
        console.log(this.counter);
    }
}
function display(obj){
    obj();
}

let myApp = new App();
// display(myApp.show);

// 11. Створіть функцію яка кешує останній виклик на 10 секунд.
var GreetingTiming = function() {this.cachedName = null; this.cachedResult = null; this.cached_time = null;
    this.getGreeting = function(person_name) {
        if (this.cachedName == person_name){
            let diff = Math.abs(new Date().getTime() - this.cached_time);
            let second_diff = Math.floor(diff/1000);
            if (second_diff < 10){
                console.log("Returned cache");
                return this.cachedResult;
            }
        }
        this.cached_time = new Date().getTime();
        this.cachedName = person_name;
        this.cachedResult = "Hello " + person_name;
        return this.cachedResult; 
    }};
var myGreeting = new GreetingTiming();
// console.log(myGreeting.getGreeting("Roma"));
// console.log(myGreeting.getGreeting("Test"));
// setTimeout(function() {
//     console.log(myGreeting.getGreeting("Test"));
//   }, 5000);
// setTimeout(function() {
//     console.log(myGreeting.getGreeting("Test"));
//   }, 10000);
// setTimeout(function() {
//     console.log(myGreeting.getGreeting("Test"));
//   }, 15000);
