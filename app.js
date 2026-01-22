let count = 0;
let cps = 1;

const countDisplay = document.getElementById('count');
console.log('count')
const cpsDisplay = document.getElementById('cps');
const image = document.querySelector('img');


countDisplay.innerText = count;
cpsDisplay.innerText = cps;

image.addEventListener ('click', function() {
    count++;
    countDisplay.innerText = count;
    console.log(count);

})

setInterval(function () {
    count++;
    countDisplay.innerText = count;
}, 1000);


