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
    this.MinRow = 0;
    this.MaxRow = rows - 1;
    this.Cols = cols;
    this.MinCol = 0;
    this.MaxCol = cols - 1;
    this.M = new Array(rows);
    for (var i = 0; i < rows; i++)
    {
        this.M[i] = new Array(cols);
    }
    this.Drawer = drawer;
    this.BackColor = "lightgray";
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
    this.Drawer.SetFillColor(this.BackColor);
    this.Drawer.Fill();

    for (var i = 0; i < this.Rows; i++)
    {
        for (var j = 0; j < this.Cols; j++)
        {
            this.DrawCell(i, j);
        }
    }
}

//--------------------------------------------------------------------------------------------------
// Logic of the board.
//--------------------------------------------------------------------------------------------------

// Check is line full.
//
// Arguments:
//   row - row number.
//
// Result:
//   true - if line is full,
//   false - is line is not full.
Board.prototype.IsLine = function(row)
{
    for (var col = 0; col < this.Cols; col++)
    {
        if (this.M[row][col] == undefined)
        {
            return false;
        }
    }

    return true;
}

//--------------------------------------------------------------------------------------------------

// Remove line.
//
// Arguments:
//   row - row number.
Board.prototype.RemoveLine = function(rem_row)
{
    var row = rem_row;

    while (row < this.Rows)
    {
        if (row < this.Rows - 1)
        {
            for (var col = 0; col < this.Cols; col++)
            {
                this.M[row][col] = this.M[row + 1][col];
            }
        }
        else
        {
            for (var col = 0; col < this.Cols; col++)
            {
                this.M[row][col] = undefined;
            }
        }

        row++;
    }
}

//--------------------------------------------------------------------------------------------------

// Remove full lines.
//
// Result:
//   Count of removed lines.
Board.prototype.RemoveFullLines = function()
{
    var count = 0;

    for (var row = this.Rows - 1; row >= 0; row--)
    {
        if (this.IsLine(row))
        {
            this.RemoveLine(row);
            count++;
        }
    }

    return count;
}

//--------------------------------------------------------------------------------------------------

