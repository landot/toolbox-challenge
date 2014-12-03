/**
 * Created by iguest on 12/2/14.
 */

var tileArray = [];
var matchNumber = 0;
var remainingPairs = 8;
var missed = 0;
var tilesBeingUsed = [];
var timeCount;
var storedPicture;
var canClick = true;
var doneLoading;

var i;
for(i = 1; i <= 32; i++) {
    tileArray.push({
        idNumber: i,
        imagesrc: 'img/tile' + i + '.jpg',
        tileClicked: false,
        tileMatched: false
    });
}

$(document).ready(function() {
    $('#begin').click(function() {
        $('#win').css('display', 'none');
        tilesBeingUsed = [];
        matchNumber = 0;
        missed = 0;
        remainingPairs = 8;
        storedPicture = null;
        console.log('game has started');
        //randomly picks 8 of the 32 tiles
        tileArray = _.sample(tileArray, 8);
        //puts the chosen tiles along with a clone of each in a new array
        _.forEach(tileArray, function(tile) {
            tilesBeingUsed.push(tile);
            tilesBeingUsed.push(_.clone(tile))
        });
        //shuffles the new tiles
        tilesBeingUsed = _.shuffle(tilesBeingUsed);

        //selects board from the html file
        var board = $('#board');
        var row = $(document.createElement('div'));
        var img;

        //creates the 4x4 grid of pictures
        _.forEach(tilesBeingUsed, function(tile, elemIndex) {
            if(elemIndex > 0 && 0 == elemIndex % 4) {
               board.append(row);
               row = $(document.createElement('div'));
            }
            img = $(document.createElement('img'));

            img.attr({
                src: 'img/tile-back.png',
                alt: 'tile ' + tile.idNumber
           });

            img.data('tile', tile);
            row.append(img);
        });

        board.append(row);

        //sets up the timer for when the game starts
        var startTime = Date.now();
        timeCount = window.setInterval(function() {
            var timer = (Date.now() - startTime) / 1000;
            timer = Math.floor(timer);
            $('#timeElapsed').text(timer + ' seconds');
        }, 1000);

        doneLoading = true;

        $('#board img').click(function () {
            if(!canClick) {
                return;
            }
            var clickedImg = $(this);
            var tile = clickedImg.data('tile');
            //flips tile if it hasn't been clicked
            if(!(tile.tileClicked)) {
                flipTile(tile, clickedImg);
                //stores img if first tile clicked
                if(storedPicture == null) {
                    storedPicture = clickedImg;
                }else {
                    //if the two tiles are the same decrease remaining pairs counter
                    //if player wins game displays win message
                    if(storedPicture.data('tile').src == tile.src) {
                        remainingPairs -= 1;
                        storedPicture = null;
                        if(remainingPairs == 0) {
                            $('#win').css('display', 'block');
                        }
                        update();
                    }
                    //sets a 1 second delay from clicking on tiles
                    else {
                        canClick == false;
                        missed++;
                        window.setTimeout(function() {
                            flipTile(tile, clickedImg);
                            flipTile(storedPicture.data('tile'), storedPicture);
                            update();
                        }, 1000);
                        canClick = true;
                    }
                }
            }
        });
        function flipTile(tile, img) {
            img.fadeOut(100, function() {
                if(tile.tileClicked) {
                    img.attr('src', 'img/tile-back.png');
                }
                else {
                    img.attr('src', tile.src);
                }
                tile.flipped = !tile.flipped;
                img.fadeIn(100);

            });
        }
    })
});

function update() {
    $('matchesNumber').text(matchNumber);
    $('incorrectGuesses').text(missed);
    $('pairsLeft').text(remainingPairs);
}

function flipTile(tile, img) {
    img.fadeOut(100, function() {
        if(tile.tileClicked) {
            img.attr('src', 'img/tile-back.png');
        }
        else {
            img.attr('src', tile.src);
        }
        tile.flipped = !tile.flipped;
        img.fadeIn(100);

    });
}




