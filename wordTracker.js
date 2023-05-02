//Wordcounter Save
console.log("Start")

export let wordCounter = 0

chrome.storage.local.get(["wordCounter"], function(result){
    if (result.wordCounter){
    wordCounter = result.wordCounter;
    }
  })

  
export function increaseCounter(){
    ++wordCounter
}

export function decreaseCounter(){
    --wordCounter
}