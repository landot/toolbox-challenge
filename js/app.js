/**
 * Created by iguest on 12/2/14.
 */

var tileArray = [];
var matchNumber = 0;
var remainingPairs = 8;
var missed = 0;
var tilesBeingUsed = [];
var timeCount;

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
        matchNumber += 1;
        missed = 0;
        remainingPairs = 8;
        console.log('game has started');
        //randomly picks 8 of the 32 tiles
        tileArray = _.sample(tileArray, 8);
        //puts the chosen tiles along with a clone of each in a new array
        _.forEach(tileArray, function(tile) {
            tilesBeingUsed.push(tile);
            tilesBeingUsed.push(_.clone(tile))
        })
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

        var startTime = Date.now();
        timeCount = window.setInterval(function() {
            var timer = (Date.now() - startTime) / 1000;
            timer = Math.floor(timer);
            $('#timeElapsed').text(timer + ' seconds');
        }, 1000);

    });
});