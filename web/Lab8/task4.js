const a = 'Réservé';
const b = 'reserve'; 

function compare(a, b, locale, ignoreCase){
    let option = ignoreCase;

    return a.localeCompare(b, locale, { sensitivity: option });
}

console.log(compare(a, b, 'en-US', 'case'));
