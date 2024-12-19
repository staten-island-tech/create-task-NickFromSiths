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
  // const wp = DOMSelectors.board.b.querySelectorAll(".square", ".square1");
  // wp.querySelector("#b1").insertAdjacentHTML(
  //   "beforeend",
  //   `<img src="${chessPiecesImg.whitep}" alt="">`
  // );

  z1.querySelector("#b1").insertAdjacentHTML(
    "beforeend",
    `<img class="piece" src="${chessPiecesImg.whitek}" alt="paw">`
  );
  z1.querySelector("#b1").insertAdjacentHTML(
    "beforeend",
    `<img class="piece" src="${chessPiecesImg.whitek}" alt="paw">`
  );
  z1.querySelector("#b1").insertAdjacentHTML(
    "beforeend",
    `<img class="piece" src="${chessPiecesImg.whitek}" alt="paw">`
  );
  z1.querySelector("#b1").insertAdjacentHTML(
    "beforeend",
    `<img class="piece" src="${chessPiecesImg.whitek}" alt="paw">`
  );
  z1.querySelector("#b1").insertAdjacentHTML(
    "beforeend",
    `<img class="piece" src="${chessPiecesImg.whitek}" alt="paw">`
  );
  z1.querySelector("#b1").insertAdjacentHTML(
    "beforeend",
    `<img class="piece" src="${chessPiecesImg.whitek}" alt="paw">`
  );
  z1.querySelector("#b1").insertAdjacentHTML(
    "beforeend",
    `<img class="piece" src="${chessPiecesImg.whitek}" alt="paw">`
  );
}
resetboard();
