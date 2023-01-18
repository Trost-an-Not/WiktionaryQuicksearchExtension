


//Wordcounter Save

let wordCounter = 0
if (localStorage.getItem("word counter"))
{wordCounter = JSON.parse(localStorage.getItem("word counter"));}



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

  /*
 const dropContent = document.querySelector(dropContentClass); */ //get object with such class

  let dropStatus = getComputedStyle(document.documentElement).getPropertyValue(dropVariable); //

  //flipped if and else order, or else it requires a double click to start.

 
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

//End animatons


// All the language transformation functions

 function deleteSpaceInitial(text){
  if (text[0] === " "){
    text = text.substring(1, text.length);
    return deleteSpaceInitial(text);
  }
  else
  {
  return text;
  }
}


 function renderUpCase(text){

  let i = 0;
  text = text.substring(0,i) + text[i].toUpperCase() + text.substring(i+1, text.length);
  ++i;

  for (; i < text.length; ++i){
    if (text[i-1] == " "){
      text = text.substring(0,i) + text[i].toUpperCase() + text.substring(i+1, text.length);
    }
  }
  return text;
}

 function removeDoubleSpace(text){
  for (let i = 1; i < text.length; ++i){
    if ((text[i-1] === " ") && (text[i] === " ")){
      text = text.substring(0,i) + text.substring(i+1, text.length);
    }
  }
  return text;
}


 function renderLowerCase(text){

  for (let i = 1; i < text.length; ++i){
    if (text[i-1] !== " "){
      text = text.substring(0,i) + text[i].toLowerCase() + text.substring(i+1, text.length);
    }
  }
  return text;
}

 function langTransform(text){
text = deleteSpaceInitial(text); //since pass by value and not pass by reference
text = renderUpCase(text);
text = removeDoubleSpace(text);
text = renderLowerCase(text);
return text;
}

 function searchTransform(text){
  text = deleteSpaceInitial(text); //since pass by value and not pass by reference
  text = removeDoubleSpace(text);
  text = renderLowerCase(text);
  return text;
  }

 
   function commonifyWord(text){
    text = text[0].toLowerCase() + text.substring(1, text.length);
    return text;
  }

//End transformation functions

//Toggle "Properness" of noun

const worker = new SharedWorker('background.js');//worker needs to know "properness of word selected"

/* (WON'T WORK)
worker.onmessage = function(e){

  let newWord = e.data; //gets word from search
  
  let today = new Date();
  let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(); //saves datet

  historyEntries.push(new Entry(newWord, date, wordCounter)); //constructor for entry, adds it to the list of all entries (global)


   render(historyEntries);
   updateDelBtnList();
    

    ++wordCounter; //adds one to the word counter
    //console.log(historyEntries);
    localStorage.setItem("word counter", JSON.stringify(wordCounter));

}; */

/////

 const checkBox = document.getElementById("properness-checkbox");

 let checkBoxVal = checkBox.checked;

 checkBox.addEventListener("click", function(){
  if (checkBoxVal === false){
    checkBoxVal = true;
  }
  else{
    checkBoxVal = false;
  }

  chrome.storage.local.set({"proper?" : checkBoxVal});
  //worker.postMessage(JSON.stringify(checkBoxVal)); //sends to worker (WON'T WORK) */

  localStorage.setItem("checkbox value", JSON.stringify(checkBoxVal)); //everytime the status changes, it saves it onto localStorage
  }
)
 if (localStorage.getItem("checkbox value")){
  checkBox.checked = JSON.parse(localStorage.getItem("checkbox value"));

 }






//All input boxes



 const inputLang = document.getElementById("input-lang")
 const langInputBtn = document.getElementById("submit-lang-btn")
 const langIndicator = document.getElementById("lang-show")

 let currentLang = "";
 if ((localStorage.getItem("current language")) && (localStorage.getItem("current language") != "\"\"")){
 currentLang = JSON.parse(localStorage.getItem("current language"));
 updateLang(currentLang);
}; //global variable: will be useful for creating entry objcts

 function updateLang(sign){

  let langDisplay = `Current Language: ${sign}`;
  langIndicator.innerHTML = langDisplay;

}

//Correct language input

inputLang.addEventListener("keypress", function(e){ //"Enter" trigger
  if (e.key === "Enter"){
    getLangFromBox();
  }
})

langInputBtn.addEventListener("click",  //from Button
function(){
  getLangFromBox();
})

function getLangFromBox(){

  let language = inputLang.value;
  inputLang.value = "";
  language = langTransform(language); 
  if (language === "None")
  {
  currentLang = "";
  updateLang("None")
  }
  else
  {
  currentLang = language
  updateLang(language);
  }

  localStorage.setItem("current language", JSON.stringify(currentLang));

  //chrome.storage.local.set({"currentLang?" : currentLang});
}



//For the main input and history

//------------------------------ 



 const searchBox = document.getElementById("input-main");
 const searchInputBtn = document.getElementById("search-btn");
 const historyLedger = document.getElementById("history-list");

 let inputText = searchBox.value
 
 let historyEntries = []; //array containing all the different entry objects

 if (localStorage.getItem("entries"))  //checking local storage
 {
  historyEntries = JSON.parse(localStorage.getItem("entries"));
  render(historyEntries);
 }

/*
function render(entries) { //method 1; no parameter
  historyListContain = ""
  for (let i = 0; i < historyEntries.length; i++) {
      historyListContain +=  //adding all of the entries to the HTML-ul
      `
          <li>
              <a target='_blank' href='https://en.wiktionary.org/wiki/${historyEntries[i].word}#${historyEntries[i].language}'>
                  ${historyEntries[i].word}
              </a>
          </li>
      `
  }
  historyLedger.innerHTML = historyEntries;
} */

 function render(entries) { //method 2, parameter

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
  localStorage.setItem("entries", JSON.stringify(entries));
  //console.log(entries)
}




// ----------------------------





 function Entry(givenWord, givenDate, givenIndex){ //constructor function
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

    if (checkBox.checked === false){
      searchedWord = commonifyWord(searchedWord);
      }
    

    historyEntries.push(new Entry(searchedWord, date, wordCounter)); //constructor for entry, adds it to the list of all entries (global)
    
    window.open(`https://en.wiktionary.org/wiki/${searchedWord}#${currentLang}`, '_blank');

    //chrome.storage.sync.set({"entries?" : historyEntries});

    render(historyEntries);
    updateDelBtnList();
    

    ++wordCounter; //adds one to the word counter
    //console.log(historyEntries);

    //chrome.storage.local.set({"wordcount?" : wordCounter}); 

    localStorage.setItem("word counter", JSON.stringify(wordCounter));
  }
}



//Delete Button Functionalities

let delBtnList = []
if (localStorage.getItem("all delete buttons"))
{delBtnList = JSON.parse(localStorage.getItem("all delete buttons"));
updateDelBtnList();}

 function arrayRemoveEntry(array, index){ //function for removing entries from an array 
  let tmpArr = [];
  let i = 0;

  //console.log("index:" + index + " length" + array.length);

  if (index < array.length){ //only works if valid index given (that is, in range)
    while (i < index){
    tmpArr.push(array[i]);
    ++i;
    } 

    console.log(tmpArr);
    

    ++i; //by the end, i = index, so we move by one more.

    while (i < array.length){ //we skip the index since we're cloning the array minus that entry[index]
    tmpArr.push(array[i]);
    ++i;
    }
    console.log( "after pt 2:");
    console.log(tmpArr);
    return tmpArr;
  }
  return;
}

 function deleteEntry(ind){
  //console.log("delete index is" + ind);

  delBtnList = arrayRemoveEntry(delBtnList, ind);
  historyEntries = arrayRemoveEntry(historyEntries, ind);
  console.log("once in deleteEntry")
  console.log(delBtnList)
  console.log(historyEntries);
  for (let i = 0; i <historyEntries.length; ++i){
    historyEntries[i].indexCounter = i;
  }
  render(historyEntries);
  console.log("after render HistoryEntries")
  console.log(delBtnList)
  console.log(historyEntries);
  //recalculate IDs
  updateDelBtnList();

  --wordCounter;

  //chrome.storage.local.set({"wordcount?" : wordCounter});
  localStorage.setItem("word counter", JSON.stringify(wordCounter));
}

function updateDelBtnList(){  //for giving every new button functionality
  let delBtnListTmp = delBtnList;
  delBtnList = [];

  console.log("in updateDelBtn")
  console.log(historyEntries.length)
  console.log(historyEntries)
  console.log(delBtnList)

  for( let j = 0; j < historyEntries.length; ++j){ //regstering all the buttons and assigning them
    delBtnList.push(document.getElementById("B" + j)); //HERE IS THE PROBLEM: I NEED TO RESET THE IDS and therefore reset the ID property


  
  }

  localStorage.setItem("all delete buttons", JSON.stringify(delBtnList)); //saving all the delete buttons
  

  for(let j=0; j < historyEntries.length; ++j){ //adding functionality to all the delete buttons
  let value = j;
  delBtnList[value].addEventListener("click", function(){
    //console.log("inside index = " + (value));
    deleteEntry(value); //here the prob i out of scope
    });
  }
}

//Initiaising
/*
checkBoxVal = localStorage.getItem("checkbox value", JSON.stringify(checkBoxVal));

currentLang = localStorage.getItem("current language", JSON.stringify(currentLang));

historyEntries = localStorage.getItem("entries", JSON.stringify(entries));

wordCounter = localStorage.getItem("word counter", JSON.stringify(wordCounter));
*/
