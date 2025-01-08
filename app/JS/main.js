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

function resetboard() {
  const wRook = DOMSelectors.z1.querySelectorAll("#x11, #x81");
  wRook.forEach((element, index) => {
    element.insertAdjacentHTML(
      "beforeend",
      `<img class="whitepiece" id="wr${index}" src="${chessPiecesImg.whiter}" draggable="true" alt="rook">`
    );
  });

  const wKnight = DOMSelectors.z1.querySelectorAll("#x21, #x71");
  wKnight.forEach((element, index) => {
    element.insertAdjacentHTML(
      "beforeend",
      `<img class="whitepiece" id="wk${index}" src="${chessPiecesImg.whitek}" draggable="true" alt="knight">`
    );
  });

  const wBishop = DOMSelectors.z1.querySelectorAll("#x31, #x61");
  wBishop.forEach((element, index) => {
    element.insertAdjacentHTML(
      "beforeend",
      `<img class="whitepiece" id="wb${index}" src="${chessPiecesImg.whiteb}" draggable="true" alt="bishop">`
    );
  });

  DOMSelectors.z1
    .querySelector("#x51")
    .insertAdjacentHTML(
      "beforeend",
      `<img class="whitepiece" id="wK" src="${chessPiecesImg.whiteK}" draggable="true" alt="king">`
    );
  DOMSelectors.z1
    .querySelector("#x41")
    .insertAdjacentHTML(
      "beforeend",
      `<img class="whitepiece" id="wq" src="${chessPiecesImg.whiteq}" draggable="true" alt="queen">`
    );

  const wPawn = DOMSelectors.z2.querySelectorAll(
    "#x12, #x22, #x32, #x42, #x52, #x62, #x72, #x82"
  );
  wPawn.forEach((element, index) => {
    element.insertAdjacentHTML(
      "beforeend",
      `<img class="whitepiece" id="wp${index}" src="${chessPiecesImg.whitep}" draggable="true" alt="pawn">`
    );
  });

  const bRook = DOMSelectors.z8.querySelectorAll("#x18, #x88");
  bRook.forEach((element, index) => {
    element.insertAdjacentHTML(
      "beforeend",
      `<img class="piece" id="br${index}" src="${chessPiecesImg.blackr}" draggable="true" alt="rook">`
    );
  });

  const bKnight = DOMSelectors.z8.querySelectorAll("#x28, #x78");
  bKnight.forEach((element, index) => {
    element.insertAdjacentHTML(
      "beforeend",
      `<img class="piece" id="bk${index}" src="${chessPiecesImg.blackk}" draggable="true" alt="knight">`
    );
  });

  const bBishop = DOMSelectors.z8.querySelectorAll("#x38, #x68");
  bBishop.forEach((element, index) => {
    element.insertAdjacentHTML(
      "beforeend",
      `<img class="piece" id="bb${index}" src="${chessPiecesImg.blackb}" draggable="true" alt="bishop">`
    );
  });

  DOMSelectors.z8
    .querySelector("#x58")
    .insertAdjacentHTML(
      "beforeend",
      `<img class="piece" id="bK" src="${chessPiecesImg.blackK}" draggable="true" alt="king">`
    );
  DOMSelectors.z8
    .querySelector("#x48")
    .insertAdjacentHTML(
      "beforeend",
      `<img class="piece" id="bq" src="${chessPiecesImg.blackq}" draggable="true" alt="queen">`
    );

  const bPawn = DOMSelectors.z7.querySelectorAll(
    "#x17, #x27, #x37, #x47, #x57, #x67, #x77, #x87"
  );
  bPawn.forEach((element, index) => {
    element.insertAdjacentHTML(
      "beforeend",
      `<img class="piece" id="bp${index}" src="${chessPiecesImg.blackp}" draggable="true" alt="pawn">`
    );
  });

  function clear() {
    const allsquares = DOMSelectors.board.querySelectorAll("#square, #square1");
    allsquares.forEach((element) => {
      element.innerHTML = "";
    });
  }
  clear();
}
resetboard();

// moving squares -------------------------------------------------------------------------------

const piece = document.querySelectorAll(".piece, .whitepiece");
const squares = document.querySelectorAll(".square, .square1");

piece.forEach((element) => {
  element.addEventListener("dragstart", drag);
});

let originalsquare = null;

function drag(event) {
  originalsquare = event.target.parentElement.id;
  event.dataTransfer.setData("text", event.target.id);
}

squares.forEach((element) => {
  element.addEventListener("dragover", dragover);
  element.addEventListener("drop", drop);
});

function dragover(event) {
  event.preventDefault();
}

let turn = 0;
let legalmoves = [];
function drop(event) {
  event.preventDefault();
  const piece = document.getElementById(event.dataTransfer.getData("text"));
  const target = event.currentTarget;

  function piecelogic() {
    console.log(turn + 1);
    console.log("from", target.id);
    console.log("to", originalsquare);
    target.innerHTML = "";
    target.appendChild(piece);
    turn++;
  }
  //after computing legal moves delete target.id and move it out of drop()

  wpawn(target.id, originalsquare);

  if (turn % 2 === 0) {
    if (piece.className === "whitepiece") {
      if (target.id !== originalsquare) {
        const squarechild = target.firstElementChild;
        if (!squarechild || !squarechild.classList.contains("whitepiece")) {
          const captured = Array.from(target.children);
          piecelogic();
          if (squarechild) {
            if (squarechild.classList.contains("piece")) {
              console.log(captured, "black piece captured");
            }
          }
        } else {
          console.log(target.id, "contains same piece color");
        }

        legalmoves.length = 0;
      } else {
        console.log("cannot move to same square");
      }
    }
  } else if (turn % 2 != 0) {
    if (piece.className === "piece") {
      if (target.id !== originalsquare) {
        const squarechild = target.firstElementChild;
        if (!squarechild || !squarechild.classList.contains("piece")) {
          const captured = Array.from(target.children);
          piecelogic();

          if (squarechild) {
            if (squarechild.classList.contains("whitepiece")) {
              console.log(captured, "white piece captured");
            }
          }
        } else {
          console.log(target.id, "contains same piece color");
        }
      } else {
        console.log("cannot move to same square");
      }
    }
  }
}

// -------Legal Move Computation

function wpawn(target, original) {
  const rank = parseInt(original.charAt(1));
  const file = parseInt(original.charAt(2));
  console.log(rank, file);
  legal(rank, file);
  function legal(r, f) {
    const moves = [
      { r: r + 1, f: f },
      { r: r + 2, f: f },
      { r: r + 1, f: f - 1 },
      { r: r + 1, f: f + 1 },
    ];
    moves.forEach(({ r, f }) => {
      const newid = `x${r}${f}`;
      legalmoves.push(newid);
    });
  }
}
