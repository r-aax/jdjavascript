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
    for (var i = 0; i < this.GetRows(); i++)
    {
        for (var j = 0; j < this.GetCols(); j++)
        {
            this.GetCell(i, j).Draw();
        }
    }
}

//--------------------------------------------------------------------------------------------------

