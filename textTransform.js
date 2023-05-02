// All the language transformation functions

function deleteSpaceInitial(text){
    let transformedText = text
    if (text[0] === " "){
      transformedText = text.substring(1, text.length);
      return deleteSpaceInitial(transformedText);
    }
    else
    {
    return text;
    }
  }
  
  
   function renderUpCase(text){
    
    //Uppercasing the first letter
    let i = 0;
    let transformedText = text[i].toUpperCase() + text.substring(i+1, text.length);
    ++i;
    
    //If an empty space prior to a letter, copies the substrings before and after the letter in question
    //then capitalises the letter and reinserts it between pre- and fore-strings
    for (; i < transformedText.length; ++i){
      if (transformedText[i-1] == " "){
        transformedText = transformedText.substring(0,i) + transformedText[i].toUpperCase() + transformedText.substring(i+1, transformedText.length);
      }
    }
    return transformedText;
  }

  
  
   function removeDoubleSpace(text){
    let i = 0
    let length = text.length
    let transformedText = text

    while (i < length){
      if ((transformedText[i-1] === " ") && (transformedText[i] === " ")){
        //truncates at i
        transformedText = transformedText.substring(0,i) + transformedText.substring(i+1, length);
        length = --length; //since we remove one letter
      }
      else{
        ++i; //only move forward if we don't remove a letter
      }
    }
    return transformedText;
  }
  
   //lowercases letters after the first letter of a word
   function normaliseCase(text){
    let transformedText = text;

    for (let i = 1; i < transformedText.length; ++i){
        //only applies if the letter isn't already in lowercase
        if (transformedText[i-1] !== " " && (transformedText[i].toLowerCase() !== transformedText[i])){
        transformedText = transformedText.substring(0,i) + transformedText[i].toLowerCase() + transformedText.substring(i+1, transformedText.length);
      }
    }
    return transformedText;
  }

//For the language-set bar
function langTransform(text){
    let transformedText = deleteSpaceInitial(text);
    transformedText = removeDoubleSpace(transformedText);
    transformedText = normaliseCase(transformedText);
    return transformedText;
  }
  
  //For the main search bar
function searchTransform(text){
    let transformedText = deleteSpaceInitial(text);
    transformedText = removeDoubleSpace(transformedText); 
    return transformedText;
  }
  
   
  function commonifyWord(text){
    let transformedText = text[0].toLowerCase() + text.substring(1, text.length);
    return transformedText;
  }

  export { deleteSpaceInitial, normaliseCase, removeDoubleSpace, renderUpCase, langTransform, searchTransform, commonifyWord };