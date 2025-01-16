import "../css/style.css";
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

const piece = document.querySelectorAll(".piece, .whitepiece");
const squares = document.querySelectorAll(".square, .square1");

piece.forEach((element) => {
  element.addEventListener("dragstart", drag);
});

let originalsquare = null;
let originalpiece = null;

let legalmoves = [];
let historyoriginal = [];
let historytarget = [];

let wmovedking = false;
let bmovedking = false;

let test = 0;

let turn = 0;

function drag(event) {
  originalsquare = event.target.parentElement.id;
  event.dataTransfer.setData("text", event.target.id);
  originalpiece = event.target.parentElement;
  legalmoves = [];
  console.log(event.target, "why");
  const target = event.currentTarget;
  const pieceid = event.target.parentElement.firstElementChild.id;
  const secondletter = pieceid.charAt(1);

  if (event.target.classList.contains("whitepiece") && secondletter === "p") {
    wpawn(target.id, originalsquare, test);
    console.log("Turn:", turn + 1);
    console.log("Legal moves:", legalmoves);
  } else if (event.target.classList.contains("piece") && secondletter === "p") {
    bpawn(target.id, originalsquare, test);
    console.log("Turn:", turn + 1);
    console.log("Legal moves:", legalmoves);
  }
  if (secondletter === "k") {
    knight(target.id, originalsquare, pieceid);
    console.log("Turn:", turn + 1);
    console.log("Legal moves:", legalmoves);
  }
  if (secondletter === "b") {
    bishop(target.id, originalsquare, pieceid);
    console.log("Turn:", turn + 1);
    console.log("Legal moves:", legalmoves);
  }
  if (secondletter === "r") {
    rook(target.id, originalsquare, pieceid);
    console.log("Turn:", turn + 1);
    console.log("Legal moves:", legalmoves);
  }
  if (secondletter === "q") {
    queen(target.id, originalsquare, pieceid);
    console.log("Turn:", turn + 1);
    console.log("Legal moves:", legalmoves);
  }
  if (secondletter === "K") {
    king(target.id, originalsquare, pieceid);
    castle(target.id, originalsquare, pieceid);
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

  if (turn % 2 === 0) {
    if (piece.className === "whitepiece") {
      if (target.id !== originalsquare) {
        const pieceid = originalpiece.firstElementChild;
        const secondletter = pieceid.id.charAt(1);
        if (pieceid.classList.contains("whitepiece") && secondletter === "p") {
          wpawn(target.id, originalsquare);
        }
        if (pieceid.classList.contains("whitepiece") && secondletter === "K") {
          castle(target.id, originalsquare, pieceid.id);
        }
        if (legalmoves.includes(`#${target.id}`)) {
          if (originalpiece.firstElementChild.id.charAt(1) === "K") {
            wmovedking = true;
          }
          const squarechild = target.firstElementChild;
          if (!squarechild || !squarechild.classList.contains("whitepiece")) {
            const captured = Array.from(target.children); //
            if (squarechild) {
              if (squarechild.classList.contains("piece")) {
                console.log(captured, "Black Piece Captured");
              }
            }
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
        const pieceid = originalpiece.firstElementChild;
        const secondletter = pieceid.id.charAt(1);
        if (pieceid.classList.contains("piece") && secondletter === "p") {
          bpawn(target.id, originalsquare);
        }
        if (pieceid.classList.contains("piece") && secondletter === "K") {
          castle(target.id, originalsquare, pieceid.id);
        }
        if (legalmoves.includes(`#${target.id}`)) {
          if (originalpiece.firstElementChild.id.charAt(1) === "K") {
            bmovedking = true;
          }
          const squarechild = target.firstElementChild;
          if (!squarechild || !squarechild.classList.contains("piece")) {
            const captured = Array.from(target.children); //
            if (squarechild) {
              if (squarechild.classList.contains("whitepiece")) {
                console.log(captured, "White Piece Captured");
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
      const pfo = parseInt(previousOriginal.charAt(2));
      const pft = parseInt(previousTarget.charAt(2));

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
function knight(target, original, pieceid) {
  legalmoves = [];

  const x = parseInt(original.charAt(1));
  const y = parseInt(original.charAt(2));

  const move = [
    { x: x + 1, y: y + 2 },
    { x: x - 1, y: y + 2 },
    { x: x + 1, y: y - 2 },
    { x: x - 1, y: y - 2 },
    { x: x + 2, y: y + 1 },
    { x: x - 2, y: y + 1 },
    { x: x + 2, y: y - 1 },
    { x: x - 2, y: y - 1 },
  ];

  move.forEach(({ x, y }) => {
    const newid = `#x${x}${y}`;
    let cap = document.querySelector(newid);
    if (cap && !cap.firstElementChild) {
      legalmoves.push(newid);
    }
    if (
      cap &&
      cap.firstElementChild &&
      cap.firstElementChild.id.charAt(0) != pieceid.charAt(0)
    ) {
      legalmoves.push(newid);
    }
  });
}

function bishop(target, original, pieceid) {
  legalmoves = [];

  const x = parseInt(original.charAt(1));
  const y = parseInt(original.charAt(2));

  const directions = [
    { dx: 1, dy: 1 },
    { dx: -1, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: -1 },
  ];

  directions.forEach(({ dx, dy }) => {
    let i = 1;

    while (i < 8) {
      const newX = x + i * dx;
      const newY = y + i * dy;

      if (newX < 1 || newY < 1 || newX > 8 || newY > 8) {
        break;
      }

      const newid = `#x${newX}${newY}`;
      let cap = document.querySelector(newid);

      if (cap && !cap.firstElementChild) {
        legalmoves.push(newid);
      } else if (
        cap &&
        cap.firstElementChild &&
        cap.firstElementChild.id.charAt(0) !== pieceid.charAt(0)
      ) {
        legalmoves.push(newid);
        break;
      } else if (
        cap &&
        cap.firstElementChild &&
        cap.firstElementChild.id.charAt(0) === pieceid.charAt(0)
      ) {
        break;
      }

      i++;
    }
  });
}
function rook(target, original, pieceid) {
  legalmoves = [];

  const x = parseInt(original.charAt(1));
  const y = parseInt(original.charAt(2));

  const directions = [
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
  ];

  directions.forEach(({ dx, dy }) => {
    let i = 1;

    while (i < 8) {
      const newX = x + i * dx;
      const newY = y + i * dy;

      if (newX < 1 || newY < 1 || newX > 8 || newY > 8) {
        break;
      }

      const newid = `#x${newX}${newY}`;
      let cap = document.querySelector(newid);

      if (cap && !cap.firstElementChild) {
        legalmoves.push(newid);
      } else if (
        cap &&
        cap.firstElementChild &&
        cap.firstElementChild.id.charAt(0) !== pieceid.charAt(0)
      ) {
        legalmoves.push(newid);
        break;
      } else if (
        cap &&
        cap.firstElementChild &&
        cap.firstElementChild.id.charAt(0) === pieceid.charAt(0)
      ) {
        break;
      }

      i++;
    }
  });
}
function queen(target, original, pieceid) {
  legalmoves = [];

  const x = parseInt(original.charAt(1));
  const y = parseInt(original.charAt(2));

  const directions = [
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 1 },
    { dx: -1, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: -1 },
  ];

  directions.forEach(({ dx, dy }) => {
    let i = 1;

    while (i < 8) {
      const newX = x + i * dx;
      const newY = y + i * dy;

      if (newX < 1 || newY < 1 || newX > 8 || newY > 8) {
        break;
      }

      const newid = `#x${newX}${newY}`;
      let cap = document.querySelector(newid);

      if (cap && !cap.firstElementChild) {
        legalmoves.push(newid);
      } else if (
        cap &&
        cap.firstElementChild &&
        cap.firstElementChild.id.charAt(0) !== pieceid.charAt(0)
      ) {
        legalmoves.push(newid);
        break;
      } else if (
        cap &&
        cap.firstElementChild &&
        cap.firstElementChild.id.charAt(0) === pieceid.charAt(0)
      ) {
        break;
      }

      i++;
    }
  });
}
function king(target, original, pieceid) {
  legalmoves = [];

  const x = parseInt(original.charAt(1));
  const y = parseInt(original.charAt(2));

  const move = [
    { x: x + 1, y: y },
    { x: x - 1, y: y },
    { x: x, y: y + 1 },
    { x: x, y: y - 1 },
    { x: x + 1, y: y + 1 },
    { x: x - 1, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x - 1, y: y + 1 },
  ];

  move.forEach(({ x, y }) => {
    const newid = `#x${x}${y}`;
    let cap = document.querySelector(newid);
    if (cap && !cap.firstElementChild) {
      legalmoves.push(newid);
    }
    if (
      cap &&
      cap.firstElementChild &&
      cap.firstElementChild.id.charAt(0) != pieceid.charAt(0)
    ) {
      legalmoves.push(newid);
    }
  });
}
function castle(target, original, pieceid) {
  if (pieceid.charAt(0) === "w") {
    if (wmovedking === false) {
      if (
        !document.querySelector("#x71").firstElementChild &&
        !document.querySelector("#x61").firstElementChild
      ) {
        legalmoves.push("#x71");
        if (target && legalmoves.includes(`#${target}`)) {
          document.querySelector("#x81").innerHTML = "";
          document
            .querySelector("#x61")
            .insertAdjacentHTML(
              "beforeend",
              `<img class="whitepiece" id="wr1" src="${chessPiecesImg.whiter}" draggable="true" alt="rook">`
            );
        }
      }
      if (
        !document.querySelector("#x41").firstElementChild &&
        !document.querySelector("#x31").firstElementChild &&
        !document.querySelector("#x21").firstElementChild
      ) {
        legalmoves.push("#x31");
        if (target && legalmoves.includes(`#${target}`)) {
          document.querySelector("#x11").innerHTML = "";
          document
            .querySelector("#x41")
            .insertAdjacentHTML(
              "beforeend",
              `<img class="whitepiece" id="wr0" src="${chessPiecesImg.whiter}" draggable="true" alt="rook">`
            );
        }
      }
    }
  }
  if (pieceid.charAt(0) === "b") {
    if (bmovedking === false) {
      if (
        !document.querySelector("#x78").firstElementChild &&
        !document.querySelector("#x68").firstElementChild
      ) {
        legalmoves.push("#x78");
        if (target && legalmoves.includes(`#${target}`)) {
          document.querySelector("#x88").innerHTML = "";
          document
            .querySelector("#x68")
            .insertAdjacentHTML(
              "beforeend",
              `<img class="piece" id="br1" src="${chessPiecesImg.blackr}" draggable="true" alt="rook">`
            );
        }
      }
      if (
        !document.querySelector("#x48").firstElementChild &&
        !document.querySelector("#x38").firstElementChild &&
        !document.querySelector("#x28").firstElementChild
      ) {
        legalmoves.push("#x38");
        if (target && legalmoves.includes(`#${target}`)) {
          document.querySelector("#x18").innerHTML = "";
          document
            .querySelector("#x48")
            .insertAdjacentHTML(
              "beforeend",
              `<img class="piece" id="br0" src="${chessPiecesImg.blackr}" draggable="true" alt="rook">`
            );
        }
      }
    }
  }
  const reset = document.querySelectorAll(".whitepiece, .piece");
  reset.forEach((rook) => {
    rook.removeEventListener("dragstart", drag);
    rook.addEventListener("dragstart", drag);
  });
}
