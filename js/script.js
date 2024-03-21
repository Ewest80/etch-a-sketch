const gridContainer = document.querySelector('.grid-container');
const resizeButton = document.querySelector('#resizeBtn');
const clearButton = document.querySelector('#clearBtn');
const drawToolsButtons = document.querySelectorAll('.draw-tools btn');

let gridSize = 24;
let color = '#333';

let mouseDown = false;
let colorMode = 'COLOR';

// Create the grid
function createGrid(gridSize) {
    // Clear grid and change css variable to new grid size
    clearGrid();
    document.documentElement.style.setProperty('--grid-size', gridSize);

    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        gridItem.addEventListener('mouseover', changeColorMode);
        gridItem.addEventListener('mousedown', changeColorMode);

        gridContainer.appendChild(gridItem);
    }
}

function clearGrid() {
    gridContainer.innerHTML = '';
}

function changeColorMode(event) {
    if (event.type === 'mouseover' && !mouseDown) return;

    if (colorMode === 'COLOR') {
        event.target.style.backgroundColor = color;
    }
}

document.addEventListener('mousedown', (event) => {
    event.preventDefault();
    mouseDown = true;
});

document.addEventListener('mouseup', () => mouseDown = false);

resizeButton.addEventListener('click', () => {
    let newGridSize = +prompt('Enter a new grid size (1-100):', gridSize.toString());
    if (!Number.isInteger(newGridSize) || newGridSize < 1 || newGridSize > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }
    gridSize = newGridSize;
    createGrid(gridSize);
});
clearButton.addEventListener('click', () => createGrid(gridSize));

createGrid(gridSize);