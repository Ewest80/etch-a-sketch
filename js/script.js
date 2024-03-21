const gridContainer = document.querySelector('.grid-container');
const resizeButton = document.querySelector('#resizeBtn');
const clearButton = document.querySelector('#clearBtn');
const drawToolsButtons = document.querySelectorAll('.draw-tools .btn');

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
    else if (colorMode === 'RAINBOW') {
        event.target.style.backgroundColor = getRandomColor();
    }
}

function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
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

drawToolsButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        switch (event.target.id) {
            case 'colorBtn':
                colorMode = 'COLOR';
                break;
            case 'rainbowBtn':
                colorMode = 'RAINBOW';
                break;
            case 'shadeBtn':
                colorMode = 'SHADE';
                break;
            case 'eraserBtn':
                colorMode = 'ERASER';
                break;
        }
    })
});

createGrid(gridSize);