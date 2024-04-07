import myEncoder from "./caesarCipher.js";
import Loging from "../Task2/log.js";

let coder = new myEncoder(100);
let myLogger = new Loging();


let encryptedMessage = coder.encrypt("abcd");

myLogger.log(encryptedMessage, 3);
myLogger.log(coder.decrypt(encryptedMessage), 3);
