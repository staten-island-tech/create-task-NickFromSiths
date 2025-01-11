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

//WHITE EN PASSANT

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

///BLACK EN PASSANT doesnt delete passanted white pawn for some reason???????

if (y === 4 && test === -2) {
  if (document.querySelector(`#x${x - 1}${y}`) && x - 1 === xvalue) {
    const adjacent = `#x${x - 1}${y}`;
    const adjacentPiece = document.querySelector(adjacent);
    if (adjacentPiece && adjacentPiece.firstElementChild) {
      legalmoves.push(`#x${x - 1}${y - 1}`);
      if (target && legalmoves.includes(`#${target}`)) {
        adjacentPiece.innerHTML = "";
        console.log(adjacent);
      }
    }
  }
  if (document.querySelector(`#x${x + 1}${y}`) && x + 1 === xvalue) {
    const adjacent = `#x${x + 1}${y}`;
    const adjacentPiece = document.querySelector(adjacent);

    if (adjacentPiece && adjacentPiece.firstElementChild) {
      console.log(adjacentPiece, "uhh");
      legalmoves.push(`#x${x + 1}${y - 1}`);
      if (target.id && legalmoves.includes(`${target.id}`)) {
        document.querySelector(adjacent).innerHTML = "";
        console.log(adjacentPiece, "remove???");
      }
    }
  }
}

if (document.querySelector(`#x${x}${y}`)) {
  const pieceOnSquare = document.querySelector(`#x${x}${y}`).firstElementChild;

  // If the square is empty, add it to legal moves
  if (!pieceOnSquare) {
    legalmoves.push(`#x${x}${y}`);
  }
  // If the square contains an opponent's piece, add it to legal moves and break
  else if (pieceOnSquare.id.charAt(0) !== pieceid.charAt(0)) {
    legalmoves.push(`#x${x}${y}`);
    // break; // Stop after capturing an opponent's piece
  }
  // If the square contains a piece of the same color, stop moving
  else {
    // break;
  }
}
// && target.includes(".piece")

//THE ONLY GPT RESPONSE THAT WORKS FOR BISHOP

function bishop(target, original, pieceid) {
  legalmoves = [];

  const x = parseInt(original.charAt(1)); // x-coordinate of the original square
  const y = parseInt(original.charAt(2)); // y-coordinate of the original square

  // Directions for the bishop (diagonals)
  const directions = [
    { dx: 1, dy: 1 }, // Top-right diagonal
    { dx: -1, dy: 1 }, // Top-left diagonal
    { dx: 1, dy: -1 }, // Bottom-right diagonal
    { dx: -1, dy: -1 }, // Bottom-left diagonal
  ];

  // Loop through all 4 diagonal directions
  directions.forEach(({ dx, dy }) => {
    let i = 1; // Distance from the original position

    // Check squares in this direction
    while (true) {
      const newX = x + i * dx;
      const newY = y + i * dy;

      // Stop if out of bounds (we check both x and y coordinates)
      if (newX < 1 || newY < 1 || newX > 8 || newY > 8) {
        break;
      }

      const newid = `#x${newX}${newY}`;
      let cap = document.querySelector(newid);

      // If the square is empty, it's a legal move
      if (cap && !cap.firstElementChild) {
        legalmoves.push(newid);
      }
      // If the square contains an opponent's piece, it's a legal move (capture)
      else if (
        cap &&
        cap.firstElementChild &&
        cap.firstElementChild.id.charAt(0) !== pieceid.charAt(0)
      ) {
        legalmoves.push(newid); // Capture the opponent's piece
        break; // Stop moving in this direction after capturing
      }
      // If the square contains a piece of the same color, stop in this direction
      else if (
        cap &&
        cap.firstElementChild &&
        cap.firstElementChild.id.charAt(0) === pieceid.charAt(0)
      ) {
        break; // Cannot move past a friendly piece
      }

      i++; // Move to the next square in the current direction
    }
  });
}

//tried to make bishop function but did not work-------------------------------------------------------------
function bishop(target, original, pieceid) {
  legalmoves = [];

  const x = parseInt(original.charAt(1));
  const y = parseInt(original.charAt(2));

  let i = 1;

  while (i < 8) {
    if (document.querySelector(`#x${x + i}${y + i}`)) {
      const adjacent = `#x${x + i}${y + i}`;
      const adjacentPiece = document.querySelector(adjacent);

      if (adjacentPiece && !adjacentPiece.firstElementChild) {
        legalmoves.push(`#x${x + i}${y + i}`);
        i++;
      } else if (
        adjacentPiece.firstElementChild.id.charAt(0) !== pieceid.charAt(0)
      ) {
        legalmoves.push(`#x${x + i}${y + i}`);
        break;
      } else {
        break;
      }
    }
    break;
  }
  while (i < 8) {
    if (document.querySelector(`#x${x - i}${y - i}`)) {
      const adjacent = `#x${x - i}${y - i}`;
      const adjacentPiece = document.querySelector(adjacent);

      if (adjacentPiece && !adjacentPiece.firstElementChild) {
        legalmoves.push(`#x${x - i}${y - i}`);
        i++;
      } else if (
        adjacentPiece.firstElementChild.id.charAt(0) !== pieceid.charAt(0)
      ) {
        legalmoves.push(`#x${x - i}${y - i}`);
        break;
      } else {
        break;
      }
    }
    break;
  }
  while (i < 8) {
    if (document.querySelector(`#x${x - i}${y + i}`)) {
      const adjacent = `#x${x - i}${y + i}`;
      const adjacentPiece = document.querySelector(adjacent);

      if (adjacentPiece && !adjacentPiece.firstElementChild) {
        legalmoves.push(`#x${x - i}${y + i}`);
        i++;
      } else if (
        adjacentPiece.firstElementChild.id.charAt(0) !== pieceid.charAt(0)
      ) {
        legalmoves.push(`#x${x - i}${y + i}`);
        break;
      } else {
        break;
      }
    }
    break;
  }
  while (i < 8) {
    if (document.querySelector(`#x${x + i}${y - i}`)) {
      const adjacent = `#x${x + i}${y - i}`;
      const adjacentPiece = document.querySelector(adjacent);

      if (adjacentPiece && !adjacentPiece.firstElementChild) {
        legalmoves.push(`#x${x + i}${y - i}`);
        i++;
      } else if (
        adjacentPiece.firstElementChild.id.charAt(0) !== pieceid.charAt(0)
      ) {
        legalmoves.push(`#x${x + i}${y - i}`);
        break;
      } else {
        break;
      }
    }
    break;
  }
}

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
