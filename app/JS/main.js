import "../css/style.css";
import { chessPieces } from "./pieces.js";
import { chessPiecesImg } from "./pieces.js";

const DOMSelectors = {
  container: document.querySelector(".container"),
  board: document.querySelector(".middle70"),
  a: document.querySelector("#a"),
  b: document.querySelector("#b"),
  c: document.querySelector("#c"),
  d: document.querySelector("#d"),
  e: document.querySelector("#e"),
  f: document.querySelector("#f"),
  g: document.querySelector("#g"),
  h: document.querySelector("#h"),
};
function testinput() {
  chessPieces.forEach((element) => {
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<img src="${element.img}" alt="">`
    );
  });
}
testinput();

function resetboard() {
  // const wp = DOMSelectors.board.b.querySelectorAll(".square", ".square1");
  // wp.querySelector("#b1").insertAdjacentHTML(
  //   "beforeend",
  //   `<img src="${chessPiecesImg.whitep}" alt="">`
  // );

  a.querySelector("#a1").insertAdjacentHTML(
    "beforeend",
    `<img class="piece" src="${chessPiecesImg.whitep}" alt="paw">`
  );
}
resetboard();
