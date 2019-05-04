(function(window, document, $, undefined){
	
	'use strict';

	window.myPrefix = {};

	myPrefix.init = function() {


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
            var acidPrice = getRandomPrice(1000, 4499);
            var cocainePrice = getRandomPrice(15000, 29999);
            var ecstasyPrice = getRandomPrice(10, 59);
            var pcpPrice = getRandomPrice(1000, 3499);
            var heroinPrice = getRandomPrice(5000, 13999);
            var weedPrice = getRandomPrice(300, 899);
            var speedPrice = getRandomPrice(600, 1349);
            var shroomsPrice = getRandomPrice(600, 1349);
            var hashishPrice = getRandomPrice(70, 249);
            var ludesPrice = getRandomPrice(70, 249);
            var peyotePrice = getRandomPrice(70, 249);


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
        this.max_space = 30;
        this.space = 30;
        this.bank = 0;
        this.health = 100;
        this.bitches = 0;
        this.guns = 0;
        this.total_guns = 2;
        this.bullets = 0;
        this.police = 0;
        this.police_limit = 0;
        this.fight_turn = 1; 

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
        this.can_sell = 0;
        this.price_list;
        this.hospital_check = 0;
        this.current_stuff;
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

    function healthColor(health){
        var color = 'red';
        if (health > 66) color = 'green';
        else if (health > 49) color = '#73d100';
        else if (health > 33) color = 'orange';
        else if (health > 16) color = '#ff5400';
    
        return color;
    }

    function refresh_view() {
        /* status bar */
        // $("#player_name").text(player.name);
        $("#cash").text(player.money);
        $("#days_left").text(player.days_left);
        $("#bank").text(player.bank);
        $("#debt").text(player.debt);
        $(".debt-row").css('color', player.debt ? 'red': 'white');
        $(".progress-bar-2").css('width', player.health + '%');
        $(".progress-bar-2").css('background', healthColor(player.health));
        $(".progress-bar-2").text(player.health + '%');
        $(".health").text(player.health + '%');
        if(player.health <= 0){
            game_end();
        }
        /* inventory box */
        $("#price_list .drug").each(function() {
            $(this).find('.qty').text(player.inventory[$(this).attr("id")]);
        });
        $("#inventory_list .drug-i").each(function() {
            $(this).find('.qty').text(player.inventory[$(this).attr("id")]);
        });
        $("#inventory_list #bullet .qty").text(player.bullets);
   
        $("#buy_modal input").attr('max', supply.can_buy)
        $("#sell_modal input").attr('max', supply.can_sell)
        $('.buy-modal').text(supply.current_item).css('text-transform', 'capitalize');
        $("#buy_modal .subtotal").text( '$' + supply.current_price);
        $("#sell_modal .subtotal").text( '$' + supply.current_price);
        $('.sell-modal').text(supply.current_item);
        $('#space').text(player.space);
        $('#guns').text(player.guns);
        $('#bitches').text(player.bitches);
    }

    function drug_ability() {
        $('.drug').show().addClass('active');
        $('.drug').each(function(index){
            var chance = Math.floor(Math.random() * 8);
            if(!chance)$(this).hide().removeClass('active');
        });
    }

    function daily_bust() {
        var arr = [];
        $('.drug.active').each(function(index){
            arr.push($(this).attr('id'));
        });

        var l = arr.length;
        var chance = Math.floor(Math.random() * l);
        var bust = arr[chance];
        var bust_drop = Math.floor(Math.random() * 2);
        
        var old_price = supply.price_list[bust];
        var new_price = 0;
        switch(bust){
            case 'acid':
                new_price = drop_bust(bust, old_price, bust_drop, 17, 25, 0, 1, 4, 8);
            break;
            case 'cocain':
                new_price = drop_bust(bust, old_price, bust_drop, 35, 35, 1, 1, 4, 8);
            break;
            case 'ecstasy':
                new_price = drop_bust(bust, old_price, bust_drop, 13, 11, 1, 0, 4, 8);
            break;
            case 'pcp':
                new_price = drop_bust(bust, old_price, bust_drop, 20, 20, 1, 1, 4, 8);
            break;
            case 'heroin':
                new_price = drop_bust(bust, old_price, bust_drop, 25, 25, 1, 1, 4, 8);
            break;
            case 'weed':
                new_price = drop_bust(bust, old_price, bust_drop, 13, 10, 1, 0, 4, 4);
            break;
            case 'speed':
                new_price = drop_bust(bust, old_price, bust_drop, 15, 20, 1, 1, 4, 8);
            break;
            case 'shrooms':
                new_price = drop_bust(bust, old_price, bust_drop, 17, 20, 1, 0, 4, 8);
            break;
            case 'hashish':
                new_price = drop_bust(bust, old_price, bust_drop, 13, 25, 1, 0, 4, 4);
            break;
            case 'ludes':
                new_price = drop_bust(bust, old_price, bust_drop, 20, 20, 1, 1, 4, 8);
            break;
            case 'peyote':
                new_price = drop_bust(bust, old_price, bust_drop, 25, 25, 1, 0, 4, 8);
            break;
        }

        supply.price_list[bust] = new_price;
        console.log(old_price, new_price);
        return new_price == old_price ? true : false;  
    }

    function drop_bust(bust, price, bust_drop, prob1, prob2, op1, op2, bust1, bust2) {
        var new_price = price;
        if(bust_drop) {
            var chance = Math.floor(Math.random() * prob1);
            if(!chance){
                if(op1){
                    new_price = new_price * bust1 ;
                    $('#msg .message-text').text('Cops confiscate a shipment of ' + bust + ', prices go up');
                }else {
                    new_price = new_price / bust1 ;
                    $('#msg .message-text').text('The market has been flooded with homemade ' + bust + '. Prices have gone down.');
                }
                
            }
        } else {
            var chance = Math.floor(Math.random() * prob2);
            if(!chance){
                if(op2){
                    new_price = new_price * bust2 ;
                    $('#msg .message-text').text('Addicts are buying ' + bust + ' at outrageous prices');
                }else {
                    new_price = new_price / bust2 ;
                    $('#msg .message-text').text('At the moment there`s a lot of cheap ' + bust + ' on the streets.');
                }
            }
        }
        return new_price;
    }

    function move_to(place) {
        var placeId = place;
        player.advance_day();
        var place = location_map[place];
        supply.price_list = place.get_price_list();

        $(".location").text(place.name);

        $("#price_list .drug").each(function () {
            $(this).find('.price').text('$' + supply.price_list[$(this).attr("id")]);
        });

        $('.bottom-button').hide();
        if(place.name == 'Miami') $('.button-bank').show();
        if(place.name == 'Bronx') $('.button-shark').show();
        if(place.name == 'San Antonio') $('.button-hospital').show();

        $('.city').prop( "disabled", false );
        $('#'+ placeId).prop( "disabled", true );

        drug_ability();
        var msg_bust = daily_bust();
        if(msg_bust){ msg_1();}
        else  {$('#msg').show();}
        refresh_view();
    }

    function msg_1(){
        // 1 in 3 to get a dayly mesage #1
        var random_daily = Math.floor(Math.random() * 3);
        if(!random_daily){
            daily_msg(player, msg_list);
            $('#msg').show();
        }else{
            msg_2();
        }
    }

    function msg_2(){
        // 1 in 7 chance to get bust by cops or get offered some stuff
        var rnd = Math.floor(Math.random() * 7);
        console.log('msg_2' ,rnd)
            if(!rnd){
                console.log('chance to fight')
                var drug = 0;
                for( var item in player.inventory){
                    console.log(player.inventory[item])
                    drug = drug + player.inventory[item];
                }
                console.log('you have druges ', drug)
                // No drugs no bust
                if(drug) go_fight();

            }else if(rnd == 1){
                stuff_to_buy(stuff_list)
                $('#stuff').show();
            }
    }


    function daily_msg(player, msg) {
       
        var n = msg.length
        var random_item = Math.floor(Math.random() * n);
        var item = msg[random_item]
        $('#msg .message-text').text(item.text);
        if(item.item == "health"){player.health = player.health - item.amount;}
        else if(item.item == 'money'){player.money = player.money + item.amount;}
        else{ 
            player.inventory[item.item] = parseInt(player.inventory[item.item]) + parseInt(item.amount);
            player.space = parseInt(player.space) - parseInt(item.amount);
        }
        refresh_view();
    }

    function go_fight(){
        player.police = player.police + 1;
        $('.fight-text').text('Police find you');
        $('#fight .fight').hide();
        $('#fight .pre-fight').show();
        $('#fight .run').show();
        $('#fight .surrender').show();
        $('#fight').show();
        $('#fight .go').hide();
        // console.log('go_fight #cops', player.police)
    }

    function pre_fight(){
        // console.log('pre_fight #cops', player.police)
        $('.fight-text').text( player.police + ' police shooting');
        $('#fight .fight').show();
        $('#fight .pre-fight').hide();
        $('#fight .run').show();
        $('#fight .surrender').show();
        $('#fight .go').hide();
    }

    function fight() {
        // console.log('fight #cops', player.police)
        // console.log('fight health', player.health)
        if(player.police == 0){
            $('.fight-text').text('Now is safe to go');
            $('#fight .go').show();
            $('#fight .fight').hide();
            $('#fight .pre-fight').hide();
            $('#fight .run').hide();
            $('#fight .surrender').hide();
            refresh_view();
        } else {
            // console.log('fight turn', player.fight_turn)
            if(player.fight_turn){
                // No guns you cant fight
                if(player.guns && player.bullets){
                    var random_shoot = Math.floor(Math.random() * 4);
                    // console.log('fight you random_shoot', random_shoot)
                    if(random_shoot){
                        $('.fight-text').text('You kill one police');
                        player.police = player.police - 1;
                    } else{
                        $('.fight-text').text('You miss');
                    }

                    player.bullets = player.bullets - 1;
                    if(player.bullets <= 30) player.guns = 5;
                    if(player.bullets <= 24) player.guns = 4;
                    if(player.bullets <= 18) player.guns = 3;
                    if(player.bullets <= 12) player.guns = 2;
                    if(player.bullets <= 6) player.guns = 1;
                    if(!player.bullets) {
                        player.guns = 0;
                        $('.fight-text').text('You are out of bullets');
                    }
                    
                } else {
                    $('.fight-text').text('You have no guns to fight');
                }
                player.fight_turn = 0;
                $('#fight .fight').hide();
                $('#fight .pre-fight').show();
            } else {
                var random_shoot = Math.floor(Math.random() * 6);
                // console.log('fight police random_shoot', random_shoot)
                if(random_shoot){
                    if(player.bitches){
                        bitch_gone();
                        $('.fight-text').text('Cop kill one of your bitches');
                    }else{
                        $('.fight-text').text('A shoot gunt has reach you');
                        player.health = player.health - 15;
                        refresh_view();
                    }
                    
                    
                } else{
                    $('.fight-text').text('Police shoot but miss');
                }
                player.fight_turn = 1;
                $('#fight .fight').hide();
                $('#fight .pre-fight').show();
            }
        }
    }

    function run(){
        var random_run = Math.floor(Math.random() * 15);
        // console.log('run', random_run)
        if(!random_run) {
            surrender();
        } else if(random_run == 1 || random_run == 2){
            no_scape();
        } else {
            $('.fight-text').text('You scape from the cops');
            $('#fight .go').show();
            $('#fight .fight').hide();
            $('#fight .pre-fight').hide();
            $('#fight .run').hide();
            $('#fight .surrender').hide();
        }
    }

    function no_scape(){
        console.log('no scape')
        $('.fight-text').text('No scape, you have to fight');
        $('#fight .go').hide();
        $('#fight .fight').hide();
        $('#fight .pre-fight').show();
        $('#fight .run').hide();
        $('#fight .surrender').hide();
    }

    function surrender(){
        $('.fight-text').text('Police catch you, take all your stuff and put you in jail 3 days');
        player.money = 0;
        player.days_left = player.days_left - 3;
        for( var item in player.inventory){
            player.inventory[item] = 0;
        }
        player.space = player.max_space;
        $('#fight .go').show();
        $('#fight .fight').hide();
        $('#fight .pre-fight').hide();
        $('#fight .run').hide();
        $('#fight .surrender').hide();
        refresh_view();
    }

    function stuff_to_buy(stuff) {
       
        var n = stuff.length
        var random_item = Math.floor(Math.random() * n);
        var item = stuff[random_item]
        $('#stuff .buy-stuff-text').text(item.text);
        supply.current_stuff = item;
    }

    function buy_stuff() {
        if(player.money >= supply.current_stuff.cost){
            console.log(supply.current_stuff)
            player.money = player.money - supply.current_stuff.cost;
            if(supply.current_stuff.item == "space"){
                player.space = player.space + supply.current_stuff.amount;
                player.max_space = player.max_space + supply.current_stuff.amount;
            }
            else if(supply.current_stuff.item == 'guns'){
                if(player.total_guns >= player.guns + supply.current_stuff.amount){
                    player.guns = player.guns + supply.current_stuff.amount;
                    player.bullets = player.bullets + 6;
                }else {
                    alert("YOU DON'T HAVE ENOUGHT SPACE");
                }
            }
            else if(supply.current_stuff.item == 'bitches'){ 
                player.bitches = player.bitches + supply.current_stuff.amount;
                player.total_guns = player.total_guns + 1;
                player.space = player.space + 10;
                player.max_space = player.max_space + 10;
            }
            refresh_view();
        }else {
            alert("YOU DON'T HAVE ENOUGHT MONEY");
        }
        
    }

    function bitch_gone(){
        if(player.bitches){
            player.bitches = player.bitches - 1 ;
            player.total_guns = player.total_guns - 1;
            player.bullets = player.bullets - 6;
            player.space = player.space - 10;
            player.max_space = player.max_space - 10;
            player.money = player.money - Math.floor((player.money/10));

            // remove_inventory_items();

            var virtual_space = 10;
            for( var item in player.inventory){
                if( player.inventory[item]){
                    if(virtual_space >= player.inventory[item]){ 
                        virtual_space = virtual_space - player.inventory[item];
                        player.space = player.space + player.inventory[item];
                        player.inventory[item] = 0;
                    } else {
                        player.inventory[item] = player.inventory[item] - virtual_space;
                        player.space = player.space + virtual_space;
                        virtual_space = 0;
                    }
                }
                
            }
        }
    }

    function deal_item(item) {
        if(player.days_left != 31){
            $('#deal_modal').css('display', 'block')
            $("#deal_modal header h2").text(item).css('textTransform', 'capitalize');
            supply.current_item = item;
        } else {
            alert("FLIGHT SOMEWERE FIRST");
        }
        
    }

    function buy_verify(){
        var price = supply.price_list[supply.current_item];
        if(price < player.money){
            $('#deal_modal').css("display", "none");
            $('#buy_modal').css('display', 'block');
            $("#buy_modal input").val(1);
            buy_info(1);
        }else {
            alert("GET MONEY FIRST DUH");
        }
    }

    function buy_info(item) {
        // if (supply.current_item in price_list) { //this will just straight up crash, meh.
            var price = supply.price_list[supply.current_item];
            // player.max_items = Math.floor(player.money / price);
            var max_items = Math.floor(player.money / price);
            supply.can_buy = max_items;
            if(max_items > player.space)supply.can_buy = player.space 
            supply.current_price = price * item;
            refresh_view();
        // }
        // else {
        //     alert("GO SOMEWHERE FIRST DUH");
        // }
    }

    function exit_buy(){
        if($("#buy_modal input").val() <= supply.can_buy){
            var price = supply.price_list[supply.current_item];
            player.money = player.money - ($("#buy_modal input").val() * price);  // pay moneys
            player.inventory[supply.current_item] = parseInt(player.inventory[supply.current_item]) + parseInt($("#buy_modal input").val());  // get items
            player.space = player.space - $("#buy_modal input").val();
            refresh_view();
        }
        else {
            alert("YOU CAN'T BUY TOO MUCH");
        }
        
    }

    function sell_verify(){
        if (parseInt(player.inventory[supply.current_item])) {
            $('#deal_modal').css("display", "none");
            $('#sell_modal').css('display', 'block');
            $("#sell_modal input").val(1);
            sell_info(1);
        }else {
            alert("NOTHING TO SELL");
        }
    }

    function sell_info(item) {
            var price = supply.price_list[supply.current_item];
            supply.current_price = item * price;
            supply.can_sell = player.inventory[supply.current_item];
            refresh_view();

    }

    function exit_sell(){
        if($("#sell_modal input").val() <= supply.can_sell){
            player.inventory[supply.current_item] = parseInt(player.inventory[supply.current_item]) - parseInt($("#sell_modal input").val());
            player.money = player.money + supply.current_price;
            player.space = player.space + parseInt($("#sell_modal input").val());
            refresh_view();
        }
        else {
                alert("YOU CAN'T SELL TOO MUCH");
            }
    }

    function bank_save(){
        if($("#bank_modal input").val() <= player.money){
            player.money = parseInt(player.money) - parseInt($("#bank_modal input").val());
            player.bank = parseInt(player.bank) + parseInt($("#bank_modal input").val());
            refresh_view();
        }else {
            alert("YOU CAN'T SAVE THAT AMOUNT");
        }
    }

    function bank_withdraw(){
        if($("#bank_modal input").val() <= player.bank){
            player.money = parseInt(player.money) + parseInt($("#bank_modal input").val());
            player.bank = parseInt(player.bank) - parseInt($("#bank_modal input").val());
            refresh_view();
        }else {
            alert("YOU CAN'T WITHDRAW THAT AMOUNT");
        }
    }

    function shark_pay(){
        if($("#shark input").val() <= player.money && $("#shark input").val() <= player.debt){
            player.money = parseInt(player.money) - parseInt($("#shark input").val());
            player.debt = parseInt(player.debt) - parseInt($("#shark input").val());
            refresh_view();
        }else {
            alert("YOU CAN'T PAY THAT MUCH");
        }
    }

    function shark_loan(){
        if($("#shark input").val() > 0){
            player.money = parseInt(player.money) + parseInt($("#shark input").val());
            player.debt = parseInt(player.debt) + parseInt($("#shark input").val());
            refresh_view();
        }else {
            alert("YOU CAN'T HAVE NOTHING");
        }
    }

    function pay_hospital(){
        if(player.health == 100)return;
 
        if($("#hospital input").val() == supply.hospital_check){
            player.money = parseInt(player.money) - parseInt($("#hospital input").val());
            player.health = 100;
            refresh_view();
        }else {
            alert("I'AM AFRAID YOUR CREDIT IS ALSO UNHEALTHY");
        }
    }

    function game_end() {
        /* calculate score and display end page */

        /* add score info to page */
        var score = 0;
        var score_color = '';
        $(".money_end").text('Money: ' +  player.money);
        $(".debt_end").text('Debt: ' + player.debt);
        score = player.money - player.debt;
        $(".score_end").text('Score: ' + score);
        /* conditional coloring of score */
        score_color = (score > 0) ? "green" : "red";
        $(".score_end").css("color", score_color);

        /* show game end */
        // $("#game").css("display", "none");
        $("#game_end").show();
    }



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
        buy_info(supply.can_buy);
    })

    $('.exit-buy').on('click', function () {
        exit_buy();
    })

    $('#sell_button').on('click', function () {
        sell_verify();
    })

    $('.sell-max').on('click', function () {
        $("#sell_modal input").val(supply.can_sell);
        sell_info(supply.can_sell);
    })

    $('.exit-sell').on('click', function () {
        exit_sell();
    })

    $("#buy_modal input").on('input', function () {
        buy_info($(this).val())          
    });

    $("#sell_modal input").on('input', function () {
        sell_info($(this).val())          
    });

    $("#jet_modal li button").each(function(i) {
        $(this).click(function(eventObject) {
            $("#jet_modal").css("display", "none");
            move_to($(this).attr("id"))
        });
    });


    $("#bank_modal .save-money").on('click', function() {
    bank_save();
    });

    $("#bank_modal .withdraw-money").on('click', function() {
        bank_withdraw();
    });

    $(".button-bank").on('click', function() {
        $("#bank_modal input").val(1)
    }); 

    $(".button-hospital").on('click', function() {
        supply.hospital_check = Math.floor(Math.random() * 20000) + 100;
        $("#hospital .subtotal-hospital").text('$' + supply.hospital_check);
        $("#hospital input").val(1);
    }); 

    $(".button-shark").on('click', function() {
        $("#shark input").val(1);
    }); 

    $("#shark .pay-loan").on('click', function() {
        shark_pay();
    });

    $("#shark .loan").on('click', function() {
        shark_loan();
    });

    $("#msg button").on('click', function() {
        msg_2();
    });

    $("#hospital .pay_check").on('click', function() {
        pay_hospital()
    });

    $(".buy_stuff").on('click', function() {
        buy_stuff();
    });

    $(".fight").on('click', function() {
        fight();
    });

    $(".pre-fight").on('click', function() {
        pre_fight();
    });

    $(".run").on('click', function() {
        run();
    });

    $(".surrender").on('click', function() {
        surrender();
    });

    $(".go").on('click', function() {
        $('#fight').hide();
    });

    $('.bottom-button').hide();

    /* first refresh */
    refresh_view();

    // });

    var msg_list = [
        {
            text: 'You find a dead body with $100.',
            item: 'money',
            amount: 100,
        },
        {
            text: 'Stranger said: Police is following you.',
            item: '',
            amount: 0,
        },
        {
            text: 'You have sex with a hooker last night, better check in your pipi.',
            item: 'health',
            amount: 30,
        },
        {
            text: 'You found 5 bags of cocaine in a bar bathroom.',
            item: 'cocain',
            amount: 10,
        },
        {
            text: 'Sometimes I feel like someone`s playing my life on a phone game in the bathroom.',
            item: '',
            amount: 0,
        },
        {
            text: 'A stranger yells at you from across the street: Who needs graphics!?',
            item: '',
            amount: 0,
        },
        {
            text: 'Konk the door three times at Brooklin, may seve you.',
            item: '',
            amount: 0,
        },
        {
            text: 'The DEA suspects large bank accounts. Be careful.',
            item: '',
            amount: 0,
        },
    ]

    var stuff_list = [
        {
            text: 'You can buy an exta coat for 200 and have 10 more space',
            item: 'space',
            amount: 10,
            cost: 200,
        },
        {
            text: 'You can buy a gun for 200 ',
            item: 'guns',
            amount: 1,
            cost: 200,
        },
        {
            text: 'You can hire a prostitute to work with you for $200',
            item: 'bitches',
            amount: 1,
            cost: 200,
        },
    ]

}

myPrefix.init();

})(window, document, jQuery);