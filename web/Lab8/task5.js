
function messageFormat(template, ...keys){
    return template(...keys);
}

function template(strings, ...keys) {
    return (...values) => {
      const result = [strings[0]];
      keys.forEach((key, i) => {
        const value = values[key];
        result.push(value, strings[i + 1]);
      });
      return result.join("");
    };
  }

const englishTemplate = template`${0} has ${1} messages`;
const frenchTemplate = template`Il y a ${1} messages pour ${0}`;

console.log(messageFormat(frenchTemplate, "John", "5"));
console.log(messageFormat(englishTemplate, "John", "5"));
