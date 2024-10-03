const boxContainer = document.getElementById('boxContainer');
const numberOfBoxes = 10; // Total number of boxes

for (let i = 1; i <= numberOfBoxes; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.textContent = `box ${i}`;
    boxContainer.appendChild(box);
}
