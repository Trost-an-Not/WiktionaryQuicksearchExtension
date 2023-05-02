importScripts ("textTransform.js");
import { checkBox, checkBoxVal, inputLang, langInputBtn, langIndicator, currentLang, updateLang, getLangFromBox } from './languageEntities.js';
import { wordCounter, decreaseCounter, increaseCounter } from './wordTracker.js';


//Animation functions for dropdown

 const root = document.documentElement;
 const HistoryBtn = document.getElementById("show-history-btn");
 const setLangBtn = document.getElementById ("target-lang-btn");

HistoryBtn.addEventListener("click", 
function(){
  dropdown(
    "--DROPDOWNSTATUS", 
    "--YBOX2",
    )});

setLangBtn.addEventListener("click", 
function(){
  dropdown(
  "--COLLAPSED", 
  "--YBOX1",
   )});

   
 function dropdown
(dropVariable, YScale){ //parameter is the variable to change and are strings


  let dropStatus = getComputedStyle(document.documentElement).getPropertyValue(dropVariable); //

  //Had to flip "if-else" order, or else it requires a double click to start.
  //Searches whether the element is dropped down already or not 
  if (dropStatus === "flex column")
  {
    root.style.setProperty(YScale, "ScaleY(0%)");

    setTimeout(() => {
      root.style.setProperty(dropVariable, "none");}, "500") 
    }
  else
  {
    root.style.setProperty(dropVariable, "flex column");

    setTimeout(() => {
      root.style.setProperty(YScale, "ScaleY(100%)"); //makes it appear 
      }, "20") 
  }
}


//For the main input and history

//------------------------------ 



const searchBox = document.getElementById("input-main");
const searchInputBtn = document.getElementById("search-btn");
export const historyLedger = document.getElementById("history-list");

let inputText = searchBox.value

export let historyEntries = []; //array containing all the different entry objects

chrome.storage.local.get(["historyEntries"], function(result){
  if (result.historyEntries){
    historyEntries = JSON.parse(result.historyEntries);
    render(historyEntries);
  }
})

export function addToHistoryEntry(newEntry){
  historyEntries.push(newEntry)
 }

export function render(entries) { //method 2, parameter

  let historyListContain = ""

  for (let i = 0; i < entries.length; i++) {
      historyListContain =  //adding all of the entries to the HTML-ul

      //added a class for the option to search
      `
          <li class="A${entries[i].indexCounter}"> 
              <a target='_blank' href='https://en.wiktionary.org/wiki/${entries[i].word}#${entries[i].language}'>
                  ${entries[i].word}</a> (${entries[i].date}) 
                  <span class="delete" id="B${entries[i].indexCounter}"> &times; </span>
              
          </li>
      `
      + historyListContain; //since we're adding to the beginning
  }
  historyLedger.innerHTML = historyListContain;
  
  chrome.storage.local.set({"historyEntries": JSON.stringify(entries) });
}



// ----------------------------





export function Entry(givenWord, givenDate, givenIndex){ //constructor function
  this.date = givenDate;
  this.word = givenWord;
  this.language = currentLang;
  this.indexCounter = givenIndex; //Index in case multiple examples of that word exist
}


searchInputBtn.addEventListener("click", 
function(){
  searchExtract();
});

searchBox.addEventListener("keypress", function (e) { //check original object: searchBox and not the Button!
  if (e.key === "Enter") {
    searchExtract();
  }
}); 


function searchExtract(){
  let today = new Date();
  let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(); //saves date
  let searchedWord = searchBox.value; //extracts input text

  if (searchedWord){

    searchBox.value = ""; //cleans box
    searchedWord = searchTransform(searchedWord);

    if (checkBoxVal === false && currentLang !== "German"){
      searchedWord = commonifyWord(searchedWord);
      }
    

    historyEntries.push(new Entry(searchedWord, date, wordCounter)); //constructor for entry, adds it to the list of all entries (global)
    
    window.open(`https://en.wiktionary.org/wiki/${searchedWord}#${currentLang}`, '_blank');


    render(historyEntries);
    updateDelBtnList();
    

    increaseCounter(); //adds one to the word counter
    //console.log(historyEntries);
    console.log("Counter", wordCounter)

    chrome.storage.local.set({wordCounter});
  }
}


let delBtnList = []

chrome.storage.local.get(["detBtnList"], function(result){
  if (result.delBtnList){
  delBtnList = JSON.parse(result.delBtnList);
  if (historyEntries){ 
      updateDelBtnList();
    }
  }
})

//Delete Button Functionalities
function arrayRemoveEntry(array, index){ //function for removing entries from an array 
  let tmpArr = [];
  let i = 0;

  //console.log("index:" + index + " length" + array.length);

  if (index < array.length){ //only works if valid index given (that is, in range)
    while (i < index){
    tmpArr.push(array[i]);
    ++i;
    }
    

    ++i; //by the end, i = index, so we move by one more.

    while (i < array.length){ //we skip the index since we're cloning the array minus that entry[index]
    tmpArr.push(array[i]);
    ++i;
    }

    return tmpArr;
  }
  return;
}

function deleteEntry(ind){
  //console.log("delete index is" + ind);

  delBtnList = arrayRemoveEntry(delBtnList, ind);
  historyEntries = arrayRemoveEntry(historyEntries, ind);

  chrome.storage.local.set({ "delBtnList": JSON.stringify(delBtnList) });
  chrome.storage.local.set({ "historyEntries": JSON.stringify(historyEntries) });
  
  //Start reordering each of the entries
  for (let i = 0; i < historyEntries.length; ++i){
    historyEntries[i].indexCounter = i;
  }
  render(historyEntries);
  
  //recalculate IDs
  updateDelBtnList();

  decreaseCounter();

  console.log("Counter", wordCounter)

  chrome.storage.local.set({wordCounter})
}

//Reassigning functionality to each delete button
function updateDelBtnList(){ 
  //let delBtnListTmp = delBtnList;

  delBtnList = [];

  for( let j = 0; j < historyEntries.length; ++j){ //regstering all the buttons and assigning them
    delBtnList.push(document.getElementById("B" + j)); //HERE IS THE PROBLEM: NEED TO RESET THE IDS and therefore reset the ID property
  }
  chrome.storage.local.set({ "delBtnList": JSON.stringify(delBtnList)}); //saving all the delete buttons
  

  for(let j=0; j < historyEntries.length; ++j){ //adding functionality to all the delete buttons

  let value = j;

  delBtnList[value].addEventListener("click", function(){
    deleteEntry(value); //here the prob i out of scope
    });
  }
}



export { delBtnList, arrayRemoveEntry, deleteEntry, updateDelBtnList };
