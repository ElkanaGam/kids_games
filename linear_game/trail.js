var CELL_NUM = 35;
var OCCUPIED = {'green':'0_1', 'orange':'0_0'};
var green = '28_2';
var orange = '28_1';
var tmp = null;

unVisibleCells = [8,9,10,11,12,13,21,22,23,24,25,26];
let cells = []; // Array to store cell references
function allowDrop(ev) {
    ev.preventDefault();
}

function preventDrop(ev){
    return false

}

function drag (ev){
    ev.dataTransfer.setData("text", ev.target.id);
    currentPlayer = ev.target.id
    otherPlayer = 'orange' == currentPlayer ? 'green' : 'orange'
    console.log(otherPlayer)
    occupied = OCCUPIED[otherPlayer]
    //
    for (var i = 0; i<CELL_NUM; i++){    
        e = document.getElementById(i)
        c = e.children
        for (var j = 0; j< c.length; j++){
            if (occupied != i+'_'+j){
                c[j].classList.add('active')
                c[j].addEventListener('drop', drop, false)
                c[j].addEventListener('dragover', allowDrop)
            }
        }

    }


}

function dragend (ev) {
    for (i = 0; i < CELL_NUM; i++){
        e = document.getElementById(i)
        c = e.children
        for (j = 0; j<c.length; j++){
            c[j].removeEventListener('drop', drop, false)
            c[j].classList.remove('active')
            c[j].classList.add("hold")
        
        }
    }
}

function drop(ev) {
    targetId = ev.target.id
    const occupied = document.getElementById(targetId)
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    OCCUPIED[data] = targetId
    ev.target.appendChild(document.getElementById(data));
}

// JavaScript to generate cells on page load and add click event

function createSubCells(element, idx) {
    
    idx.forEach(id => {
      const subCell = document.createElement('div');
      subCell.id = element.id+"_"+ id
      subCell.classList.add('sub_cell' + id);
      element.appendChild(subCell);
    });
}

function addPegs (element){
    dir = ''
    imgs = ['orange.png', 'green.png']
    children = element.children;
    for (var i = 0; i<2; i++){
        const peg = document.createElement('img');
        peg.src = dir+imgs[i];
        peg.id = imgs[i].replace('.png', '')
        peg.addEventListener('dragstart', drag, false)
        peg.addEventListener('dragend', dragend, false)
        children[i].appendChild(peg)
        peg.removeEventListener('drop', drop, false)
    }
   
}


function dispaly() {
    const grid = document.querySelector('.box2');  
    // Create 35 cells (7x5 grid)
    for (let i = 0; i < CELL_NUM; i++) {
        const cell = document.createElement('div');
        cell.id = i
        if (unVisibleCells.includes(i)){
            cell.classList.add('trans');
        }
        else{
            cell.classList.add('cell');
            createSubCells(cell, ['0','1'])
            
        }
        
        grid.appendChild(cell);
        cells.push(cell); // Store cell reference in the array
        if (i == 28){
            addPegs(cell)
        }
    }
};



const players = ['green', 'orange']
dispaly()
for (var i = 0; i< players.length; i++){
    var player = document.getElementById(players[i])
    
}
