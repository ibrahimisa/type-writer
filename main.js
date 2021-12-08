const paper = document.querySelector('.paper');
const words = JSON.parse(paper.dataset.words);
let waitTime = parseInt(paper.dataset.wait, 10);
const speed = parseInt(paper.dataset.typeSpeed, 10);
const cursor = paper.dataset.cursor;

let wordIndex = 0;
let letterIndex = 0;
let isTyping = true;

// append cursor to the end of text
let cursorSpan = document.createElement('span')
cursorSpan.textContent = cursor;
paper.parentElement.appendChild(cursorSpan)

function type(){
  let word = words[wordIndex]
  let typeSpeed = speed;

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
      typeSpeed = waitTime; // if last word increase waiting time
      isTyping = false;
    }

  } else { 
    // if isTyping is f alse remove last letter from dom
    paper.textContent = paper.textContent.slice(0, -1);
    typeSpeed /= 2; // decrease the waiting time to make it delete faster
    
    // check if has finished deleting (when it reaches the end)
    if(paper.textContent === ''){
      isTyping = true;
      typeSpeed = waitTime;
    }
  }


  // type/delete a letter and wait for typeSpeed(ms)
  setTimeout(type, typeSpeed)
}

function blinkCursor(){
    let visibility = cursorSpan.style.visibility
    cursorSpan.style.visibility = visibility == 'hidden' ? 'visible' : 'hidden'
}

window.addEventListener("DOMContentLoaded", () => {
    // start typing when document loads
    type()

    // start blinking cursor when dom loads
    setInterval(() => {
      blinkCursor();
    }, 300)
});