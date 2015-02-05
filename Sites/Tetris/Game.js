// Game.js - game tetris main logic class.
//
// Copyright Joy Developing.

//--------------------------------------------------------------------------------------------------
// Create.
//--------------------------------------------------------------------------------------------------

// Create game.
//
// Arguments:
//   canvas - canvas of the game,
//   rows - rows count,
//   cols - columns count.
function Game(canvas, rows, cols)
{
    var th = this;

    this.Drawer = new Drawer(canvas, cols, rows, false, true);
    this.Board = new Board(rows, cols, this.Drawer);

    this.CreateNewFigure();
    this.Draw();
    JD.Utils.SetInterval
    (
        function()
        {
            th.Step();
            th.Draw();
        },
        "draw",
        1000
    );
}

//--------------------------------------------------------------------------------------------------
// Drawing.
//--------------------------------------------------------------------------------------------------

// Draw.
Game.prototype.Draw = function()
{
    this.Board.Draw();

    if (this.Figure)
    {
        this.Figure.Draw();
    }
}

//--------------------------------------------------------------------------------------------------
// Logic.
//--------------------------------------------------------------------------------------------------

// Position new figure.
Game.prototype.CreateNewFigure = function()
{
    this.Figure = Figure.RandomFigure(5, 5, this.Drawer);
    this.Figure.Autoposition(this.Board.MaxRow, this.Board.MinCol, this.Board.MaxCol);
}

//--------------------------------------------------------------------------------------------------

// Check possibility to move figure down on 1 cell.
Game.prototype.IsPossibleFigureDown = function()
{
    var cells = this.Figure.Cells();

    for (var i in cells)
    {
        if ((cells[i].R == 0)
            || (this.Board.M[cells[i].R - 1][cells[i].C] != undefined))
        {
            return false;
        }
    }

    return true;
}

//--------------------------------------------------------------------------------------------------

// Game step.
Game.prototype.Step = function()
{
    JD.Utils.Check(this.Figure != undefined);

    if (this.IsPossibleFigureDown())
    {
        this.Figure.Row--;
    }
}

//--------------------------------------------------------------------------------------------------

