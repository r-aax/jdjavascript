// Cell.js - game labirinth single cell.
//
// Copyright Joy Developing.

//--------------------------------------------------------------------------------------------------

// Constructor.
//
// Arguments:
//   row - row of the cell,
//   col - col of the cell,
//   drawer - drawing master.
function Cell(row, col, drawer)
{
    this.GetRow = function() { return row; }
    this.GetCol = function() { return col; }
    this.GetDrawer = function() { return drawer; }
    this.GetBGColor = function() { return "lightgray"; }

    // No walls.
    this.RightWall = false;
    this.LeftWall = false;
    this.UpWall = false;
    this.DownWall = false;
}

//--------------------------------------------------------------------------------------------------
// Drawing.
//--------------------------------------------------------------------------------------------------

// Draw cell.
Cell.prototype.Draw = function()
{
    // Margin.
    var d = 0.02;

    var row = this.GetRow();
    var col = this.GetCol();
    var bg = this.GetBGColor();

    with (this.GetDrawer())
    {
        SetFillColor(bg);
        FillRect(col + d, row + d, col + 1 - d, row + 1 - d);
    }
}

//--------------------------------------------------------------------------------------------------
// Walls properties.
//--------------------------------------------------------------------------------------------------

// Get right wall attribute.
//
// Result:
//   true - if there is right wall,
//   false - if there is no right wall.
Cell.prototype.IsRightWall = function()
{
    return this.RightWall;
}

//--------------------------------------------------------------------------------------------------

// Get left wall attribute.
//
// Result:
//   true - if there is left wall,
//   false - if there is no left wall.
Cell.prototype.IsLeftWall = function()
{
    return this.LeftWall;
}

//--------------------------------------------------------------------------------------------------

// Get up wall attribute.
//
// Result:
//   true - if there is up wall,
//   false - if there is no up wall.
Cell.prototype.IsUpWall = function()
{
    return this.UpWall;
}

//--------------------------------------------------------------------------------------------------

// Get down wall attribute.
//
// Result:
//   true - if there is down wall,
//   false - if there is no down wall.
Cell.prototype.IsDownWall = function()
{
    return this.DownWall;
}

//--------------------------------------------------------------------------------------------------

