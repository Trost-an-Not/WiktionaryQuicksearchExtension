import { deleteSpaceInitial, renderUpCase, removeDoubleSpace, normaliseCase, langTransform, searchTransform, commonifyWord } from './textTransform.js';

export const checkBox = document.getElementById("properness-checkbox");

export let checkBoxVal = checkBox.checked;

chrome.storage.local.get(["checkBoxVal"], function(result) {
  if (result.checkBoxVal) {
    checkBox.checked = result.checkBoxVal;
    checkBoxVal = checkBox.checked;
  }
});

checkBox.addEventListener("click", function(){
  // console.log("Clicked")
  checkBox.checked = !checkBoxVal

  checkBoxVal = checkBox.checked
  // console.log(checkBoxVal)
  chrome.storage.local.set({checkBoxVal}); //everytime the status changes, it saves it onto localStorage
 }
)



//All input boxes

export const inputLang = document.getElementById("input-lang")
export const langInputBtn = document.getElementById("submit-lang-btn")
export const langIndicator = document.getElementById("lang-show")

export let currentLang = "";

chrome.storage.local.get(["currentLang"], function(result){
  if (result.currentLang && JSON.parse(result.currentLang) !== "\"\""){
  currentLang = JSON.parse(result.currentLang);
  updateLang(currentLang);
  }
})


export function updateLang(language){

 let langDisplay = `Current Language: ${language}`;
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

export function getLangFromBox(){
 if (!inputLang.value){
    return
 }
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

 chrome.storage.local.set({currentLang})
}
