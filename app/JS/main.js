import "../css/style.css";
import { chessPieces } from "./pieces.js";
import { chessPiecesImg } from "./pieces.js";

const DOMSelectors = {
  container: document.querySelector(".container"),
  board: document.querySelector(".middle70"),
  z1: document.querySelector("#z1"),
  z2: document.querySelector("#z2"),
  z3: document.querySelector("#z3"),
  z4: document.querySelector("#z4"),
  z5: document.querySelector("#z5"),
  z6: document.querySelector("#z6"),
  z7: document.querySelector("#z7"),
  z8: document.querySelector("#z8"),
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
  const wRook = z1.querySelectorAll("#a1, #h1");
  wRook.forEach((element) => {
    element.innerHTML = "";
    element.insertAdjacentHTML(
      "beforeend",
      `<img class="piece" src="${chessPiecesImg.whiter}" alt="paw">`
    );
  });

  const wKnight = z1.querySelectorAll("#b1, #g1");
  wKnight.forEach((element) => {
    element.innerHTML = "";
    element.insertAdjacentHTML(
      "beforeend",
      `<img class="piece" src="${chessPiecesImg.whitek}" alt="paw">`
    );
  });

  const wBishop = z1.querySelectorAll("#c1, #f1");
  wBishop.forEach((element) => {
    element.innerHTML = "";
    element.insertAdjacentHTML(
      "beforeend",
      `<img class="piece" src="${chessPiecesImg.whiteb}" alt="paw">`
    );
  });

  z1.querySelector("#d1").insertAdjacentHTML(
    "beforeend",
    `<img class="piece" src="${chessPiecesImg.whiteK}" alt="paw">`
  );
  z1.querySelector("#e1").insertAdjacentHTML(
    "beforeend",
    `<img class="piece" src="${chessPiecesImg.whiteq}" alt="paw">`
  );

  const wPawn = z2.querySelectorAll("#a2, #b2, #c2, #d2, #e2, #f2, #g2, #h2");
  wPawn.forEach((element) => {
    element.innerHTML = "";
    element.insertAdjacentHTML(
      "beforeend",
      `<img class="piece" src="${chessPiecesImg.whitep}" alt="paw">`
    );
  });

  const bRook = z8.querySelectorAll("#a8, #h8");
  bRook.forEach((element) => {
    element.innerHTML = "";
    element.insertAdjacentHTML(
      "beforeend",
      `<img class="piece" src="${chessPiecesImg.blackr}" alt="paw">`
    );
  });

  const bKnight = z8.querySelectorAll("#b8, #g8");
  bKnight.forEach((element) => {
    element.innerHTML = "";
    element.insertAdjacentHTML(
      "beforeend",
      `<img class="piece" src="${chessPiecesImg.blackk}" alt="paw">`
    );
  });

  const bBishop = z8.querySelectorAll("#c8, #f8");
  bBishop.forEach((element) => {
    element.innerHTML = "";
    element.insertAdjacentHTML(
      "beforeend",
      `<img class="piece" src="${chessPiecesImg.blackb}" alt="paw">`
    );
  });

  z8.querySelector("#d8").insertAdjacentHTML(
    "beforeend",
    `<img class="piece" src="${chessPiecesImg.blackK}" alt="paw">`
  );
  z8.querySelector("#e8").insertAdjacentHTML(
    "beforeend",
    `<img class="piece" src="${chessPiecesImg.blackq}" alt="paw">`
  );

  const bPawn = z7.querySelectorAll("#a7, #b7, #c7, #d7, #e7, #f7, #g7, #h7");
  bPawn.forEach((element) => {
    element.innerHTML = "";
    element.insertAdjacentHTML(
      "beforeend",
      `<img class="piece" src="${chessPiecesImg.blackp}" alt="paw">`
    );
  });
}

resetboard();

//tests

// function resetboard() {
//   // const wp = DOMSelectors.board.b.querySelectorAll(".square", ".square1");
//   // wp.querySelector("#b1").insertAdjacentHTML(
//   //   "beforeend",
//   //   `<img src="${chessPiecesImg.whitep}" alt="">`
//   // );

//   // z1.querySelector("#b1", "#g1").insertAdjacentHTML(
//   //   "beforeend",
//   //   `<img class="piece" src="${chessPiecesImg.whitek}" alt="paw">`
//   // );

//   // Assuming z1 is a parent element and you want to modify #b1 and #g1

//   // const elements = z1.querySelectorAll("#b1, #g1"); // Select both #b1 and #g1
//   // elements.forEach((element) => {
//   //   element.insertAdjacentHTML(
//   //     "beforeend",
//   //     `<img class="piece" src="${chessPiecesImg.whitek}" alt="pawn">`
//   //   );
//   // });
// }
