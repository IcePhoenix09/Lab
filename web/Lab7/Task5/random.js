
export function randNumber(min, max) { 
    return Math.trunc(Math.random() * (max - min) + min);
}

export function randArray(min, max, arraySize){
    let resultArray = [];
    if (!arraySize){
        arraySize = randNumber(5, 50);
    }
    for (let i = 0; i < arraySize; i++){
        resultArray.push(randNumber(min, max));
    }
    return resultArray;
}

export function randText(textSize){
    let resultText = "";
    if (!textSize){
        textSize = randNumber(5, 50);
    }
    for (let i = 0; i < textSize; i++){
        resultText += String.fromCharCode(randNumber(65, 122));
    }
    return resultText;
}
