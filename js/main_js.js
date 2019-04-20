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

// function player() {
//     totalMoney = 100;
// }

function getRandomPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function getDrugPrices() {
//     acidPrice = getRandomPrice(1000, 4499);
//     cocainePrice = getRandomPrice(15000, 29999);
//     ecstasyPrice = getRandomPrice(10, 59);
//     pcpPrice = getRandomPrice(1000, 3499);
//     heroinPrice = getRandomPrice(5000, 13999);
//     weedPrice = getRandomPrice(300, 899);
//     shroomsPrice = getRandomPrice(600, 1349);
//     speedPrice = getRandomPrice(70, 249);
//     // return [acidPrice, cocainePrice, ecstasyPrice, pcpPrice, heroinPrice, weedPrice, shroomsPrice, speedPrice];

//     /**alert(acidPrice + ' ' + cocainePrice + ' ' + ecstasyPrice + ' ' + pcpPrice + ' ' + heroinPrice + ' ' + weedPrice + ' ' + shroomsPrice + ' ' + speedPrice);**/
// }

// function drugAvailability() {

// }

// getPricesButton.addEventListener('click', function () {
//     getDrugPrices();
//     acid.innerHTML = '$ ' + acidPrice;
//     cocaine.innerHTML = '$ ' + cocainePrice;
//     ecstasy.innerHTML = '$ ' + ecstasyPrice;
//     pcp.innerHTML = '$ ' + pcpPrice;
//     heroin.innerHTML = '$ ' + heroinPrice;
//     weed.innerHTML = '$ ' + weedPrice;
//     shrooms.innerHTML = '$ ' + shroomsPrice;
//     speed.innerHTML = '$ ' + speedPrice;
// });

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

function Place_Object(name) {
    this.name = name;
    // this.price_differences = { apples: 1, oranges: 1 };
    this.get_price_list = function () {
        acidPrice = getRandomPrice(1000, 4499);
        cocainePrice = getRandomPrice(15000, 29999);
        ecstasyPrice = getRandomPrice(10, 59);
        pcpPrice = getRandomPrice(1000, 3499);
        heroinPrice = getRandomPrice(5000, 13999);
        weedPrice = getRandomPrice(300, 899);
        speedPrice = getRandomPrice(600, 1349);
        shroomsPrice = getRandomPrice(600, 1349);
        hashishPrice = getRandomPrice(70, 249);
        ludesPrice = getRandomPrice(70, 249);
        peyotePrice = getRandomPrice(70, 249);


        return {
            acid: acidPrice,
            cocain: cocainePrice,
            ecstasy: ecstasyPrice,
            pcp: pcpPrice,
            heroin: heroinPrice,
            weed: weedPrice,
            speed: speedPrice,
            shrooms: shroomsPrice,
            hashish: hashishPrice,
            ludes: ludesPrice,
            peyote: peyotePrice,
        };
    };
};


function Player_Object() {
    this.days_left = 31;
    this.name = "Conrad";
    this.inventory = { 
        acid: 0,
        cocain: 0,
        ecstasy: 0,
        pcp: 0,
        heroin: 0,
        weed: 0,
        speed: 0,
        shrooms: 0,
        hashish: 0,
        ludes: 0,
        peyote: 0,
     };
    this.money = 200;
    this.debt = 200;
    this.daily_interest = 0.1;
    this.max_items = 30;
    this.space = 30;

    this.advance_day = function () {
        if (this.days_left > 0) {
            this.days_left = this.days_left - 1;
            this.debt = this.debt * (1 + this.daily_interest);
            /* round debt */
            this.debt = Math.floor(this.debt);
        }
        else {
            game_end();
        }
    };
}

function Supply_Object(){
    this.current_item = "";
    this.current_price = 0;
    this.can_buy = 0;
}

/* Game Data */

var player = new Player_Object();

var supply = new Supply_Object();
// var item_prices = { apples: 10, oranges: 100 };

var losAngeles = new Place_Object("Los Angeles");
// apple_orchard.price_differences = { apples: .5, oranges: 2 };
var harlem = new Place_Object("Harlem");
// orange_grove.price_differences = { apples: 2, oranges: .5 };
var bronx = new Place_Object("Bronx");
var chicago = new Place_Object("Chicago");
var brooklyn = new Place_Object("Brooklyn");
var sanAntonio = new Place_Object("San Antonio");
var miami = new Place_Object("Miami");
// var location_map = { "apple_orchard": apple_orchard, "orange_grove": orange_grove };
var location_map = {
  losAngeles: losAngeles,
  harlem: harlem,
  bronx: bronx,
  chicago: chicago,
  brooklyn: brooklyn,
  sanAntonio: sanAntonio,
  miami: miami
};





function refresh_view() {
    /* status bar */
    // $("#player_name").text(player.name);
    $("#cash").text(player.money);
    $("#days_left").text(player.days_left);

    $("#debt").text(player.debt);

    /* inventory box */
    $("#price_list .drug").each(function() {
      $(this).find('.qty').text(player.inventory[$(this).attr("id")]);
    });
    // $("#buy_modal input").attr('placeholder', supply.can_buy)

    $('.buy-modal').text(supply.current_item);
    $("#buy_modal .subtotal").text( '$' + supply.current_price);
    $('.sell-modal').text(supply.current_item);
    $('#space').text(player.space)
}

function move_to(place) {
    player.advance_day();
    place = location_map[place];
    price_list = place.get_price_list();
    // player.price_list = price_list;
// console.log(price_list)
    $(".location").text(place.name);

    $("#price_list .drug").each(function () {
        $(this).find('.price').text('$' + price_list[$(this).attr("id")]);
    });

    refresh_view();
 
}

function deal_item(item) {
    $('#deal_modal').css('display', 'block')
    $("#deal_modal header h2").text(item).css('textTransform', 'capitalize');
    supply.current_item = item;
}

function buy_verify(){
    price = price_list[supply.current_item];
    if(price < player.money){
        $('#deal_modal').css("display", "none");
        $('#buy_modal').css('display', 'block');
        $("#buy_modal input").val(1);
        buy_Info(1);
    }else {
        alert("GET MONEY FIRST DUH");
    }
}

function buy_Info(item) {
    if (supply.current_item in price_list) { //this will just straight up crash, meh.
        price = price_list[supply.current_item];
        // player.max_items = Math.floor(player.money / price);
        var max_items = Math.floor(player.money / price);
        supply.can_buy = max_items;
        if(max_items > player.space)supply.can_buy = player.space 
        supply.current_price = price * item;
        $("#buy_modal input").attr('max', supply.can_buy)

        refresh_view();
    }
    else {
        alert("GO SOMEWHERE FIRST DUH");
    }
}

function exit_buy(){
    player.money = player.money - ($("#buy_modal input").val() * price);  // pay moneys
    player.inventory[supply.current_item] = player.inventory[supply.current_item] + $("#buy_modal input").val();  // get items
    player.space = player.space - $("#buy_modal input").val();
    refresh_view();
}

function sell_button(item) {
    //sell whole inventory
    if (item in player.price_list) { //this will just straight up crash, meh.
        price = player.price_list[item];
        items = player.inventory[item];
        profit = items * price;
        player.inventory[item] = 0;
        player.money = player.money + profit;
        refresh_view();
    }
    else {
        alert("GO SOMEWHERE FIRST DUH");
    }
}

function submit_loan_shark_request() {
    deposit = parseInt($("#loan_shark_deposit").attr("value"));
    withdraw = parseInt($("#loan_shark_withdraw").attr("value"));

    if (deposit >= 0) {
        player.money = player.money - deposit;
        player.debt = player.debt - deposit;
    }
    else {
        alert(deposit + " is not a number you can deposit with.");
    }

    if (withdraw >= 0) {
        player.money = player.money + withdraw;
        player.debt = player.debt + withdraw;
    }
    else {
        alert(withdraw + " is not a number you can withdraw with.");
    }

    player.money = player.money < 0 ? 0 : player.money;
    player.debt = player.debt < 0 ? 0 : player.debt;

    $("#loan_shark_deposit").attr("value", 0);
    $("#loan_shark_withdraw").attr("value", 0);

    refresh_view();


}

// function render_new_page(caller_id) {
//     /* Turn off the old selected item to turn on the new one*/
//     $(".active").removeClass("active");
//     $("#" + caller_id).addClass("active");

//     /* Un-render the current page and render the new one from the
//      * caller_id
//      */
//     $(".current_page").removeClass("current_page");
//     $("#" + caller_id + "_page").addClass("current_page");
// }

function game_end() {
    /* calculate score and display end page */

    /* add score info to page */
    $(".money_end").text(player.money);
    $(".debt_end").text(player.debt);
    score = player.money - 3 * player.debt;
    $(".score_end").text(score);
    /* conditional coloring of score */
    score_color = (score > 0) ? "green" : "red";
    $(".score_end").css("color", score_color);

    /* show game end */
    $("#game").css("display", "none");
    $("#game_end").css("display", "block");
}

$(document).ready(function () {
    //add click stuff to ui

    /* adding page buttons */

    $("nav a").each(function (i) {
        $(this).click(function (eventObject) {
            render_new_page($(this).attr("id"));
        });
        $(this).css("cursor", "pointer");
    });

    /* adding location movement links */
    $("#locations li a").each(function (i) {
        $(this).click(function (eventObject) {
            move_to($(this).attr("id"));
        });
    });

    /* adding buy buttons */
    $("#price_list li").each(function (i) {
        $(this).click(function (eventObject) {
            deal_item($(this).attr("id"));
        });
    });

    $('#buy_button').on('click', function(){
        buy_verify();
    })

    $('.buy-max').on('click', function () {
        $("#buy_modal input").val(supply.can_buy);
        buy_Info(supply.can_buy);
    })

    $('.exit-buy').on('click', function () {
        exit_buy();
    })

    $('#sell_button').on('click', function () {
        $('#deal_modal').css("display", "none");
        $('#sell_modal').css('display', 'block');
    })

    $("#jet_modal li button").each(function(i) {
      $(this).click(function(eventObject) {
        $("#jet_modal").css("display", "none");
        move_to($(this).attr("id"))
      });
    });

    $("#buy_modal input").on('input', function () {
        buy_Info($(this).val())          
    });

    $("#sell_modal input").on('input', function () {
        sell_button($(this).val())          
    });
    // /* adding sell buttons */
    // $("#sell_list li a").each(function (i) {
    //     $(this).click(function (eventObject) {
    //         sell_button($(this).attr("id"));
    //     });
    // });
   
    

    /* first refresh */
    refresh_view();

});
