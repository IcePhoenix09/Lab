export default class Loging{
    constructor(){
        this.level = this.getInfoLevel();;
        this.maxLevel = this.getInfoLevel();
    }
    setLevel(newLevel){
        this.maxLevel = newLevel;
        this.ErrorLevel = 3;
    }
    log(massage, level){
        if (level <= this.maxLevel){
            console.log(massage);
        }   
    }
    getErrorLevel(){
        return 1;
    }
    getWarningLevel(){
        return 2;
    }
    getInfoLevel(){
        return 3;
    }
}
