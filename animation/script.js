colorsId = {0:"redSquare",1:"blueSquare", 2:"greenSquare",3:"yellowSquare" }

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve, ms))
}


function foo(ms){
    elem = document.getElementById(colorsId[1])
    elem.style.backgroundColor = '#BFD8AF';
    sleep(ms).then(()=>{
        elem.style.backgroundColor = '';
        console.log(elem)
       
    })
    

    
}

document.getElementById('redSquare').addEventListener('click', function(){
    foo(2000)
})
// function changeColor(id){
    
//     setTimeout(()=>{elem.style.backgroundColor=''}, 1000)
// }

// function alternateColor(steps) {
//     let delay = 1000
//     for (i=0; i<steps; i++){
//         id = i%4
//         console.log(id, steps)
//         setTimeout(changeColor, delay,id);
//         delay += 1000;
//     }


// }
// document.getElementById('redSquare').addEventListener('click', function (){
//     alternateColor(10)
// }, false)


// // document.getElementById('redSquare').addEventListener('click', function() {
// //     for (let i=0;i<3; i++){
        
// //         console.log(i)
// //         changeColor('redSquare', '#BFD8AF', 500);
// //         changeColor('blueSquare', '#BFD8AF', 500);
// //         // setTimeout(function() {
// //         //     changeColor('blueSquare', '#BFD8AF', 500);
// //         //     setTimeout(function() {
// //         //         changeColor('greenSquare', '#BFD8AF', 500);
// //         //         setTimeout(function() {
//         //             changeColor('yellowSquare', '#BFD8AF', 500);
//         //         }, 500);
//         //     }, 500);
//         // }, 500);
        
// //     }
//   });
  
//   function changeColor(squareId, color, delay) {
//     setTimeout(function() {
//       document.getElementById(squareId).style.backgroundColor = color;
//       setTimeout(function() {
//         document.getElementById(squareId).style.backgroundColor = '';
//       }, 500);
//     }, delay);
//   }
  