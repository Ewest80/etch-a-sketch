const COLOR = 'COLOR';
const RAINBOW = 'RAINBOW';
const SHADE = 'SHADE';
const ERASER = 'ERASER';

const gridContainer = document.querySelector('.grid-container');
const resizeButton = document.querySelector('#resizeBtn');
const clearButton = document.querySelector('#clearBtn');
const borderButton = document.querySelector('#borderBtn');
const drawToolsButtons = document.querySelectorAll('.draw-tools .btn');

let gridSize = 16;
let color = '#333';

let mouseDown = false;
let colorMode = 'COLOR';

let gridItems = createGrid(gridSize);

function createGrid(gridSize) {
    // Clear grid and change css variable to new grid size
    clearGrid();
    document.documentElement.style.setProperty('--grid-size', gridSize);

    const gridItems = [];

    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        gridItem.addEventListener('mouseover', changeColorMode);
        gridItem.addEventListener('mousedown', changeColorMode);

        gridContainer.appendChild(gridItem);
        gridItems.push(gridItem);
    }

    return gridItems;
}

function clearGrid() {
    gridContainer.innerHTML = '';
}

function changeColorMode(event) {
    if (event.type === 'mouseover' && !mouseDown) return;

    if (colorMode === COLOR) {
        event.target.style.backgroundColor = color;
    }
    else if (colorMode === RAINBOW) {
        event.target.style.backgroundColor = getRandomColor();
    }
    else if (colorMode === ERASER) {
        event.target.style.backgroundColor = '';
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
    let newGridSize = prompt('Enter a new grid size (1-100):', gridSize);

    if (newGridSize === null) return;
    if (!Number.isInteger(parseInt(newGridSize)) || newGridSize < 1 || newGridSize > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }
    if (newGridSize === gridSize) return;

    gridSize = newGridSize;
    gridItems = createGrid(gridSize);
});

clearButton.addEventListener('click', () => {
    gridItems.forEach(item => item.style.backgroundColor = '');
});

borderButton.addEventListener('click', () => {
    const gridContainer = document.querySelector('.grid-container');
    gridItems.forEach(item => {
        item.classList.toggle('grid-item-border');
        gridContainer.classList.toggle('grid-container-border');
    })
})

drawToolsButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        switch (event.target.id) {
            case 'colorBtn':
                colorMode = COLOR;
                break;
            case 'rainbowBtn':
                colorMode = RAINBOW;
                break;
            case 'shadeBtn':
                colorMode = SHADE;
                break;
            case 'eraserBtn':
                colorMode = ERASER;
                break;
        }
    })
});
