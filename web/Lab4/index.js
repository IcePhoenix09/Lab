// 1. Створіть клас для автомобіля з такими властивостями, як марка, модель і рік випуску.
// Потім створіть екземпляр автомобіля та встановіть його властивості. Виконайте дане
// завдання:
// • З використанням функції конструктора
// • З використанням синтаксису класс
function Car1(brand, model, date){
    this.brand = brand;
    this.model = model;
    this.date = date;
}

class Car2{
    constructor(brand, model, date) {
        this.brand = brand;
        this.model = model;
        this.date = date;
    }
}

let myCar1 = new Car1("Fiat", "233", 2003);
let myCar2 = new Car2("Fiat", "233", 2003);
// console.log(myCar1);
// console.log(myCar2);

// 2. Створіть два екземпляри даного класу користуючись методом Object.create()
let myCar3 = Object.create(myCar1);
let myCar4 = Object.create(myCar2);

// console.log(myCar3);
// console.log(myCar4);

// 3. Створіть класс персона який містить поля імя, прізвище, рік народження. Створіть даний
// клас не використовуючи class синтаксис. Додайте в даний клас методи які виводитимуть
// вік та повне імя особи.
function Person(first_name, last_name, birth_year){
    this.first_name = first_name;
    this.last_name = last_name;
    this.birth_year = birth_year;
    this.full_data = function(){
        console.log(`Name: ${first_name} ${last_name}, 
        Birth_year: ${birth_year}`);
    }
}

let person = new Person("Roman", "Vlasuk", 2004);
// person.full_data();

// 4. Створіть субкласс класу персона який міститиме поле посада тп перевизначає метод
// виведення повного імені додаючи туди посаду особи.
function Employee(position, first_name, last_name, birth_year){
    Person.call(this, first_name, last_name, birth_year);
    this.position = position;
    this.full_data = function(){
        console.log(`Name: ${first_name} ${last_name}, 
        Birth_year: ${birth_year}
        Position: ${position}`);
    }
}
let person2 = new Employee("test", "Roman", "Vlasuk", 2004)
// person2.full_data();

// 5. Напишіть метод який приймає два обєкти та визначає чи вони обєкти одног класу та
// виводить в консоль фразу з іменами класів обєктів
let compare = {
    check: function(a, b){
        if (a.constructor === b.constructor){
            console.log(
                `Equal: ${a.constructor.name}, ${b.constructor.name}`);
        } else {
            console.log(
                `Not equal: ${a.constructor.name}, ${b.constructor.name}`);
        }
    }
}

// compare.check(person2, person);
// compare.check(myCar1, myCar3);

// 6. Створіть метод який приймає екземпляр класу Person та перетворює його у екземпляр
// ObservedPerson. Екземпляр ObservedPerson має вести себе аналогічно до класу Person та
// при виклику його методів буде виводити в консоль кількість викликів.
class NewPerson {
    constructor(first_name, last_name, birth_year) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.birth_year = birth_year;
    }
    full_data() {
        console.log(`Name: ${this.first_name} ${this.last_name}, 
    Birth_year: ${this.birth_year}`);
    };
}
person = new NewPerson("Roman", "Vlasuk", 2004);

class ObservedPerson{
    constructor(){
        this.call_counter = 0;
    }
    get_counter(){
        return this.call_counter;
    }
    full_data() {
        this.call_counter++;
        console.log(this.call_counter);
        this.__proto__.__proto__.full_data();
    }
}

function createObs(person){
    let obs = new ObservedPerson();
    Object.setPrototypeOf(obs.__proto__, person);
    return obs;
}

const obs_person = createObs(person);

// obs_person.full_data();
// obs_person.full_data();


// 7. Створіть абстрактний клас під назвою Shape, який визначає методи для обчислення площі
// та периметра. Змусьте дочірні класи імплементувати ці методи.
class Shape{
    area() {
        return null
    }

    perimeter(){
        return null
    }
}

class Square extends Shape {
    constructor(a){
        super();
        this.a = a;
    }

    area(){
        return this.a * this.a;
    }

    perimeter(){
        return this.a * 2;
    }
}

class Circle extends Shape {
    constructor(radius){
        super();
        this.radius = radius;
    }

    area(){
        return 3.14 * this.radius ** 2;
    }

    perimeter(){
        return this.radius * 2 * 3.14;
    }
}

class Triangle extends Shape {
    constructor(a, b, c){
        super();
        this.a = a;
        this.b = b;
        this.c = c;
    }

    area(){
        const p = this.perimeter() / 2
        return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c))
    }

    perimeter(){
        return this.a + this.b + this.c;
    }
}

const sq = new Square(4);
// console.log(sq.area());
// console.log(sq.perimeter());

const circle = new Circle(3)
// console.log(circle.area());
// console.log(circle.perimeter());

const tr = new Triangle(4, 4, 4);
// console.log(tr.area());
// console.log(tr.perimeter());

// 8. Створіть масив фігур, що включає екземпляри кожного класу фігур. Перегляньте масив і
// викличте методи площі та периметра для кожної фігури.
let shape_array = [sq, circle, tr];
function shapeInfo(){
    for (shape of shape_array){
        console.log(shape.area());
        console.log(shape.perimeter());
    }
}
shapeInfo();
