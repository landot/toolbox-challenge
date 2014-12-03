/**
 * Created by iguest on 12/2/14.
 */

var tileArray = [];
var matchNumber = 0;
var remainingPairs = 8;
var missed = 0;
var tilesBeingUsed = [];

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

        






    });
});