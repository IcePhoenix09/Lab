// 1. Напишіть функцію invokeAfterDelay, яка повертає проміс, який викликає задану функцію із
// заданою затримкою. Продемонструйте її роботу, повертаючи проміс, що містить
// випадкове число від 0 до 10. Отриманий результат виведіть в консолі.
function invokeAfterDelay(delay){
    return new Promise(function(resolve){
        const rand_number = Math.random() * 10;
        setTimeout(() => {
            resolve(rand_number)
        }, delay)
    })
}

// invokeAfterDelay(1000).then((rand_number) => console.log(rand_number));

// 2. Створивши на базі попередньої функції функцію produceRandomAfterDelay. Викличте
// функцію produceRandomAfterDelay двічі і надрукуйте суму, після того як будуть отримані
// обидва результати.
function produceRandomAfterDelay(){
    const result = invokeAfterDelay(1000);
    return result;
}

async function getData(){
    a = await produceRandomAfterDelay();
    b = await produceRandomAfterDelay();
    console.log(a, b);
}
// getData();

// 3. Напишіть функцію sleep, яка повертає проміс, який можна викликати так:
// await sleep(1000)
async function sleep(time){
    return new Promise(function(resolve, reject){
        setTimeout(() => resolve(time), time); 
    })
}


// 4. Напишіть функцію getUser яка приймає id та повертає проміс який виконується через 1
// секунду з обєктом користувача з полями імя, вік, місто, id. Підготуйте 4 обєкти користувача
// з id від 0 до 3 які повертатимуться функцією відповідно до id. Якщо незнайомий id
// отриманий – проміс має бути відхилений з помилкою ‘User not found’.
let persons = [{id: 0, name: "John", age: 23, city: "Boston"},
{id: 1, name: "Roma", age: 19, city: "Kyiv"},
{id: 2, name: "Test", age: 20, city: "Test"},
{id: 3, name: "Roma", age: 23, city: "Kyiv"}];

function getUser(id){
    return new Promise(async function(resolve, reject){
        await sleep(1500);
        result = persons.find((person) => person.id == id);
        if (result == undefined){
            reject("Error: User not found!");
        } else{
            resolve(result);
        }
    });
}

async function findMyUser(id){
    try {
        const person = await getUser(id);
        console.log(person);
        return person;
    } catch (error){
        console.log(error);
    }
}
// findMyUser(1);

// 5. Напишіть функцію loadUsers яка приймає масив ідентифікаторів та повертає масив обєктів
// користувача використовуючи попередню функцію. Обробіть ситуацію коли один з промісів
// був відхилений.
function OnFinish(data){
    return data
}

function loadUsers(id_list){
    return new Promise(function(resolve, reject){
        let user_list = [];
        let promise_list = [];
        for (id of id_list){
            let result = getUser(id);
            promise_list.push(result);
        }
        for (i in promise_list){
            if (i == promise_list.length - 1){            
                promise_list[i]
                    .then((user) => user_list.push(user))
                    .then(() => resolve(user_list))
                    .catch((error) => reject(error))
            } else {
                promise_list[i]
                    .then((user) => user_list.push(user))
                    .catch((error) => reject(error));
            }
        }
    })
}

async function start(){
    try{
        const result = await loadUsers([1, 2, 3]);
        console.log(result);
    } catch(error) {
        console.log(error);
    }
}
// start();

// 6. Напишіть функцію logCall яка приймає функцію коллбек – викликає її через одну секунду та
// пише в консоль поточний час. Зробіть щоб дана функція повертала проміс. Зробіть 4
// послідовних виклики даної функції використовуючи ланцюжок промісів.
function logCall(callback){
    return new Promise(function(resolve, reject){
        function innerFunc(){
            callback();
            console.log(Date(Date.now()).toString());
            resolve();
        }
        setTimeout(innerFunc, 1000);
    })
    
}
function testFunc(){
    console.log("Test")
}

// logCall(testFunc)
//     .then(() => logCall(testFunc))
//     .then(() => logCall(testFunc))
//     .then(() => logCall(testFunc));

// 7. Напишіть функцію showUsers яка симулює завантаження користувачів використовуючи
// loadUsers. Перед викликом loadUsers дана функція має вивести в консоль ‘loading’ при при
// успішному чи неуспішному завершенні виведе ‘loading finished’. Використайте синтаксис
// async/await при виконанні даного завдання.
async function showUsers(){
    console.log('loading...');
    try {
        const result = await loadUsers([1, 2, 3]);
        console.log(result);
    } catch(error){
        console.log(error);
    }   
    console.log('loading finished');
}
showUsers();
