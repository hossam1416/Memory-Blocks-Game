// timer
let timerElement = document.querySelector(".timer span");
let timer;
let seconds = 0;
document.querySelector(".control-buttons span").onclick = function () {
  let yourName = document.getElementById("nameInput").value.trim();
  if (yourName === "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
  timer = setInterval(() => {
    seconds++;
    timerElement.innerHTML = seconds;
  }, 1000);
  blocks.forEach((block) => {
    block.classList.add("is-flipped");
  });
  setTimeout(() => {
    blocks.forEach((block) => {
      block.classList.remove("is-flipped");
    });
  }, duration);
};
// effect duration
let duration = 1000;
// select block container
let blockContainer = document.querySelector(".memory-game-blocks");
// create array from game blocks
let blocks = Array.from(blockContainer.children);
// create range of keys two method
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

// console.log(orderRange);
shuffle(orderRange);

// add order css property to game blocks
blocks.forEach((block, index) => {
  // add css order property
  block.style.order = orderRange[index];

  // add click event
  block.addEventListener("click", function () {
    // trigger the flip block function
    flipBlock(block);
  });
});
// flip block function
function flipBlock(selectedBlock) {
  // add class is-flipped
  selectedBlock.classList.add("is-flipped");
  //   collect all flipped cards
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped"),
  );
  //   if there two selected blocks
  if (allFlippedBlocks.length === 2) {
    // stop clicking function
    stopClicking();
    // check matched blocked
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
// stop clicking function
function stopClicking() {
  // add class no clicking on main container
  blockContainer.classList.add("no-clicking");
  setTimeout(() => {
    // remove class no clicking after duration
    blockContainer.classList.remove("no-clicking");
  }, duration);
}
// check matched block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    let failSound = document.getElementById("success");
    failSound.volume = 0.2;
    failSound.play();
    let isFinished = blocks.every((block) => {
      return block.classList.contains("has-match");
    });
    let tries = parseInt(triesElement.innerHTML);
    let level;
    if (isFinished) {
      if (tries >= 0 && tries <= 5) {
        level = "Excellent ";
      } else if (tries > 5 && tries <= 11) {
        level = "Good ";
      } else {
        level = "Bad ";
      }
      let playerName = document.querySelector(".name span").innerHTML;
      let overLay = document.createElement("div");
      overLay.classList.add("popup-overlay");
      document.body.appendChild(overLay);
      let div = document.createElement("div");
      div.classList.add("popup-win");
      div.innerHTML = `
    Well Done, ${playerName}!<br>
    <span>Wrong Tries : <strong>${tries}</strong></span><br>
    <span>Level : <strong>${level}</strong></span><br>
    <button onclick="location.reload()">Play Again</button><br>
    <span>Time : <strong>${seconds}s</strong></span>
  `;
      clearInterval(timer);
      document.body.appendChild(div);
    }
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    let newTries = parseInt(triesElement.innerHTML);
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    let failSound = document.getElementById("fail");
    failSound.volume = 0.2;
    failSound.play();
    if (newTries === 12) {
      let playerName = document.querySelector(".name span").innerHTML;
      let overLay = document.createElement("div");
      overLay.classList.add("popup-overlay");
      document.body.appendChild(overLay);
      let div = document.createElement("div");
      div.classList.add("popup-win");
      div.innerHTML = `
  Game Over, ${playerName}!<br>
  <span>Wrong Tries : <strong>${newTries}</strong></span><br>
  <button onclick="location.reload()">Try Again</button><br>
  <span>Time : <strong>${seconds}s</strong></span>
`;
      clearInterval(timer);

      document.body.appendChild(div);
    }
  }
}
// shuffle function
function shuffle(array) {
  // setting vars
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    // get random number
    random = Math.floor(Math.random() * current);
    // decrease length by one
    current--;
    // [1] save current element in stash
    temp = array[current];
    // [2] current element = random element
    array[current] = array[random];
    // [3] random element = get element from stash
    array[random] = temp;
  }
  return array;
}
