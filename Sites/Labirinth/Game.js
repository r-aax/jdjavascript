// Game.js - game labirinth main logic class.
//
// Copyright Joy Developing.

//--------------------------------------------------------------------------------------------------
// Create.
//--------------------------------------------------------------------------------------------------

// Create game.
//
// Arguments:
//   doc - document.
function Game(doc)
{
    this.GetDocument = function() { return doc; }

    // Create board.
    this.GetBoard();
}

//--------------------------------------------------------------------------------------------------

// Get game board.
//
// Result:
//   Board of game.
Game.prototype.GetBoard = function()
{
    if (this.Board == undefined)
    {
        var drawer = new Drawer("canvas", 10, 10, false, true);
        this.Board = new Board(10, 10, drawer);
    }

    return this.Board;
}

//--------------------------------------------------------------------------------------------------

