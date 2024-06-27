// Function to create circles
currentAvialbleCircle = {1 : 6, 2:6};

function createCircles(containerId, numberOfCircles) {
    const container = document.getElementById(containerId);
    
    for (let i = 0; i < numberOfCircles; i++) {
      const circle = document.createElement('div');
      circle.setAttribute("id", i+"_"+containerId)
      circle.classList.add('circle');
      container.appendChild(circle);
    }
  }
  
  // Create circles in each column
  window.onload = function() {
    createCircles('column1', 7);
    createCircles('column2', 7);

    const circlesColumn1 = document.querySelectorAll('#column1 .circle');
    const circlesColumn2 = document.querySelectorAll('#column2 .circle');

    // Function to handle click or touch event
    function circleClickHandler(e) {
        circleId = e.target.id;
        level = circleId[0];
        col = circleId[8];
        console.log(col, " ", level, " ", currentAvialbleCircle[col]);
        if (level == currentAvialbleCircle[col]){
            document.getElementById(circleId).style.backgroundColor = 'green';
            --currentAvialbleCircle[col];
        } 
    }

    // Add click or touch event listener to each circle in the columns
    circlesColumn1.forEach(circle => {
        circle.addEventListener('click', circleClickHandler)
    }
    );

    

    circlesColumn2.forEach(circle => {
        circle.addEventListener('click', circleClickHandler)
    });
  };
 
// Get the choice from the URL parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const choice = urlParams.get('choice');


const imageSources = {
    'S':
        {
            'right': 'S_1.png',
            'left': 'S_2.png',
        },
    'G':
        {
            'right': 'G_1.png',
            'left': 'G_2.png',
        },
    'R':
        {
            'right': 'R_1.png',
            'left': 'R_2.png',
        }
  };
const chosenImageElement1 = document.getElementById('img1');
const chosenImageElement2 = document.getElementById('img2');
chosenImageElement1.src = "images/"+imageSources[choice]['right'];
chosenImageElement2.src = "images/"+imageSources[choice]['left'];