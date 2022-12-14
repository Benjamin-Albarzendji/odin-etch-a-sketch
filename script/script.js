//Global variables for color choices
let penColor = "#000000";
let bgColor = "#FFFFFFF";
let gridBorder = 1;
let rbg = 0;

start();

//Main opeartions when the sheet is loaded
function start() {
  //Creates the first grid
  createGrid();

  //Event listener for the slider
  let gridValue = document.getElementById("slider");
  gridValue.oninput = function () {
    //Updates the value of the grid slider
    let sliderText = document.getElementById("sliderValue");
    sliderText.textContent = `${document.getElementById("slider").value} x ${document.getElementById("slider").value}`

    //Calls a new grid)
    newGrid();
  };

  //Listener for penColor
  let penColorChange = document.getElementById("brusch");
  penColorChange.onchange = function () {
    penColor = penColorChange.value;
  };

  //Listener for backgroundColor
  let bgColorChange = document.getElementById("background");
  bgColorChange.onchange = function () {
    bgColor = bgColorChange.value;
    newBackground();
  };

  //Listener for RBG button
  let rbgButton = document.getElementById("rbg");
  rbgButton.onclick = function () {
    rbgButton.classList.toggle("buttonPressed");
    rbg++;
    if (rbg > 1) {
      rbg = 0;
    }
    paint();
  };

  //Listener for Border Button
  let borderBtn = document.getElementById("toggleBorder");
  borderBtn.onclick = function () {
    borderBtn.classList.toggle("buttonPressed");
    gridBorder++;
    if (gridBorder > 1) {
      gridBorder = 0;
    }
    toggleBorder();
  };

  //Listener for Clear Button
  let clearBtn = document.getElementById("clear");
  clearBtn.onclick = function () {
    newGrid();
  };
}

//The grid function
function createGrid(gridX = 16, gridY = 16) {
  //Grabs the gridContainer
  let gridContainer = document.querySelector(".gridContainer");

  //Creates the rows of the grid container
  for (let i = 0; i < gridY; i++) {
    let gridObject = document.createElement("div");
    gridObject.className = "gridObject";
    gridContainer.appendChild(gridObject);
  }

  //Loops over the gridrows and adds cells
  let list = document.querySelectorAll(".gridObject");
  list.forEach((row) => {
    for (let j = 0; j < gridX; j++) {
      let gridCell = document.createElement("div");
      gridCell.className = "gridCell";
      gridCell.style.backgroundColor = bgColor;

      //Checks if the gridValue is 0, deletes border
      if (gridBorder === 0) {
        gridCell.id = "noBorder";
      }
      row.appendChild(gridCell);
    }
  });

  //Adds event listeners to all cells
  let cellListener = document.querySelectorAll(".gridCell");

  cellListener.forEach((cell) => {
    //Listening on mousemove and click
    cell.addEventListener("mousemove", (e) => {
      if (e.buttons == 1) {
        paint(e);
      }
    });

    //Listening for click
    cell.addEventListener("click", (e) => {
      paint(e);
    });
  });
}

function newGrid(e) {
  //Removes the old grid
  let oldGrid = document.querySelectorAll(".gridObject");
  oldGrid.forEach((cell) => {
    cell.parentNode.removeChild(cell);
  });

  //Grabs the valeu from the slider
  let x = (gridValue = document.getElementById("slider").value);
  let y = (gridValue = document.getElementById("slider").value);

  //creates a new grid by calling the function
  createGrid(x, y);
}

function paint(e) {
  if (rbg === 0) {
    e.target.style.backgroundColor = penColor;
    e.target.classList.add("painted");
  } else {
    e.target.style.backgroundColor = getRandomColor();
    e.target.classList.add("painted");
  }
}

//Adds a new backround while painting
function newBackground() {
  //Changed color of only unpanted cells
  let unpaintedCells = document.querySelectorAll(".gridCell");
  unpaintedCells.forEach((cell) => {
    if (!cell.classList.contains("painted")) {
      cell.style.backgroundColor = bgColor;
    }
  });
}
//Random color function, imported from stackoverflow.
function getRandomColor() {
  return "hsla(" + Math.random() * 360 + ", 100%, 50%, 1)";
}

//Toggles the grid border lines
function toggleBorder() {
  let borderCells = document.querySelectorAll(".gridCell");
  if (gridBorder === 0) {
    borderCells.forEach((cell) => {
      cell.id = "noBorder";
    });
  } else {
    borderCells.forEach((cell) => {
      cell.removeAttribute("id");
    });
  }
}
