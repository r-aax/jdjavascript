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

    // Info.
    this.Info = new Drawer("info", 10, 2, false, true);
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

// Get human row.
//
// Result:
//   Row of human position.
Game.prototype.GetHumanRow = function()
{
    if (this.HumanRow == undefined)
    {
        this.HumanRow = 0;
    }

    return this.HumanRow;
}

//--------------------------------------------------------------------------------------------------

// Get human col.
//
// Result:
//   Col of human position.
Game.prototype.GetHumanCol = function()
{
    if (this.HumanCol == undefined)
    {
        this.HumanCol = 0;
    }

    return this.HumanCol;
}

//--------------------------------------------------------------------------------------------------
// Draw.
//--------------------------------------------------------------------------------------------------

// Draw.
Game.prototype.Draw = function()
{
    this.GetBoard().Draw();
    this.GetBoard().GetCell(this.GetHumanRow(), this.GetHumanCol()).DrawHuman();

    // Information.
    this.Info.SetFillColor("lightgray");
    this.Info.Fill();
}

//--------------------------------------------------------------------------------------------------
// Navigation.
//--------------------------------------------------------------------------------------------------

// Check can human go right.
//
// Result:
//   true - if human can go right,
//   false - if human can not go right.
Game.prototype.IsGoRight = function()
{
    var row = this.GetHumanRow();
    var col = this.GetHumanCol();

    return (col < this.GetBoard().GetMaxCol())
           && !this.GetBoard().GetCell(row, col).IsRightWall();
}

//--------------------------------------------------------------------------------------------------

// Check can human go left.
//
// Result:
//   true - if human can go left,
//   false - if human can not go left.
Game.prototype.IsGoLeft = function()
{
    var row = this.GetHumanRow();
    var col = this.GetHumanCol();

    return (col > this.GetBoard().GetMinCol())
           && !this.GetBoard().GetCell(row, col).IsLeftWall();
}


//--------------------------------------------------------------------------------------------------

// Check can human go up.
//
// Result:
//   true - if human can go up,
//   false - if human can not go up.
Game.prototype.IsGoUp = function()
{
    var row = this.GetHumanRow();
    var col = this.GetHumanCol();

    return (row < this.GetBoard().GetMaxRow())
           && !this.GetBoard().GetCell(row, col).IsUpWall();
}

//--------------------------------------------------------------------------------------------------

// Check can human go down.
//
// Result:
//   true - if human can go down,
//   false - if human can not go down.
Game.prototype.IsGoDown = function()
{
    var row = this.GetHumanRow();
    var col = this.GetHumanCol();

    return (row > this.GetBoard().GetMinRow())
           && !this.GetBoard().GetCell(row, col).IsDownWall();
}

//--------------------------------------------------------------------------------------------------

// Go right.
Game.prototype.GoRight = function()
{
    if (this.IsGoRight())
    {
        this.HumanCol++;
    }
}

//--------------------------------------------------------------------------------------------------

// Go left.
Game.prototype.GoLeft = function()
{
    if (this.IsGoLeft())
    {
        this.HumanCol--;
    }
}

//--------------------------------------------------------------------------------------------------

// Go up.
Game.prototype.GoUp = function()
{
    if (this.IsGoUp())
    {
        this.HumanRow++;
    }
}

//--------------------------------------------------------------------------------------------------

// Go down.
Game.prototype.GoDown = function()
{
    if (this.IsGoDown())
    {
        this.HumanRow--;
    }
}

//--------------------------------------------------------------------------------------------------

