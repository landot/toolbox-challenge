//app.js: our main javascript file for this app
"use strict"
var tileArray = [];
var matchesNumber = 0;
var remainingPairs = 8;
var missedNumber = 0;
var storedPicture = null;
var timeCount = null;
var doneLoading = null;

var idx;
//creates an array list of all tiles(only 8 will be used in the end)
for (idx = 1; idx <= 32; idx++) {
    tileArray.push({
        idNumber: idx,
        imagesrc: 'img/tile' + idx + '.jpg',
        tileClicked: false,
        tilematched: false
    });
}

$(document).ready(function() {
    //begins the game for the player
    $('#begin').click(function() {        
        //win message
        $('#win').css('display', 'none');
        clearInterval(timeCount); 
        //makes vars have original values and updates time
        matchesNumber = 0;
        remainingPairs = 8;
        missedNumber = 0;
        update();  

        //picks 8 of the 32 tiles
        tileArray = _.sample(tileArray, 8);
        var tilesBeingUsed = [];
        _.forEach(tilesBeingUsed, function (tile) {
            tilesBeingUsed.push(tile);
            tilesBeingUsed.push(_.clone(tile));
        })
        tilesBeingUsed = _.shuffle(tilesBeingUsed);

        //selects the board from html
        var board = $('#board');
        
        //creates the 4x4 of tiles
        var row = $(document.createElement('div'))
        var img;
        _.forEach(tilesBeingUsed, function (tile, elemIndex) {
            if (elemIndex > 0 && 0 == elemIndex % 4) {
                board.append(row);
                row = $(document.createElement('div'));
            }
            img = $(document.createElement('img'));
            img.attr({
                imagesrc: 'img/tile-back.png',
                alt: 'tile' + tile.tileNum
            });

            //associates each image with a tile
            img.data('tile', tile);

            row.append(img);
        });
        board.append(row);
        
        //sets up timer for when the game starts
        var startTime = Date.now()
        timeCount = window.setInterval(function () {
            var timer = (Date.now() - startTime) / 1000;
            timer = Math.floor(timer);
            $('#timeElapsed').text(timer + ' seconds');
        }, 1000);
        
        doneLoading = true;

        //if a tile is clicked by the player
        $('#board img').click(function () {
            var clickedImg = $(this);
            var tile = clickedImg.data('tile');
            
            //flips the tile if it hasn't been previously picked
            if (!tile.matched && !clickedImg.is(storedPicture) && doneLoading == true) {
                doneLoading = false;
                flipTile(tile, clickedImg);
                check(tile, clickedImg);
            }
            
            update();
            
            //when the user wins. Displays win message
            if(matches == 8){
                $('#win').css('display', 'block');            
            }
        });
    }); 
    
    //updates the stats
    function update() {
        $('#matchesNumber').text(matchesNumber);
        $('#incorrectGuesses').text(missedNumber);
        $('#pairsLeft').text(remainingPairs);
    }

    //flips the clicked tile to show the real image
    function flipTile(tile, img) {
        img.fadeOut(100, function () {

            if (tile.tileClicked) {
                img.attr('imagesrc', 'img/tile-back.png');
            } else {
                img.attr('imagesrc', tile.imagesrc);
            }
            tile.tileClicked = !tile.tileClicked;
            img.fadeIn(100);
        });
    }
    
    //if clicked first. Stores picture
    //if clicked second. Compares the images to see if they are the same
    function check(tile, img) {
        //if clicked second
        if (storedPicture) {
            var storedTile = storedPicture.data('tile');
            var storedImage = storedPicture;
            if (tile.tileNum == storedTile.tileNum) {
                tile.matched = true;
                storedTile.matched = true;
                matches += 1;
                remaining -= 1;
                doneLoading = true;
            } else {
                missed += 1;
                setTimeout(function () {
                    flipTile(tile, img);
                    flipTile(storedTile, storedImage);
                    doneLoading = true;
                }, 1000);
            }
            storedPicture = null;
        //if click first
        } else {
            storedPicture = img;
            doneLoading = true;
        }
    }

});