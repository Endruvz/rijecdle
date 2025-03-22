import "./style.css"

document.querySelector("#app").innerHTML = 
`
<h1>Rijecdle</h1>
<h2 id="answer"></h2>

<div class="word-input" id="d1">
  <h1 id="11" class="letter-box"></h1>
  <h1 id="12" class="letter-box"></h1>
  <h1 id="13" class="letter-box"></h1>
  <h1 id="14" class="letter-box"></h1>
  <h1 id="15" class="letter-box"></h1>
</div>
<div class="word-input" id="d2">
  <h1 id="21" class="letter-box"></h1>
  <h1 id="22" class="letter-box"></h1>
  <h1 id="23" class="letter-box"></h1>
  <h1 id="24" class="letter-box"></h1>
  <h1 id="25" class="letter-box"></h1>
</div>
<div class="word-input" id="d3">
  <h1 id="31" class="letter-box"></h1>
  <h1 id="32" class="letter-box"></h1>
  <h1 id="33" class="letter-box"></h1>
  <h1 id="34" class="letter-box"></h1>
  <h1 id="35" class="letter-box"></h1>
</div>
<div class="word-input" id="d4">
  <h1 id="41" class="letter-box"></h1>
  <h1 id="42" class="letter-box"></h1>
  <h1 id="43" class="letter-box"></h1>
  <h1 id="44" class="letter-box"></h1>
  <h1 id="45" class="letter-box"></h1>
</div>
<div class="word-input" id="d5">
  <h1 id="51" class="letter-box"></h1>
  <h1 id="52" class="letter-box"></h1>
  <h1 id="53" class="letter-box"></h1>
  <h1 id="54" class="letter-box"></h1>
  <h1 id="55" class="letter-box"></h1>
</div>
<div class="word-input" id="d6">
  <h1 id="61" class="letter-box"></h1>
  <h1 id="62" class="letter-box"></h1>
  <h1 id="63" class="letter-box"></h1>
  <h1 id="64" class="letter-box"></h1>
  <h1 id="65" class="letter-box"></h1>
</div>

<button id="restart" style="display: none;">Restart</button>

<div id="keyboard">
  <div class="keyboard-row">
    <h1 class="letter-box-key" id="keyQ">Q</h1>
    <h1 class="letter-box-key" id="keyW">W</h1>
    <h1 class="letter-box-key" id="keyE">E</h1>
    <h1 class="letter-box-key" id="keyR">R</h1>
    <h1 class="letter-box-key" id="keyT">T</h1>
    <h1 class="letter-box-key" id="keyY">Y</h1>
    <h1 class="letter-box-key" id="keyU">U</h1>
    <h1 class="letter-box-key" id="keyI">I</h1>
    <h1 class="letter-box-key" id="keyO">O</h1>
    <h1 class="letter-box-key" id="keyP">P</h1>
  </div>
  <div class="keyboard-row">
    <h1 class="letter-box-key" id="keyA">A</h1>
    <h1 class="letter-box-key" id="keyS">S</h1>
    <h1 class="letter-box-key" id="keyD">D</h1>
    <h1 class="letter-box-key" id="keyF">F</h1>
    <h1 class="letter-box-key" id="keyG">G</h1>
    <h1 class="letter-box-key" id="keyH">H</h1>
    <h1 class="letter-box-key" id="keyJ">J</h1>
    <h1 class="letter-box-key" id="keyK">K</h1>
    <h1 class="letter-box-key" id="keyL">L</h1>
  </div>
  <div class="keyboard-row">
    <h1 class="letter-box-key" id="keyZ">Z</h1>
    <h1 class="letter-box-key" id="keyX">X</h1>
    <h1 class="letter-box-key" id="keyC">C</h1>
    <h1 class="letter-box-key" id="keyV">V</h1>
    <h1 class="letter-box-key" id="keyB">B</h1>
    <h1 class="letter-box-key" id="keyN">N</h1>
    <h1 class="letter-box-key" id="keyM">M</h1>
  </div>
</div>
`


const words = ["APPLE", "SIGMA", "GREEN", "DATES", "ELDER",
  "BRAVE", "CHAIR", "DANCE", "EAGLE", "FLAME", "GRAPE", "HAPPY", "IMAGE", "JOLLY",
  "KNIFE", "LEMON", "MUSIC", "NEVER", "OCEAN", "PARTY", "QUEEN", "RIVER", "SUNNY", "TABLE",
  "UNDER", "VIVID", "WATER", "ZEBRA", "ANGRY", "BREAD", "CLOUD", "DREAM", "EARTH", "FROST",
  "GREEN", "HOTEL", "JUICE", "KITTY", "LAUGH", "NOBLE", "OASIS", "PIANO", "QUIET", "ROYAL",
  "SUGAR", "TIGER", "URBAN", "VOCAL", "WHALE", "XENON", "YOUTH", "ZESTY", "AMBER", "BLAZE",
  "CRISP", "DROWN", "EAGER", "FAINT", "GLORY", "HASTE", "ICILY", "KNEEL", "LATCH",
  "MIRTH", "NICHE", "PRIDE", "QUILT", "RISKY", "SCOUT", "TIDAL", "VOWEL",
  "YACHT", "ACORN", "BISON", "CANDY", "DANDY", "ETHIC", "FLORA", "GIDDY",
  "HONOR", "JUMPS", "KOALA", "LUNAR", "MANGO", "PLAZA", "QUILL",
  "RAVEN", "SWOOP", "TWIST", "VAGUE", "WITTY", "BRISK"
];
const targetWord = words[Math.floor(Math.random() * words.length)];
console.log(targetWord)

let currentRow = 1;
let currentBox = 1;
let gameOver = false;
const guessedLetters = {};

document.addEventListener("keydown", function(event) {
  if (gameOver && event.key == "Enter") {
    location.reload();
  } else if (event.key == "Enter") {
    if (currentBox == 6) {
      let guessedWord = "";
      for (let i = 1; i <= 5; i++) {
        guessedWord += document.getElementById(currentRow.toString() + i.toString()).innerText;
      }
      let correctGuess = true;
      const targetLetterCount = {};
      const letterBoxes = [];

      for (const letter of targetWord) {
        targetLetterCount[letter] = (targetLetterCount[letter] || 0) + 1;
      }

      for (let i = 0; i < 5; i++) {
        let letter = guessedWord[i];
        let letterBox = document.getElementById(currentRow.toString() + (i + 1).toString());
        letterBoxes.push({ letter, letterBox, index: i });
      }

      letterBoxes.forEach(({ letter, letterBox, index }) => {
        if (letter === targetWord[index]) {
          letterBox.style.backgroundColor = "rgb(108,169,101)";
          letterBox.style.borderColor = "rgb(108,169,101)";
          updateKeyboard(letter, "rgb(108,169,101)");
          targetLetterCount[letter]--;
        }
      });

      letterBoxes.forEach(({ letter, letterBox, index }) => {
        const key = document.getElementById(`key${letter}`);

        if (letter !== targetWord[index]) {
          if (targetLetterCount[letter] > 0) {
            letterBox.style.backgroundColor = "rgb(200,182,83)"; 
            letterBox.style.borderColor = "rgb(200,182,83)";

            if (key.style.backgroundColor !== "rgb(108,169,101)") {
              updateKeyboard(letter, "rgb(200,182,83)");
            }
            
            targetLetterCount[letter]--;
            correctGuess = false;
          } else {
            letterBox.style.backgroundColor = "rgb(120,124,127)"; 
            letterBox.style.borderColor = "rgb(120,124,127)";

            if (key.style.backgroundColor !== "rgb(108,169,101)" && key.style.backgroundColor !== "rgb(200,182,83)") {
              updateKeyboard(letter, "rgb(73, 75, 76)");
            }

            correctGuess = false;
          }
        }
      });

      if (correctGuess) {
        document.querySelector("h1").innerText = "You Win!";
        document.getElementById("restart").style.display = "block";
        gameOver = true;
      } else {
        currentRow++;
        currentBox = 1;
        if (currentRow > 6) {
          document.querySelector("h1").innerText = "Better luck next time!";
          document.getElementById("restart").style.display = "block";
          document.querySelector("#answer").innerText = `Correct word was: ${targetWord}`;
          gameOver = true;
        }
      }
    }
  } else if (event.key === "Backspace") {
    if (currentBox > 1) {
      currentBox--;
      document.getElementById(currentRow.toString() + currentBox.toString()).innerText = "";
    }
  } else if (/^[a-zA-Z]$/.test(event.key)) { 
    if (currentBox <= 5) {
      document.getElementById(currentRow.toString() + currentBox.toString()).innerText = event.key.toUpperCase();
      currentBox++;
    }
  }
});


document.getElementById("restart").addEventListener("click", function() {
  location.reload();
});

function updateKeyboard(letter, color) {
  const key = document.getElementById(`key${letter}`);
  if (key) {
    const currentColor = key.style.backgroundColor;
    
    if (
      (color === "rgb(108,169,101)" && currentColor !== "rgb(108, 169, 101)") || 
      (color === "rgb(200,182,83)" && currentColor !== "rgb(108, 169, 101)") ||
      (color === "rgb(73, 75, 76)" && currentColor === "") 
    ) {
      key.style.backgroundColor = color;
      key.style.borderColor = color;
    }
  }
}