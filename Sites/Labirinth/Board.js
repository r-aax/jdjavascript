// Board.js - game labirinth board.
//
// Copyright Joy Developing.

//--------------------------------------------------------------------------------------------------

// Constructor.
//
// Arguments:
//   rows - rows count,
//   cols - columns count,
//   drawer - drawing master.
function Board(rows, cols, drawer)
{
    this.GetRows = function() { return rows; }
    this.GetMinRow = function() { return 0; }
    this.GetMaxRow = function() { return rows - 1; }
    this.GetCols = function() { return cols; }
    this.GetMinCol = function() { return 0; }
    this.GetMaxCol = function() { return cols - 1; }
    this.GetDrawer = function() { return drawer; }
    this.GetBGColor = function() { return "white"; }

    // Init table of cells.
    this.M = new Array(rows);
    for (var i = 0; i < rows; i++)
    {
        this.M[i] = new Array(cols);

        for (var j = 0; j < cols; j++)
        {
            this.M[i][j] = new Cell(i, j, drawer);
        }
    }
    this.GetCell = function(row, col) { return this.M[row][col]; }
}

//--------------------------------------------------------------------------------------------------
// Drawing.
//--------------------------------------------------------------------------------------------------

// Draw board.
Board.prototype.Draw = function()
{
    this.GetDrawer().SetFillColor(this.GetBGColor());
    this.GetDrawer().Fill();

    for (var i = 0; i < this.GetRows(); i++)
    {
        for (var j = 0; j < this.GetCols(); j++)
        {
            this.GetCell(i, j).Draw();
        }
    }
}

//--------------------------------------------------------------------------------------------------
// Walls.
//--------------------------------------------------------------------------------------------------

// Set right wall.
//
// Arguments:
//   row - cell row number,
//   col - cell col number,
//   val - value of wall attribute.
Board.prototype.SetRightWall = function(row, col, val)
{
    if (JD.Maths.IsInBounds(row, this.GetMinRow(), this.GetMaxRow())
        && JD.Maths.IsInBounds(col, this.GetMinCol(), this.GetMaxCol()))
    {
        this.GetCell(row, col).SetRightWall(val);
    }
}

//--------------------------------------------------------------------------------------------------

// Set left wall.
//
// Arguments:
//   row - cell row number,
//   col - cell col number,
//   val - value of wall attribute.
Board.prototype.SetLeftWall = function(row, col, val)
{
    if (JD.Maths.IsInBounds(row, this.GetMinRow(), this.GetMaxRow())
        && JD.Maths.IsInBounds(col, this.GetMinCol(), this.GetMaxCol()))
    {
        this.GetCell(row, col).SetLeftWall(val);
    }
}

//--------------------------------------------------------------------------------------------------

// Set up wall.
//
// Arguments:
//   row - cell row number,
//   col - cell col number,
//   val - value of wall attribute.
Board.prototype.SetUpWall = function(row, col, val)
{
    if (JD.Maths.IsInBounds(row, this.GetMinRow(), this.GetMaxRow())
        && JD.Maths.IsInBounds(col, this.GetMinCol(), this.GetMaxCol()))
    {
        this.GetCell(row, col).SetUpWall(val);
    }
}

//--------------------------------------------------------------------------------------------------

// Set down wall.
//
// Arguments:
//   row - cell row number,
//   col - cell col number,
//   val - value of wall attribute.
Board.prototype.SetDownWall = function(row, col, val)
{
    if (JD.Maths.IsInBounds(row, this.GetMinRow(), this.GetMaxRow())
        && JD.Maths.IsInBounds(col, this.GetMinCol(), this.GetMaxCol()))
    {
        this.GetCell(row, col).SetDownWall(val);
    }
}

//--------------------------------------------------------------------------------------------------

// Add right wall.
//
// Arguments:
//   row - cell row number,
//   col - cell col number.
Board.prototype.AddRightWall = function(row, col)
{
    this.SetRightWall(row, col, true);
    this.SetLeftWall(row, col + 1, true);
}

//--------------------------------------------------------------------------------------------------

// Add left wall.
//
// Arguments:
//   row - cell row number,
//   col - cell col number.
Board.prototype.AddLeftWall = function(row, col)
{
    this.AddRightWall(row, col + 1);
}

//--------------------------------------------------------------------------------------------------

// Add up wall.
//
// Arguments:
//   row - cell row number,
//   col - cell col number.
Board.prototype.AddUpWall = function(row, col)
{
    this.SetUpWall(row, col, true);
    this.SetDownWall(row + 1, col, true);
}

//--------------------------------------------------------------------------------------------------

// Add down wall.
//
// Arguments:
//   row - cell row number,
//   col - cell col number.
Board.prototype.AddDownWall = function(row, col)
{
    this.AddUpWall(row + 1, col);
}

//--------------------------------------------------------------------------------------------------

