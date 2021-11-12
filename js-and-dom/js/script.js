
let roundbutton = document.getElementById('roundbutton');

roundbutton.addEventListener('click', roundbuttonClicked);

function roundbuttonClicked(){
  let rectElement = document.getElementById('rect');
  rectElement.style.borderRadius = '50px';

}






let i =  0;
i = i + 2;
alert(i);

console.log('My javascript file has loaded');

function say(what) {
  //alert(what);

//step 1: find the element we want to manipulate
  let elem = document.getElementById('lyrics');

  //step 2: create a new element to be added
  let newElem = document.createElement('p');

  //step 2.5: change the element't content
  newElem.innerHTML = what;

  //step: 3: add the new element to our lyrics
  elem.appendChild(newElem);

  elem = document.getElementById('heading');
  //let rectElement = document.getElementById('rect');



  if (what == 'cww'){
    elem.style.backgroundColor = 'red';
    rectElement.style.borderRadius = '0px';
  } else {
    elem.style.backgroundColor = 'blue';
    //rectElement.style.borderRadius = '50px';
  }

}
