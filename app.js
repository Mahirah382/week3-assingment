let count = 0;
let cps = 1;

const countDisplay = document.getElementById('count');
const cpsDisplay = document.getElementById('cps');
const image = document.querySelector('img');
const resetBtn = document.getElementById('reset');

loadGame();

countDisplay.innerText = count;
cpsDisplay.innerText = cps;

image.addEventListener ('click', function() {
    count++;
    countDisplay.innerText = count;
    console.log(count);
    saveGame();

})

async function fetchData() {
    const response = await fetch('https://cookie-upgrade-api.vercel.app/api/upgrades');
    console.log(response);

    const data = await response.json();
    console.log(data);

    const container = document.getElementById('shop')

    data.forEach(function(item) {
    const shop = document.createElement('div');
    const name = document.createElement('p');
    const cost = document.createElement('p');
    const increase = document.createElement('p');
    const button = document.createElement('button');

    name.textContent = item.name;
    cost.textContent = item.cost;
    increase.textContent = item.increase;
    button.textContent = "buy";

    button.addEventListener('click', function() {
        if (count < item.cost ) {
            alert ("you need more cookies!!");
        } else if (count >= item.cost) {
            count -= item.cost;
            cps += item.increase;

            countDisplay.textContent = count;
            cpsDisplay.textContent = cps;

            saveGame();
        }
    })

    shop.appendChild(name);
    shop.appendChild(cost);
    shop.appendChild(increase);
    shop.appendChild(button);

    container.appendChild(shop);

});
}

 setInterval(function() {
    count = count + cps;
    countDisplay.textContent = count;
    saveGame();
}, 1000)

fetchData();

function saveGame () {
    const gameData = {
        count : count,
        cps : cps,
    };
    localStorage.setItem('cookieCountSave', JSON.stringify(gameData));
}


function loadGame () {
    const savedGame = localStorage.getItem('cookieCountSave') || 0

    if (savedGame) {
        const gameData = JSON.parse(savedGame)
        count = gameData.count;
        cps = gameData.cps;
    }
}

resetBtn.addEventListener('click', function() {
    count = 0;
    cps = 1;
    countDisplay.innerText = count;
    cpsDisplay.innerText = cps; 
})
