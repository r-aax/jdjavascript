// Board.js - game board.
//
// Author: Alexey Rybakov

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

// Burn cells of given color.
//
// Arguments:
//   row - row of start cell,
//   col - col of start cell,
//   color - color to burn.
//
// Result:
//   Count of burned cells.
Board.prototype.BurnCellsOfGivenColor = function(row, col, color)
{
    var burned_count = 0;

    if (this.M[row][col] != color)
    {
        return 0;
    }

    this.M[row][col] = undefined;
    burned_count++;

    if (row > 0)
    {
        burned_count += this.BurnCellsOfGivenColor(row - 1, col, color);
    }

    if (row < this.Rows - 1)
    {
        burned_count += this.BurnCellsOfGivenColor(row + 1, col, color);
    }

    if (col > 0)
    {
        burned_count += this.BurnCellsOfGivenColor(row, col - 1, color);
    }

    if (col < this.Cols - 1)
    {
        burned_count += this.BurnCellsOfGivenColor(row, col + 1, color);
    }

    return burned_count;
}

//--------------------------------------------------------------------------------------------------

// Burn cells of the same color.
// The burn starts with (row - 1, col) cell and propagates on all neightboars.
// Cell (row, col) burns too.
//
// Arguments:
//   row - row of fire brick,
//   col - col of fire brick.
//
// Result:
//   Count of burned cells.
Board.prototype.BurnCells = function(row, col)
{
    var burned_count = 0;

    // If row is greater than 0 we have to burn the same color cells.
    if (row > 0)
    {
        burned_count = this.BurnCellsOfGivenColor(row - 1, col, this.M[row - 1][col]);
    }

    // Burn fire brick.
    this.M[row][col] = undefined;

    return burned_count + 1;
}

//--------------------------------------------------------------------------------------------------

