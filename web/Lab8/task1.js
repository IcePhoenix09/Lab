class DefaultLocale{
    constructor(maleTitle, femaleMartialTitle, femaleTitle){
        this.maleTitle = maleTitle;
        this.femaleMartialTitle = femaleMartialTitle;
        this.femaleTitle = femaleTitle;
    }
    
    personToString(person){
        let title = ''
        if (person.gender === 'male') {
            title = this.maleTitle;
        } else if (person.gender === 'female' 
        && this.maritalStatus === 'married') {
            title = this.femaleMartialTitle;
        } else if (person.gender === 'female' && this.maritalStatus === 'single') {
            title = this.femaleTitle;
        }
        return `${title} ${person.lastName}`;
    }

}
englishLocale = new DefaultLocale('Mr.', 'Mrs.', 'Miss');
germanLocale = new DefaultLocale('Herr', 'Frau', 'Fräulein');
frenchLocale = new DefaultLocale('M.', 'Mme', 'Mlle')

class Person{
    constructor(firstName, lastName, gender, maritalStatus, locale){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.maritalStatus = maritalStatus;
        this.locale = locale;
    }

    toLocaleString() {
        return this.locale.personToString(this);
    }
}

const person1 = new Person('John', 'Smith', 'male', 'married', englishLocale);
const person2 = new Person('Sophie', 'Schmidt', 'female', 'single', germanLocale);

console.log(person1.toLocaleString());