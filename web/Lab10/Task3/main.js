const bc = new BroadcastChannel("closed_tabs");

let tabId = null;
let tabIdList = null;
let windowStatus = null;

function getTabListFromStorage(){
  tabIdList = JSON.parse(localStorage.getItem("tabIdList"));
}

function addNewTab(){
  try{
    lastTabId = Number(localStorage.getItem("lastTabId"));
    console.log("Last tab id was - " + lastTabId);
    tabId = lastTabId + 1;
    localStorage.setItem("lastTabId", tabId);
    console.log("Id of this tab is set to - " + tabId);
  } catch (error) {
    console.warn(
      "Looks like storage data is empty. It's going to be created:", 
      error);
    tabId = 0;
    localStorage.setItem("lastTabId", tabId);
    console.log("Id of this tab is set to - " + tabId);
  };

  try{
    getTabListFromStorage();
  } catch (error) {
    console.warn(
      "Looks like storage data is empty. It's going to be created:", 
      error);
    tabIdList = [];
  } 
  tabIdList.push(tabId);
  console.log("tabIdList is set to:" + tabIdList);
  localStorage.setItem("tabIdList", JSON.stringify(tabIdList));
}

function setStatus(){
  let number = tabIdList.indexOf(tabId);
  if (number === 0){
    windowStatus = "main";
  } else {
    windowStatus = "secondary";
  }
  console.log(`Tab number is - ${number}. Status set to - ${windowStatus}`);
}

function displayStatus(){
  let header = document.getElementById("header");
  header.innerText = windowStatus;
  console.log("html page is updated");
}

function removeTabFromStorage(){
  tabIdList = JSON.parse(localStorage.getItem("tabIdList"));
  tabIdList.splice(tabIdList.indexOf(tabId), 1);
  if (tabIdList.length === 0){
    localStorage.setItem("lastTabId", -1);
  }
  localStorage.setItem("tabIdList", JSON.stringify(tabIdList));
}

addNewTab();
setStatus();
displayStatus();

window.addEventListener('beforeunload', (event) => {
  removeTabFromStorage();
  bc.postMessage(tabId);
});

bc.onmessage = (event) => {
  console.log(`Tab with id - ${event.data} was closed`);
  console.log('Updating status');
  getTabListFromStorage();
  setStatus();
  displayStatus();
};
