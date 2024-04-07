import * as loging from "./log.js";

loging.setLevel(2);
loging.log("[Error] Test", loging.ErrorLevel);
loging.log("[Warning] Test", loging.WarningLevel);
loging.log("[Info] Test", loging.InfoLevel);
