const gridContainer = document.querySelector('.grid-container');
const clearButton = document.querySelector('#clearBtn');

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

        gridItem.addEventListener('mouseover', changeColor);
        gridItem.addEventListener('mousedown', changeColor);

        gridContainer.appendChild(gridItem);
    }
}

function clearGrid() {
    gridContainer.innerHTML = '';
}

function changeColor(event) {
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

clearButton.addEventListener('click', () => createGrid(gridSize));

createGrid(gridSize);