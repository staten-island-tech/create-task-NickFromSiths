function testinput() {
  chessPieces.forEach((element) => {
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<img src="${element.img}" alt="">`
    );
  });
}
testinput();

let sortX = [...x].sort();
let sortY = [...y].sort();

for (let i = 0; i < sortX.length; i++) {}

if (turn % 2 === 0) {
  if (piece.className === "whitepiece") {
    target.appendChild(piece);
    turn++;
    console.log("yes");
  } else if (piece.className === "piece") {
    console.log("no");
  }
} else if (turn % 2 != 0) {
  if (piece.className === "piece") {
    target.appendChild(piece);
    turn++;
    console.log("yes");
  } else if (piece.className === "whitepiece") {
    console.log("no");
  }
}
//en passant

if (f === 5) {
  if (document.querySelector(`#x${r - 1}${f - 1}`)) {
    const adjacent = `#x${r - 1}${f}`;
    console.log(adjacent);
    const adjacentPiece = document.querySelector(adjacent);
    console.log(adjacentPiece);
    if (adjacentPiece && adjacentPiece.firstElementChild) {
      console.log("vrguietdyh");
      legalmoves.push(`#x${r - 1}${f + 1}`); // Add en passant move if conditions are met
      if (target && legalmoves.includes(`#${target}`)) {
        adjacentPiece.innerHTML = "";
      }
    }
  }
  if (document.querySelector(`#x${r + 1}${f - 1}`)) {
    const adjacent = `#x${r + 1}${f}`;
    console.log(adjacent);
    const adjacentPiece = document.querySelector(adjacent);
    console.log(adjacentPiece);
    if (adjacentPiece && adjacentPiece.firstElementChild) {
      console.log("vrguietdyh");
      legalmoves.push(`#x${r + 1}${f + 1}`); // Add en passant move if conditions are met
      if (target && legalmoves.includes(`#${target}`)) {
        adjacentPiece.innerHTML = "";
      }
    }
  }
}

// && target.includes(".piece")

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

//tried to make en passant but didnt work

// if (f === 5) {
//   const newid2 = `#x${r}${f - 1}`;
//   let capt = document.querySelector(newid2);
//   if (cap && capt && capt.firstElementChild) {
//     legalmoves.push(newid1);
//   }
//   if ((cap = `#${target}`)) {
//     capt.innerHTML = "";
//   }
// }
