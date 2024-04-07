
export default class myEncoder{
    constructor(shift){
        this.shift = shift;
    }

    encrypt(text){
        let encryptedText = "";
        for (let letter of text){
            encryptedText += String.fromCharCode(letter.charCodeAt(0) + this.shift);
        } 
        return encryptedText;
    }

    decrypt(text){
        let decryptedText = "";
        for (let letter of text){
            decryptedText += String.fromCharCode(letter.charCodeAt(0) - this.shift);
        } 
        return decryptedText;
    }

}
