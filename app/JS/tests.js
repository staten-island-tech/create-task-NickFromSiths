function testinput() {
  chessPieces.forEach((element) => {
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `<img src="${element.img}" alt="">`
    );
  });
}
testinput();

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
