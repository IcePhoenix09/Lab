import Loging from "./log.js";

const loging = new Loging(); 
loging.setLevel(2);
loging.log("[Error] Test", loging.getErrorLevel());
loging.log("[Warning] Test", loging.getWarningLevel());
loging.log("[Info] Test", loging.getInfoLevel());