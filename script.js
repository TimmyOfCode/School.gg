const boxContainer = document.getElementById('boxContainer');
const numberOfBoxes = 20; // Change this number for more or fewer boxes

for (let i = 1; i <= numberOfBoxes; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.textContent = `box ${i}`;
    boxContainer.appendChild(box);
}
