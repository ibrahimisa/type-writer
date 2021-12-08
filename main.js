const words = ["Dev", "Learner", "Blah"];
let paper = document.getElementById("paper");
let cursor = document.getElementById("cursor");
let wordIndex = 0;
let letterIndex = 0;
let isTyping = true

function type(){
  let word = words[wordIndex]
  let typeSpeed = 500;

  if(isTyping){
    // if isTyping is true append next letter to dom
    paper.textContent += word[letterIndex]
    letterIndex++;

    // check if word has been typed
    if(paper.textContent === word){

      // if it is the last word then change wordIndex to first word
      // else increment wordIndex
      if(wordIndex === 2) wordIndex = 0;
      else wordIndex++;

      letterIndex = 0;  // reset letterIndex
      typeSpeed = 3000; // if last word increase waiting time
      isTyping = false;
    }

  } else { 
    // if isTyping is f alse remove last letter from dom
    paper.textContent = paper.textContent.slice(0, -1);
    typeSpeed /= 2; // decrease the waiting time to make it delete faster
    
    // check if has finished deleting
    if(paper.textContent === ''){
      isTyping = true;
      typeSpeed = 3000;
    }
  }


  // type/delete a letter and wait for typeSpeed(ms)
  setTimeout(type, typeSpeed)
}

function blinkCursor(){
    let visibility = cursor.style.visibility
    cursor.style.visibility = visibility == 'hidden' ? 'visible' : 'hidden'
}

window.addEventListener("DOMContentLoaded", () => {
    // start typing when document loads
    type()

    // start blinking cursor when dom loads
    setInterval(() => {
      blinkCursor();
    }, 300)
});