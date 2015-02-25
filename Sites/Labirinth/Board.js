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
    this.GetBGColor = function() { return "lightgray"; }

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
    this.AddRightWall(row, col - 1);
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
    this.AddUpWall(row - 1, col);
}

//--------------------------------------------------------------------------------------------------

// Delete right wall.
//
// Arguments:
//   row - cell row number,
//   col - cell col number.
Board.prototype.DelRightWall = function(row, col)
{
    this.SetRightWall(row, col, false);
    this.SetLeftWall(row, col + 1, false);
}

//--------------------------------------------------------------------------------------------------

// Delete left wall.
//
// Arguments:
//   row - cell row number,
//   col - cell col number.
Board.prototype.DelLeftWall = function(row, col)
{
    this.DelRightWall(row, col - 1);
}

//--------------------------------------------------------------------------------------------------

// Delete up wall.
//
// Arguments:
//   row - cell row number,
//   col - cell col number.
Board.prototype.DelUpWall = function(row, col)
{
    this.SetUpWall(row, col, false);
    this.SetDownWall(row + 1, col, false);
}

//--------------------------------------------------------------------------------------------------

// Del down wall.
//
// Arguments:
//   row - cell row number,
//   col - cell col number.
Board.prototype.DelDownWall = function(row, col)
{
    this.DelUpWall(row - 1, col);
}

//--------------------------------------------------------------------------------------------------
// Construct labirinth.
//--------------------------------------------------------------------------------------------------

// Construct outer borders.
Board.prototype.ConstructOuterBorders = function()
{
    var min_row = this.GetMinRow();
    var max_row = this.GetMaxRow();
    var min_col = this.GetMinCol();
    var max_col = this.GetMaxCol();

    for (var r = min_row; r <= max_row; r++)
    {
        this.AddLeftWall(r, min_col);
        this.AddRightWall(r, max_col);
    }

    for (var c = min_col; c <= max_col; c++)
    {
        this.AddDownWall(min_row, c);
        this.AddUpWall(max_row, c);
    }
}

//--------------------------------------------------------------------------------------------------

// Collect and return local walls array.
//
// Result:
//   Local walls array.
Board.prototype.CollectLocalWalls = function()
{
    var a = new Array();

    for (var r = this.GetMinRow(); r <= this.GetMaxRow(); r++)
    {
        for (var c = this.GetMinCol(); c <= this.GetMaxCol(); c++)
        {
            var cell = this.GetCell(r, c);

            if (!cell.IsRightWall())
            {
                a.push({ R : r, C : c, D : "r" });
            }

            if (!cell.IsUpWall())
            {
                a.push({ R : r, C : c, D : "u" });
            }
        }
    }

    return a;
}

//--------------------------------------------------------------------------------------------------

// Construct local borders.
//
// Arguments:
//   a - array of local borders.
Board.prototype.ConstructLocalBorders = function(a)
{
    for (var b in a)
    {
        var e = a[b];

        if (e.D == "r")
        {
            this.AddRightWall(e.R, e.C);
        }
        else if (e.D == "u")
        {
            this.AddUpWall(e.R, e.C);
        }
    }
}

//--------------------------------------------------------------------------------------------------

// Change id of cell and all neighbours.
//
// Arguments:
//   r - row of the cell,
//   c - column of the cell,
//   old_id - old id,
//   id - new id.
Board.prototype.ChangeId = function(r, c, old_id, id)
{
    JD.Utils.Check(old_id != id, "Board.ChangeId");

    var cell = this.GetCell(r, c);

    if (cell.Id != old_id)
    {
        return;
    }

    cell.Id = id;

    if (cell.IsRightNeighbour())
    {
        this.ChangeId(r, c + 1, old_id, id);
    }

    if (cell.IsLeftNeighbour())
    {
        this.ChangeId(r, c - 1, old_id, id);
    }

    if (cell.IsUpNeighbour())
    {
        this.ChangeId(r + 1, c, old_id, id);
    }

    if (cell.IsDownNeighbour())
    {
        this.ChangeId(r - 1, c, old_id, id);
    }
}

//--------------------------------------------------------------------------------------------------

// Construct random labirinth.
Board.prototype.ConstructRandomLabirinth = function()
{
    var min_row = this.GetMinRow();
    var max_row = this.GetMaxRow();
    var min_col = this.GetMinCol();
    var max_col = this.GetMaxCol();

    this.ConstructOuterBorders();
    var loc_walls = this.CollectLocalWalls();
    this.ConstructLocalBorders(loc_walls);

    // Prepare to construct labirinth.
    loc_walls = loc_walls.Shuffle();

    // Set identifiers for labirinth cells.
    var i = 0;
    for (var r = min_row; r <= max_row; r++)
    {
        for (var c = min_col; c <= max_col; c++)
        {
            this.GetCell(r, c).Id = i;
            i++;
        }
    }

    // Delete some walls.
    for (var i in loc_walls)
    {
        var e = loc_walls[i];

        if (e.D == "r")
        {
            var id = this.GetCell(e.R, e.C).Id;
            var n_id = this.GetCell(e.R, e.C + 1).Id;

            if (id != n_id)
            {
                this.DelRightWall(e.R, e.C);
                this.ChangeId(e.R, e.C + 1, n_id, id);
            }
        }
        else if (e.D == "u")
        {
            var id = this.GetCell(e.R, e.C).Id;
            var n_id = this.GetCell(e.R + 1, e.C).Id;

            if (id != n_id)
            {
                this.DelUpWall(e.R, e.C);
                this.ChangeId(e.R + 1, e.C, n_id, id);
            }
        }
    }

    // Remove exit border.
    this.DelRightWall(this.GetMaxRow(), this.GetMaxCol());
}

//--------------------------------------------------------------------------------------------------

