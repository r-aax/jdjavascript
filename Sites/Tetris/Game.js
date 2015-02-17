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
    this.Drawer = new Drawer(canvas, cols, rows, false, true);
    this.Info = new Drawer(info, 10, 2, false, true);
    this.Board = new Board(rows, cols, this.Drawer);

    // Information.
    this.Speed = 1;
    this.Figures = 0;
    this.Scores = 0;

    this.CreateNewFigure();
    this.Draw();
    this.SetStepInterval();

    // Status - the game is started.
    this.Status = "start";
}

//--------------------------------------------------------------------------------------------------

// Set step interval.
Game.prototype.SetStepInterval = function()
{
    var th = this;
    var delay = this.SpeedDelay(this.Speed);

    JD.Utils.ClearInterval("draw");
    JD.Utils.SetInterval
    (
        function()
        {
            th.Step();
            th.Draw();
        },
        "draw",
        delay
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

    if (this.IsEnd())
    {
        var cx = this.Board.Cols / 2;
        var cy = this.Board.Rows / 2;

        this.Drawer.SetFillColor("darkgrey");
        this.Drawer.SetColor("#333333");
        this.Drawer.FillRectCentered(cx, cy, 7.8, 4.4);
        this.Drawer.DrawRectCentered(cx, cy, 7.8, 4.4);
        this.Drawer.SetFillColor("#932510");
        this.Drawer.SetFont("bold 25px lucida console");
        this.Drawer.DrawTextCentered(cx, cy + 0.5, "GAME OVER");
        this.Drawer.SetFont("bold 15px lucida console");
        this.Drawer.DrawTextCentered(cx, cy - 0.8, "press space");
        this.Drawer.DrawTextCentered(cx, cy - 1.7, "to continue");
    }
}

//--------------------------------------------------------------------------------------------------
// Logic.
//--------------------------------------------------------------------------------------------------

// Position new figure.
Game.prototype.CreateNewFigure = function()
{
    this.Figure = this.RandomFigure(5, 5, this.Drawer);
    this.Figure.Autoposition(this.Board.MaxRow, this.Board.MinCol, this.Board.MaxCol);

    if (this.IsFigureCorrect())
    {
        this.Figures++;
    }
    else
    {
        this.EndGame();
    }
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

    if (this.Figure.Type == "1gold")
    {
        do
        {
            this.Figure.Down();

            if (this.IsFigureCorrect())
            {
                return true;
            }
            else if (this.Figure.Row < 0)
            {
                this.Figure = save;

                return false;
            }
        }
        while (true);
    }
    else
    {
        this.Figure.Down();

        if (!this.IsFigureCorrect())
        {
            this.Figure = save;

            return false;
        }
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

// Fix figure and remove cells.
// First we try to delete cells burned with 1fire brick.
// Then we try to delete full line cells.
Game.prototype.FixFigureAndRemoveCells = function()
{
    var is_fire = (this.Figure.Type == "1fire");
    var row = this.Figure.Row;
    var col = this.Figure.Col;

    this.FixFigure();

    if (is_fire)
    {
        var burned_count = this.Board.BurnCells(row, col);
        this.AddScores(this.ScoresForBurnedCells(burned_count));
    }

    var lines_count = this.Board.RemoveFullLines();
    this.AddScores(this.ScoresForLines(lines_count));
}

//--------------------------------------------------------------------------------------------------

// Game step.
Game.prototype.Step = function()
{
    JD.Utils.Check(this.Figure != undefined);

    if (!this.DownWithCheck())
    {
        this.FixFigureAndRemoveCells();
        this.CreateNewFigure();
    }
}

//--------------------------------------------------------------------------------------------------

// End game.
Game.prototype.EndGame = function()
{
    JD.Utils.ClearInterval("draw");
    this.Status = "end";
    this.Draw();
}

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
// Figures.
//--------------------------------------------------------------------------------------------------

// Set default figures.
Game.prototype.SetDefaultFigures = function()
{
    if (this.FiguresProbs == undefined)
    {
        this.FiguresProbs =
            [
                { E : "1gold", P : 1.0 },
                { E : "1fire", P : 1.0 },
                { E : "2",     P : 1.0 },
                { E : "3ln",   P : 1.0 },
                { E : "3an",   P : 1.0 },
                { E : "4ln",   P : 1.0 },
                { E : "4sq",   P : 1.0 },
                { E : "4anr",  P : 1.0 },
                { E : "4anl",  P : 1.0 },
                { E : "4snr",  P : 1.0 },
                { E : "4snl",  P : 1.0 },
                { E : "4cr",   P : 1.0 },
                { E : "5star", P : 1.0 }
            ];
    }
}

//--------------------------------------------------------------------------------------------------

// Get random figure.
//
// Arguments:
//   row - base cell row,
//   col - base cell column,
//   drawer - drawer.
Game.prototype.RandomFigure = function(row, col, drawer)
{
    this.SetDefaultFigures();

    var type = JD.Utils.RandomArrayWeightedElement(this.FiguresProbs);

    return new Figure(type, JD.Utils.RandomN(0, 3),
                      row, col, Figure.DefaultColor(type), drawer);
}

//--------------------------------------------------------------------------------------------------
// Scores and speed.
//--------------------------------------------------------------------------------------------------

// Scores count for lines delete.
//
// Arguments:
//   count - lines count.
//
// Result:
//   Scores count.
Game.prototype.ScoresForLines = function(count)
{
    return this.Board.Cols * (count * count);
}

//--------------------------------------------------------------------------------------------------

// Scores count for burned cells.
//
// Arguments:
//   count - count of burned cells.
//
// Result:
//   Scores count.
Game.prototype.ScoresForBurnedCells = function(count)
{
    return count * count * count;
}

//--------------------------------------------------------------------------------------------------

// Add scores.
//
// Arguments:
//   s - scores to add.
Game.prototype.AddScores = function(s)
{
    this.Scores += s;

    // Logic of speed increase.
    // Fix it.
    // this.SpeedUp();
}

//--------------------------------------------------------------------------------------------------

// Delay.
//
// Arguments:
//   sp - speed.
//
// Result:
//   Delay value.
Game.prototype.SpeedDelay = function(sp)
{
    switch (sp)
    {
        case 1:
            return 1000;

        case 2:
            return 800;

        case 3:
            return 600;

        case 4:
            return 500;

        case 5:
            return 400;

        case 6:
            return 300;

        case 7:
            return 200;

        case 8:
            return 100;

        case 9:
            return 75;

        case 10:
            return 50;

        default:
            return 50;
    }
}

//--------------------------------------------------------------------------------------------------

// Set speed up.
Game.prototype.SpeedUp = function()
{
    var sp = this.Speed;

    if (sp < 10)
    {
        sp++;
        this.SetSpeed(sp);
    }
}

//--------------------------------------------------------------------------------------------------

// Set speed.
//
// Arguments:
//   sp - speed.
Game.prototype.SetSpeed = function(sp)
{
    this.Speed = sp;
    this.SetStepInterval();
}

//--------------------------------------------------------------------------------------------------

