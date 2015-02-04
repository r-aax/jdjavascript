// Board.js - game board.
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
    this.Rows = rows;
    this.Cols = cols;
    this.M = new Array(rows);
    for (var i = 0; i < rows; i++)
    {
        this.M[i] = new Array(cols);
    }
    this.Drawer = drawer;
    this.BackColor = "lightgray";

    // Some tmp inits.
    this.M[5][5] = "steelblue";
    this.M[3][3] = "indianred";
    this.M[6][2] = "beige";
}

//--------------------------------------------------------------------------------------------------
// Drawing.
//--------------------------------------------------------------------------------------------------

// Draw board cell.
//
// Arguments:
//   row - row number,
//   col - column number.
Board.prototype.DrawCell = function(row, col)
{
    var color = this.M[row][col];

    // Margin.
    var d = 0.02;

    this.Drawer.SetFillColor((color == undefined) ? this.BackColor : color);
    this.Drawer.FillRect(col + d, row + d, col + 1 - d, row + 1 - d);
}

//--------------------------------------------------------------------------------------------------

// Draw board.
Board.prototype.Draw = function()
{
    for (var i = 0; i < this.Rows; i++)
    {
        for (var j = 0; j < this.Cols; j++)
        {
            this.DrawCell(i, j);
        }
    }
}

//--------------------------------------------------------------------------------------------------

