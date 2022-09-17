//Global variables for color choices
let penColor = "#000000";
let bgColor = "#FFFFFFF"


start();

//Main opeartions when the sheet is loaded
function start() {
  //Creates the first grid
  createGrid();

  //Event listener for the slider
  gridValue = document.getElementById("slider");
  gridValue.oninput = function () {
    //Updates the value of the grid slider
    sliderText = document.getElementById("sliderValue");
    sliderText.textContent = document.getElementById("slider").value;

    //Calls a new grid)
    newGrid();
  };

      //Listener for penColor
      penColorChange = document.getElementById("brusch")
      penColorChange.onchange = function (){
        penColor = penColorChange.value
      }

      //Listener for backgroundColor
      bgColorChange = document.getElementById("background")
      bgColorChange.onchange = function (){
        bgColor = bgColorChange.value
        newGrid()
      }

      //Listener for Clear Button
      clearBtn = document.getElementById("clear")
      clearBtn.onclick = function (){
    newGrid()
        
    }
}

//The grid function
function createGrid(gridX = 16, gridY = 16) {
  //Grabs the gridContainer
  gridContainer = document.querySelector(".gridContainer");

  //Creates the rows of the grid container
  for (let i = 0; i < gridY; i++) {
    gridObject = document.createElement("div");
    gridObject.className = "gridObject";
    gridContainer.appendChild(gridObject);
  }

  //Loops over the gridrows and adds cells
  list = document.querySelectorAll(".gridObject");
  list.forEach((row) => {
    for (let j = 0; j < gridX; j++) {
      gridCell = document.createElement("div");
      gridCell.className = "gridCell";
      gridCell.style.backgroundColor = bgColor;
      row.appendChild(gridCell);
    }
  });

  //Adds event listeners to all cells
  cellListener = document.querySelectorAll(".gridCell");

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
  oldGrid = document.querySelectorAll(".gridObject");
  oldGrid.forEach((cell) => {
    cell.parentNode.removeChild(cell);
  });

  //Grabs the valeu from the slider
  x = gridValue = document.getElementById("slider").value;
  y = gridValue = document.getElementById("slider").value;

  //creates a new grid by calling the function
  createGrid(x, y);
}

function paint(e) {
  e.target.style.backgroundColor = penColor
}
