  /*import {
    root, HistoryBtn, setLangBtn, dropdown, deleteSpaceInitial, renderUpCase, removeDoubleSpace, renderLowerCase, langTransform, searchTransform, commonifyWord, checkBox, inputLang, langInputBtn, langIndicator, currentLang, updateLang, historyLedger, searchInputBtn, searchBox, inputText, historyEntries, render, wordCounter, Entry, delBtnList, arrayRemoveEntry, deleteEntry, updateDelBtnList 
  } from '/index.js';*/

//web-worker

//Properness
/*
let properness = false;//will know when we are working with a proper noun or not thanks to webworkers (WON'T WORK)

onmessage = function(e){
  console.log(e.data);
  properness = JSON.parse(e.data);
 };

*/

let properness = false;

//if (chrome.storage.local.get("proper?")){
//properness = chrome.storage.local.get("proper?"); 
//}

 //
  
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
  

  
  
  
  //All input boxes
  
  

  
  function updateLang(sign){
  
    let langDisplay = `Current Language: ${sign}`;
    langIndicator.innerHTML = langDisplay;
  
  }

  
  


  




let myContextMenu = {id: "search-opt",
title: "Search word on Wiktionary",
type: "normal",
contexts: ["selection"]
}
  
chrome.contextMenus.create({id: "search-opt",
title: "Search word on Wiktionary",
type: "normal",
contexts: ["selection"]
});
  /*
  chrome.window.addEventListener("mouseup", function(clickData){
    searchedWord = clickData.selectionText;
    myContextMenu.title = `Search \"${searchedWord}\" on Wiktionary`;
    chrome.contextMenus.create(myContextMenu);
  }) */

 




  chrome.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "search-opt" && clickData.selectionText){

      let searchedWord = clickData.selectionText;

    
  
      let today = new Date();
      let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(); //saves date
  
      searchedWord = searchTransform(searchedWord);
  
    //console.log(properness);
     //if (properness === false){ 

      //searchedWord = commonifyWord(searchedWord);
      
      //console.log(searchedWord);
      
    
  
    //historyEntries.push(new Entry(searchedWord, date, wordCounter)); //constructor for entry, adds it to the list of all entries (global)
  
  
    //render(historyEntries);
    //updateDelBtnList();
  
    //++wordCounter; //adds one to the word counter
    //console.log(historyEntries);*/

    /*postMessage(searchedWord);// sends back to the main function they don't work on backgrounnd files (WON'T WORK) */

    chrome.tabs.create({url: `https://en.wiktionary.org/wiki/${searchedWord}`});
  

    }
  })


