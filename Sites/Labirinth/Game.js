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

    // Status - the game is started.
    this.Status = "start";
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

// Check if human left from exit.
//
// Result:
//   true - if human is left from exit,
//   false - if human is not left from exit.
Game.prototype.IsHumanLeftFromExit = function()
{
    return (this.GetHumanRow() == this.GetBoard().GetMaxRow())
           && (this.GetHumanCol() == this.GetBoard().GetMaxCol());
}

//--------------------------------------------------------------------------------------------------
// Draw.
//--------------------------------------------------------------------------------------------------

// Draw.
//
// Arguments:
//   is_draw_human - is needed to draw human.
Game.prototype.Draw = function(is_draw_human)
{
    this.GetBoard().Draw();

    if (is_draw_human)
    {
        this.GetBoard().GetCell(this.GetHumanRow(), this.GetHumanCol()).DrawHuman();
    }

    // Information.
    this.Info.SetFillColor("lightgray");
    this.Info.Fill();
    this.Info.SetColor("#444444");
    this.Info.DrawRect(0, 0, 10, 2);
    this.Info.DrawLine(5, 0, 5, 2);
    this.Info.SetFillColor("#444444");
    this.Info.SetFont("bold 12px lucida console");
    this.Info.DrawText(1.5, 1.2, "Labirinth");
    this.Info.SetFont("12px lucida console");
    this.Info.SetFillColor("steelblue");
    this.Info.DrawText(0.2, 0.4, "joydeveloping@gmail.com");

    if (this.IsEnd())
    {
        with (this.GetBoard().GetDrawer())
        {
            var cx = this.GetDocument().getElementById("canvas").width / 2;
            var cy = this.GetDocument().getElementById("canvas").height / 2;

            SetFillColor("darkgrey");
            SetColor("#333333");
            FillRectCenteredI(cx, cy - 5, 320, 40);
            DrawRectCenteredI(cx, cy - 5, 320, 40);
            SetFillColor("#932510");
            SetFont("bold 20px lucida console");
            DrawTextCenteredI(cx, cy, "Press SPACE to play again");
        }
    }
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
// Game status.
//--------------------------------------------------------------------------------------------------

// Check if game is started.
//
// Result:
//   true - if game is started,
//   false - if game is not started.
Game.prototype.IsStart = function()
{
    return this.Status == "start";
}

//--------------------------------------------------------------------------------------------------

// Check if game is ended.
//
// Result:
//   true - if game is ended,
//   false - if game is not ended.
Game.prototype.IsEnd = function()
{
    return this.Status == "end";
}

//--------------------------------------------------------------------------------------------------

