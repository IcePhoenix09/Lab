//1. Створіть масив persons та додайте в нього 5 обєктів типу { name: ‘John’, age: 23, city:
// ‘Boston’}. Для масиву persons встановіть властивості groupName=’A’, teacher=’Joan Doe’,
// year=’2023’. З допомогою різних версій циклу for виведіть елементи масиву та властивості
// масиву.

function objects(){
    let my_obj = { name: "John", age: 23, city: "Boston"};
    let obj_array = [];
    for (let i = 0; i < 5; i++){
        obj_array.push(my_obj);
    }

    for (let i = 0; i < 5; i++){
        console.log(obj_array[i]);
    }
    console.log("-------------");

    for (i in obj_array){
        console.log(obj_array[i]);
    }
    console.log("-------------");

    for (obj of obj_array){
        console.log(obj);
    }
}

// 2. Створіть обєкт defaults призначений для збереження налаштувань програми який містить
// поля mode=test, debugLevel=error, logFolder=root. Створіть обєкт userSetting який містить
// поля mode=production, debugLevel=trace. Створіть функцію яка прийме як аргументи дані
// два обєкти та обєднає властивості цих двох обєктів в один обєкт надаючи пріоритет
// властивостям з обєкта userSetting. Запропонуєти як мінімум 3 способи для вирішення цієї
// задачі.
function settings1(){
    function join(a, b){
        let new_obj = Object.assign(a, b);
        return new_obj;
    }

    let defaults = {mode: "test", debugLevel: "error", logFolder: "root"};
    let userSetting = {mode: "production", debugLevel: "trace"};

    console.log(join(defaults, userSetting));
}

function settings2(){
    function join(a, b){
        let new_obj = {...a, ...b};
        return new_obj;
    }

    let defaults = {mode: "test", debugLevel: "error", logFolder: "root"};
    let userSetting = {mode: "production", debugLevel: "trace"};

    console.log(join(defaults, userSetting));
}

function settings3(){
    function join(a, b){
        for (var attrname in b) { 
            a[attrname] = b[attrname]; 
        }
        return a
    }

    let defaults = {mode: "test", debugLevel: "error", logFolder: "root"};
    let userSetting = {mode: "production", debugLevel: "trace"};

    console.log(join(defaults, userSetting));
}

// 3. Для обєкта person із завдання 1 додайте можливість отримати рік народження не додаючи
// додаткової властивості до цього обєкта. Зробіть дане поле доступним тільки для читання.
function properties(){
    function get_date(age){
        let year_now = new Date(Date.now()).getFullYear();
        return year_now - age
    }

    let my_obj = { name: "John", age: 23, city: "Boston"};
    const birth_year = get_date(my_obj.age);
    console.log(birth_year);
}
// 4. Якими способами можна обєднати два масиви?
function combine_array1(){
    let a = [1, 2, 3];
    let b = [4, 5, 6];
    let c = a.concat(b);
    console.log(c)
}

function combine_array2(){
    let a = [1, 2, 3];
    let b = [4, 5, 6];
    let c = [...a, ...b];
    console.log(c)
}

function combine_array3(){
    let a = [1, 2, 3];
    let b = [4, 5, 6];
    a.push(...b);
    console.log(a)
}

// 5. Напишіть алгоритм який перетворить масив persons у масив текстових фрагментів типу
// ’John from Boston born in 2000’
function transform(){
    function get_date(age){
        let year_now = new Date(Date.now()).getFullYear();
        return year_now - age
    }

    let my_obj = { name: "John", age: 23, city: "Boston"};
    let obj_array = [];
    for (let i = 0; i < 5; i++){
        obj_array.push(my_obj);
    }
    obj_array.push({name: "Roma", age: 19, city: "Kyiv"})

    let string_array = [];
    for (obj of obj_array){
        string_array.push(obj.name + " from " + obj.city + " born in " + get_date(obj.age))
    }

    console.log(string_array);
}

// 6. Напишіть алгоритм який з масиву persons вибере людей старше 20 років.
function older20(){
    let obj_array = [{ name: "John", age: 23, city: "Boston"},
    {name: "Roma", age: 19, city: "Kyiv"},
    {name: "Test", age: 20, city: "Test"},
    {name: "Roma", age: 23, city: "Kyiv"}];

    let older = []
    for (person of obj_array){
        if (person.age > 20){
            older.push(person);
        }
    }
    console.log(older);

}

// 7. З допомогою деструктуризації присвойте значення полів name, city із обєкта person у
// окремі змінні. З допомогою деструктуризації присвойте перший елемен масиву persons у
// зокрему змінну.
function destructuring_test(){
    let person = { name: "John", age: 23, city: "Boston"};
    let name, age, city;
    [name, age, city] = [person.name, person.age, person.city]
    console.log(name, age, city);

    let persons = [{ name: "John", age: 23, city: "Boston"},
    {name: "Roma", age: 19, city: "Kyiv"},
    {name: "Test", age: 20, city: "Test"},
    {name: "Roma", age: 23, city: "Kyiv"}];

    let first;
    [first] = persons;
    console.log(first);
}

// 8. Створіть функцію getUserData яка приймє аргументом імя користувача та повертає обєкт із
// масиву persons. Якщо обєкт з таким іменем не знайдений функція має згенерувати обєкт
// помилки new Error(‘Unable to find user’). Створіть функцію showUserInfo яка приймає
// аргументом імя, виводить в консоль текст ‘Loading’, викликає функцію getUserData, якщо
// користувач знайдений – виводить його поля в консоль і текст ‘Loading finished’, якщо
// користувач не знайдений виведіть текст помилки та текст ‘Loading finished’.
function getUserData(name){
    let persons = [{ name: "John", age: 23, city: "Boston"},
    {name: "Roma", age: 19, city: "Kyiv"},
    {name: "Test", age: 20, city: "Test"},
    {name: "Roma", age: 23, city: "Kyiv"}];

    let result = persons.find((person) => person.name == name);
    if(!result){
        throw new Error("Unable to find user");
    }
    return result;
}

function showUserInfo(name){
    console.log("Loading")
    try{
        console.log(getUserData(name));
    } catch (e) {
        console.error(`${e.name}: ${e.message}`)
    }
    
    console.log("Loading finished");
}

// 9. Напишіть функцію яка перетворить текстовий фрагмент у масив букв.
function splitText(text){
    text = text.replace(/\s+/g, '');

    word_array = [];
    for (word of text){
        word_array.push(word);
    }
    return word_array;
}

// 10. Створіть функцію яка відобразить букви слова у зворотньому порядку.
function reverse(word){
    let letter_array = word.split("");
    let reverse_array = letter_array.reverse();
    reverse_word = reverse_array.join("");
    return reverse_word.toLowerCase();
}

// 11. Напишіть функцію яка визначатиме чи передане імя файлу файл формату ‘.js’
function isFormatJs(file_name){
    file_name = file_name.split(".");
    return (file_name.slice(-1) == "js");
}

// 12. Напишіть функцію яка перетворить речення на масив слів
function splitSentence(text){
    text = text.split(" ");
    let result = [];
    for (item of text){
        if (item != ""){
            result.push(item);
        }
    }
    return result;
}

// 13. Напишіть алгорим який замінить певне слово у текстовому фрагменті
function replaceWord(word, new_word, text){
    let word_array = text.split(" ");
    let index = word_array.indexOf(word);
    word_array.splice(index, 1, new_word);
    return word_array.join(' ');
}


// console.log(getUserData("Roma"));
// showUserInfo("d")
// console.log(splitText("dhj   dde  on"));
// console.log(reverse("Hello"))
// console.log(isFormatJs("test.js"));
// console.log(splitSentence("    Hello    World    "))
console.log(replaceWord("Hello", "Test", "Hello World"));
