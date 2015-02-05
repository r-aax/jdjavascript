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
        500
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

// Check if figure position is correct.
Game.prototype.IsFigureCorrect = function()
{
    var cells = this.Figure.Cells();

    for (var i in cells)
    {
        var c = cells[i];

        if ((c.R < this.Board.MinRow) || (c.R > this.Board.MaxRow)
            || (c.C < this.Board.MinCol) || (c.C > this.Board.MaxCol)
            || (this.Board.M[c.R][c.C] != undefined))
        {
            return false;
        }
    }

    return true;
}

//--------------------------------------------------------------------------------------------------

// Right with check.
//
// Result:
//   true - if we have moved,
//   false - otherwise.
Game.prototype.RightWithCheck = function()
{
    var save = this.Figure.Clone();

    this.Figure.Right();
    if (!this.IsFigureCorrect())
    {
        this.Figure = save;

        return false;
    }

    return true;
}

//--------------------------------------------------------------------------------------------------

// Left with check.
//
// Result:
//   true - if we have moved,
//   false - otherwise.
Game.prototype.LeftWithCheck = function()
{
    var save = this.Figure.Clone();

    this.Figure.Left();
    if (!this.IsFigureCorrect())
    {
        this.Figure = save;

        return false;
    }

    return true;
}

//--------------------------------------------------------------------------------------------------

// Down with check.
//
// Result:
//   true - if we have moved,
//   false - otherwise.
Game.prototype.DownWithCheck = function()
{
    var save = this.Figure.Clone();

    this.Figure.Down();
    if (!this.IsFigureCorrect())
    {
        this.Figure = save;

        return false;
    }

    return true;
}

//--------------------------------------------------------------------------------------------------

// Rotate with check.
//
// Result:
//   true - if we have rotated,
//   false - otherwise.
Game.prototype.RotWithCheck = function()
{
    var save = this.Figure.Clone();

    this.Figure.RotL();
    if (!this.IsFigureCorrect())
    {
        this.Figure = save;

        return false;
    }

    return true;
}

//--------------------------------------------------------------------------------------------------

// Fix figure on board.
Game.prototype.FixFigure = function()
{
    var cells = this.Figure.Cells();

    for (var i in cells)
    {
        this.Board.M[cells[i].R][cells[i].C] = this.Figure.Color;
    }
}

//--------------------------------------------------------------------------------------------------

// Game step.
Game.prototype.Step = function()
{
    JD.Utils.Check(this.Figure != undefined);

    if (!this.DownWithCheck())
    {
        this.FixFigure();
        this.Board.RemoveFullLines();
        this.CreateNewFigure();
    }
}

//--------------------------------------------------------------------------------------------------

