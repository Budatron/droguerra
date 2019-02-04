var totalMoney,
    totalSpace,
    inventory,
    totalHealth,
    acidPrice,
    cocainePrice,
    ecstasyPrice,
    pcpPrice,
    heroinPrice,
    weedPrice,
    speedPrice,
    shroomsPrice;

var acid = document.getElementById('acid');
var cocaine = document.getElementById('cocaine');
var ecstasy = document.getElementById('ecstasy');
var pcp = document.getElementById('pcp');
var heroin = document.getElementById('heroin');
var weed = document.getElementById('weed');
var shrooms = document.getElementById('shrooms');
var speed = document.getElementById('speed');
var getPricesButton = document.getElementById('getPrices');

function player() {
    totalMoney = 100;
}

function getRandomPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDrugPrices() {
    acidPrice = getRandomPrice(1000, 4499);
    cocainePrice = getRandomPrice(15000, 29999);
    ecstasyPrice = getRandomPrice(10, 59);
    pcpPrice = getRandomPrice(1000, 3499);
    heroinPrice = getRandomPrice(5000, 13999);
    weedPrice = getRandomPrice(300, 899);
    shroomsPrice = getRandomPrice(600, 1349);
    speedPrice = getRandomPrice(70, 249);
    // return [acidPrice, cocainePrice, ecstasyPrice, pcpPrice, heroinPrice, weedPrice, shroomsPrice, speedPrice];

    /**alert(acidPrice + ' ' + cocainePrice + ' ' + ecstasyPrice + ' ' + pcpPrice + ' ' + heroinPrice + ' ' + weedPrice + ' ' + shroomsPrice + ' ' + speedPrice);**/
}

function drugAvailability() {

}

getPricesButton.addEventListener('click', function () {
    getDrugPrices();
    acid.innerHTML = '$ ' + acidPrice;
    cocaine.innerHTML = '$ ' + cocainePrice;
    ecstasy.innerHTML = '$ ' + ecstasyPrice;
    pcp.innerHTML = '$ ' + pcpPrice;
    heroin.innerHTML = '$ ' + heroinPrice;
    weed.innerHTML = '$ ' + weedPrice;
    shrooms.innerHTML = '$ ' + shroomsPrice;
    speed.innerHTML = '$ ' + speedPrice;
});

/**Each drug has a 1 in 8 chance of not being available. If the cops do a bust, the randomly selected price is multiplied by 4. If addicts are buying at outrageous prices, the price is multiplied by 8. Odds:
Cheap Acid (/4): 1 in 17)
Cops bust Cocaine (x4): 1 in 35 Addicts buy Cocaine (x8): 1 in 35
Cops bust Ecstasy (x4): 1 in 13 Cheap Ecstasy (/8): 1 in 11
Cops bust PCP (x4): 1 in 20 Addicts buy PCP (x8): 1 in 20
Cops bust Heroin (x4): 1 in 25 Addicts buy Heroin (x8): 1 in 25
Cops bust Weed (x4): 1 in 13 Cheap Weed (/4): 1 in 10
Addicts buy Shrooms: 1 in 17
Cops bust Speed (x4): 1 in 15 Addicts buy Speed (x8): 1 in 20

You have a 1 in 7 chance of being offered more pockets, and a 1 in 7 chance of being offered a gun.

Officer Hardass has a 1 in 7 chance of finding you. If you don’t have any drugs, they won’t chase you. If If you choose to fight, you have a 1 in 4 chance of killing an officer. They have a 1 in 6 chance of wounding you, and a 1 in 25 chance of killing you. If you run, you have a 1 in 15 chance of losing all your dope and half your cash.**/

