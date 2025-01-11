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

let legalmoves = [];

let historyoriginal = [];
let historytarget = [];

let test = 0;

let turn = 0;

function drag(event) {
  originalsquare = event.target.parentElement.id;
  event.dataTransfer.setData("text", event.target.id);

  legalmoves = [];

  const target = event.currentTarget;
  if (event.target.classList.contains("whitepiece")) {
    wpawn(target.id, originalsquare, test);
    console.log("Turn:", turn + 1);
    console.log("Legal moves:", legalmoves);
  } else if (event.target.classList.contains("piece")) {
    bpawn(target.id, originalsquare, test);
    console.log("Turn:", turn + 1);
    console.log("Legal moves:", legalmoves);
  }
}

squares.forEach((element) => {
  element.addEventListener("dragover", dragover);
  element.addEventListener("drop", drop);
});

function dragover(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const piece = document.getElementById(event.dataTransfer.getData("text"));
  const target = event.currentTarget;

  function piecelogic() {
    console.log("From", originalsquare, "to", target.id);
    target.innerHTML = "";
    target.appendChild(piece);
    turn++;
    historyoriginal.push(originalsquare);
    historytarget.push(target.id);
  }
  //after computing legal moves delete target.id and move it out of drop()

  if (turn % 2 === 0) {
    if (piece.className === "whitepiece") {
      if (target.id !== originalsquare) {
        wpawn(target.id, originalsquare);
        //legal moves
        if (legalmoves.includes(`#${target.id}`)) {
          const squarechild = target.firstElementChild;
          if (!squarechild || !squarechild.classList.contains("whitepiece")) {
            //detecting captures in console (not needed)----------------------------
            const captured = Array.from(target.children); //
            if (squarechild) {
              if (squarechild.classList.contains("piece")) {
                console.log(captured, "black piece captured");
              }
            }
            //---------------------------------
            piecelogic();
          } else {
            console.log(target.id, "contains same piece color");
          }
        }
      } else {
        console.log("cannot move to same square");
      }
    }
  } else if (turn % 2 != 0) {
    if (piece.className === "piece") {
      if (target.id !== originalsquare) {
        bpawn(target.id, originalsquare);
        if (legalmoves.includes(`#${target.id}`)) {
          const squarechild = target.firstElementChild;
          if (!squarechild || !squarechild.classList.contains("piece")) {
            //detecting captures in console (not needed)----------------------------
            const captured = Array.from(target.children); //
            if (squarechild) {
              if (squarechild.classList.contains("piece")) {
                console.log(captured, "black piece captured");
              }
            }
            //---------------------------------
            piecelogic();
          } else {
            console.log(target.id, "contains same piece color");
          }
        }
      } else {
        console.log("cannot move to same square");
      }
    }
  }
}

// -------Legal Move Computation

//WHITE PAWN

function wpawn(target, original, test) {
  legalmoves = [];
  let xvalue = 0;
  if (historyoriginal.length > 0 && historytarget.length > 0) {
    const previousOriginal = historyoriginal[historyoriginal.length - 1];
    const previousTarget = historytarget[historytarget.length - 1];

    if (
      previousOriginal &&
      previousOriginal.length > 2 &&
      previousTarget &&
      previousTarget.length > 2
    ) {
      xvalue = parseInt(previousOriginal.charAt(1));
      const pfo = parseInt(previousOriginal.charAt(2));
      const pft = parseInt(previousTarget.charAt(2));

      test = pfo - pft;
    }
  }

  const x = parseInt(original.charAt(1));
  const y = parseInt(original.charAt(2));

  const move1 = [{ x: x, y: y + 1 }];
  const move2 = [{ x: x, y: y + 2 }];
  const captures = [
    { x: x + 1, y: y + 1 },
    { x: x - 1, y: y + 1 },
  ];

  move1.forEach(({ x, y }) => {
    const newid = `#x${x}${y}`;
    let cap = document.querySelector(newid);
    if (cap && !cap.firstElementChild) {
      legalmoves.push(newid);
    }
  });
  if (y < 3 && !document.querySelector(`#x${x}${y + 1}`).firstElementChild) {
    move2.forEach(({ x, y }) => {
      const newid = `#x${x}${y}`;
      let cap = document.querySelector(newid);
      if (cap && !cap.firstElementChild) {
        legalmoves.push(newid);
      }
    });
  }

  captures.forEach(({ x, y }) => {
    const newid1 = `#x${x}${y}`;
    let cap = document.querySelector(newid1);
    if (cap && cap.firstElementChild) {
      legalmoves.push(newid1);
    }
  });

  if (y === 5 && test === 2) {
    if (document.querySelector(`#x${x - 1}${y}`) && x - 1 === xvalue) {
      const adjacent = `#x${x - 1}${y}`;
      const adjacentPiece = document.querySelector(adjacent);
      if (adjacentPiece && adjacentPiece.firstElementChild) {
        legalmoves.push(`#x${x - 1}${y + 1}`);
        if (target && legalmoves.includes(`#${target}`)) {
          adjacentPiece.innerHTML = "";
        }
      }
    }
    if (document.querySelector(`#x${x + 1}${y}`) && x + 1 === xvalue) {
      const adjacent = `#x${x + 1}${y}`;
      const adjacentPiece = document.querySelector(adjacent);
      if (adjacentPiece && adjacentPiece.firstElementChild) {
        legalmoves.push(`#x${x + 1}${y + 1}`);
        if (target && legalmoves.includes(`#${target}`)) {
          adjacentPiece.innerHTML = "";
        }
      }
    }
  }
}
//BLACK PAWN
function bpawn(target, original, test) {
  legalmoves = [];
  let xvalue = 0;
  if (historyoriginal.length > 0 && historytarget.length > 0) {
    const previousOriginal = historyoriginal[historyoriginal.length - 1];
    const previousTarget = historytarget[historytarget.length - 1];

    if (
      previousOriginal &&
      previousOriginal.length > 2 &&
      previousTarget &&
      previousTarget.length > 2
    ) {
      xvalue = parseInt(previousOriginal.charAt(1));
      const pfo = parseInt(previousOriginal.charAt(2)); // Access the correct index
      const pft = parseInt(previousTarget.charAt(2)); // Access the correct index

      test = pfo - pft;
    }
  }

  const x = parseInt(original.charAt(1));
  const y = parseInt(original.charAt(2));

  const move1 = [{ x: x, y: y - 1 }];
  const move2 = [{ x: x, y: y - 2 }];
  const captures = [
    { x: x + 1, y: y - 1 },
    { x: x - 1, y: y - 1 },
  ];

  move1.forEach(({ x, y }) => {
    const newid = `#x${x}${y}`;
    let cap = document.querySelector(newid);
    if (cap && !cap.firstElementChild) {
      legalmoves.push(newid);
    }
  });

  if (y > 6 && !document.querySelector(`#x${x}${y - 1}`).firstElementChild) {
    move2.forEach(({ x, y }) => {
      const newid = `#x${x}${y}`;
      let cap = document.querySelector(newid);
      if (cap && !cap.firstElementChild) {
        legalmoves.push(newid);
      }
    });
  }

  captures.forEach(({ x, y }) => {
    const newid1 = `#x${x}${y}`;
    let cap = document.querySelector(newid1);
    if (cap && cap.firstElementChild) {
      legalmoves.push(newid1);
    }
  });

  if (y === 4 && test === -2) {
    if (document.querySelector(`#x${x - 1}${y}`) && x - 1 === xvalue) {
      const adjacent = `#x${x - 1}${y}`;
      const adjacentPiece = document.querySelector(adjacent);
      if (adjacentPiece && adjacentPiece.firstElementChild) {
        legalmoves.push(`#x${x - 1}${y - 1}`);
        if (target && legalmoves.includes(`#${target}`)) {
          adjacentPiece.innerHTML = "";
        }
      }
    }
    if (document.querySelector(`#x${x + 1}${y}`) && x + 1 === xvalue) {
      const adjacent = `#x${x + 1}${y}`;
      const adjacentPiece = document.querySelector(adjacent);
      if (adjacentPiece && adjacentPiece.firstElementChild) {
        legalmoves.push(`#x${x + 1}${y - 1}`);
        if (target && legalmoves.includes(`#${target}`)) {
          adjacentPiece.innerHTML = "";
        }
      }
    }
  }
}
