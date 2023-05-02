import { deleteSpaceInitial, renderUpCase, removeDoubleSpace, renderLowerCase, langTransform, searchTransform, commonifyWord } from './languageTransform.js';
import { Entry, historyEntries, historyLedger, addToHistoryEntry, render} from './index.js';
import { checkBox, checkBoxVal, inputLang, langInputBtn, langIndicator, currentLang, updateLang, getLangFromBox } from './languageEntities.js';
import { delBtnList, arrayRemoveEntry, deleteEntry, updateDelBtnList } from "./deleteFunctionalities.js";
import { wordCounter, decreaseCounter, increaseCounter } from './wordTracker.js';


const myContextMenu = {id: "search-opt",
title: "Search word on Wiktionary",
type: "normal",
contexts: ["selection"]
}
  
chrome.contextMenus.create(myContextMenu);

window.addEventListener("mouseup", function(clickData) {
    let selectedText = window.getSelection().toString();

    selectedText = searchTransform(selectedText);

    if (checkBoxVal === false && currentLang !== "German"){
      selectedText = commonifyWord(selectedText);
      }
  
    // update the context menu's title
    chrome.contextMenus.update("search-opt", { title: `Search "${selectedText}" on Wiktionary` });
  });



chrome.contextMenus.onClicked.addListener(function(clickData){
  if (clickData.menuItemId == "search-opt" && clickData.selectionText){

  let searchedWord = clickData.selectionText;



  let today = new Date();
  let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(); //saves date

  searchedWord = searchTransform(searchedWord);

  if (checkBoxVal === false && currentLang !== "German"){
    searchedWord = commonifyWord(searchedWord);
    }
  

  addToHistoryEntry(new Entry(searchedWord, date, wordCounter)); //constructor for entry, adds it to the list of all entries (global)
  

  render(historyEntries);
  updateDelBtnList();
  

  increaseCounter(); //adds one to the word counter
  //console.log(historyEntries);



  chrome.storage.local.set({wordCounter});
  
  window.open(`https://en.wiktionary.org/wiki/${searchedWord}#${currentLang}`, '_blank');


}
  })



    

