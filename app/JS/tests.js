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
