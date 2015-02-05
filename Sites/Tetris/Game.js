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
//   info - information canvas,
//   rows - rows count,
//   cols - columns count.
function Game(canvas, info, rows, cols)
{
    var th = this;

    this.Drawer = new Drawer(canvas, cols, rows, false, true);
    this.Info = new Drawer(info, 10, 2, false, true);
    this.Board = new Board(rows, cols, this.Drawer);

    // Information.
    this.Speed = 1;
    this.Figures = 0;
    this.Scores = 0;

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

    // Information.
    this.Info.SetFillColor(this.Board.BackColor);
    this.Info.Fill();
    this.Info.SetColor("#444444");
    this.Info.DrawRect(0, 0, 10, 2);
    this.Info.DrawLine(5, 0, 5, 2);
    this.Info.SetFillColor("#444444");
    this.Info.SetFont("bold 12px lucida console");
    this.Info.DrawText(1.3, 1.4, "Tetris");
    this.Info.SetFont("12px lucida console");
    this.Info.SetFillColor("steelblue");
    this.Info.DrawText(0.1, 0.8, "joydeveloping");
    this.Info.DrawText(1.2, 0.2, "@gmail.com");
    this.Info.SetFillColor("#444444");
    this.Info.DrawText(5.3, 1.4, "spd");
    this.Info.DrawText(6.5, 1.4, ": " + (this.Speed + "").Pad(7));
    this.Info.DrawText(5.3, 0.8, "fig");
    this.Info.DrawText(6.5, 0.8, ": " + (this.Figures + "").Pad(7));
    this.Info.DrawText(5.3, 0.2, "sco");
    this.Info.DrawText(6.5, 0.2, ": " + (this.Scores + "").Pad(7));
}

//--------------------------------------------------------------------------------------------------
// Logic.
//--------------------------------------------------------------------------------------------------

// Position new figure.
Game.prototype.CreateNewFigure = function()
{
    this.Figure = Figure.RandomFigure(5, 5, this.Drawer);
    this.Figure.Autoposition(this.Board.MaxRow, this.Board.MinCol, this.Board.MaxCol);
    this.Figures++;
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

// Fix figure and remove lines.
Game.prototype.FixFigureAndRemoveFullLines = function()
{
    this.FixFigure();
    var count = this.Board.RemoveFullLines();
    this.Scores += (count * count);
}

//--------------------------------------------------------------------------------------------------

// Game step.
Game.prototype.Step = function()
{
    JD.Utils.Check(this.Figure != undefined);

    if (!this.DownWithCheck())
    {
        this.FixFigureAndRemoveFullLines();
        this.CreateNewFigure();
    }
}

//--------------------------------------------------------------------------------------------------

