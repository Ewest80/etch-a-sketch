let gridSize = 16;

const gridContainer = document.querySelector('.grid-container');

// Create the grid
function createGrid(gridSize) {
    clearGrid();

    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        //Set the dimensions of the grid item
        gridItem.style.flex = `1 0 calc(100% / ${gridSize})`;
        gridItem.style.height = `calc(100% / ${gridSize})`;

        gridContainer.appendChild(gridItem);
    }
}

function clearGrid() {
    gridContainer.innerHTML = '';
}

createGrid(gridSize);