const gridContainer = document.querySelector('.grid-container');

let gridSize = 16;
let color = '#333';

let mouseDown = false;
let colorMode = 'COLOR';

// Create the grid
function createGrid(gridSize) {
    clearGrid();

    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        //Set the dimensions of the grid item
        gridItem.style.flex = `1 0 calc(100% / ${gridSize})`;
        gridItem.style.height = `calc(100% / ${gridSize})`;

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


createGrid(gridSize);