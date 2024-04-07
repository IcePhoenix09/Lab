export const ErrorLevel = 1;
export const WarningLevel = 2;
export const InfoLevel = 3;

let maxLevel = InfoLevel;

export function setLevel(newLevel){
    maxLevel = newLevel;
}

export function log(massage, level){
    if (level <= maxLevel){
        console.log(massage);
    }   
}
