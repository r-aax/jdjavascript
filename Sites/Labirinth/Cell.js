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
    this.GetWallColor = function() { return "indianred"; }

    // No walls.
    this.RightWall = false;
    this.LeftWall = false;
    this.UpWall = false;
    this.DownWall = false;

    // Id.
    this.Id = 0;
}

//--------------------------------------------------------------------------------------------------
// Drawing.
//--------------------------------------------------------------------------------------------------

// Draw cell.
Cell.prototype.Draw = function()
{
    // Margin.
    var d = 0.0;

    // Wall width.
    var w = 0.06;

    var row = this.GetRow();
    var col = this.GetCol();
    var bg = this.GetBGColor();
    var wall_color = this.GetWallColor();
    var is_right = this.IsRightWall();
    var is_left = this.IsLeftWall();
    var is_up = this.IsUpWall();
    var is_down = this.IsDownWall();

    with (this.GetDrawer())
    {
        SetFillColor(bg);
        FillRect(col /* + d */, row /* + d */, col + 1 /* - d */, row + 1 /* - d */);

        SetFillColor(wall_color);

        if (is_right)
        {
            FillRect(col + 1 - w, row /* + d */, col + 1, row + 1 /* - d */);
        }

        if (is_left)
        {
            FillRect(col, row /* + d */, col + w, row + 1 /* - d */);
        }

        if (is_up)
        {
            FillRect(col /* + d */, row + 1 - w, col + 1 /* - d */, row + 1);
        }

        if (is_down)
        {
            FillRect(col /* + d */, row, col + 1 /* - d */, row + w);
        }
    }
}

//--------------------------------------------------------------------------------------------------

// Draw human.
Cell.prototype.DrawHuman = function()
{
    var row_c = this.GetRow() + 0.5 + 0.05;
    var col_c = this.GetCol() + 0.5;

    with (this.GetDrawer())
    {
        // Body.
        SetFillColor("steelblue");
        FillRect(col_c - 0.08, row_c - 0.3, col_c + 0.08, row_c + 0.2);

        // Head.
        SetFillColor("orange");
        SetColor("brown");
        FillCircle(col_c, row_c + 0.2, 0.12);
        DrawCircle(col_c, row_c + 0.2, 0.12);

        // Limbs.
        SetFillColor("#444444");
        FillRect(col_c - 0.05, row_c, col_c - 0.3, row_c - 0.05);
        FillRect(col_c + 0.05, row_c, col_c + 0.3, row_c - 0.05);
        FillRect(col_c - 0.02, row_c - 0.2, col_c - 0.07, row_c - 0.45);
        FillRect(col_c + 0.02, row_c - 0.2, col_c + 0.07, row_c - 0.45);

        // Belt.
        SetFillColor("darkred");
        FillRect(col_c - 0.08, row_c - 0.25, col_c + 0.08, row_c - 0.15);
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

// Set right wall attribute.
//
// Arguments:
//   val - value of attribute.
Cell.prototype.SetRightWall = function(val)
{
    this.RightWall = val;
}

//--------------------------------------------------------------------------------------------------

// Set left wall attribute.
//
// Arguments:
//   val - value of attribute.
Cell.prototype.SetLeftWall = function(val)
{
    this.LeftWall = val;
}

//--------------------------------------------------------------------------------------------------

// Set up wall attribute.
//
// Arguments:
//   val - value of attribute.
Cell.prototype.SetUpWall = function(val)
{
    this.UpWall = val;
}

//--------------------------------------------------------------------------------------------------

// Set down wall attribute.
//
// Arguments:
//   val - value of attribute.
Cell.prototype.SetDownWall = function(val)
{
    this.DownWall = val;
}

//--------------------------------------------------------------------------------------------------

// Check if there is right neighbour.
//
// Result:
//   true - if there is right neighbour,
//   false - if there is no right neighbour.
//
// Warning:
//   We suppose labirinth has outer borders.
Cell.prototype.IsRightNeighbour = function()
{
    return !this.IsRightWall();
}

//--------------------------------------------------------------------------------------------------

// Check if there is left neighbour.
//
// Result:
//   true - if there is left neighbour,
//   false - if there is no left neighbour.
//
// Warning:
//   We suppose labirinth has outer borders.
Cell.prototype.IsLeftNeighbour = function()
{
    return !this.IsLeftWall();
}

//--------------------------------------------------------------------------------------------------

// Check if there is up neighbour.
//
// Result:
//   true - if there is up neighbour,
//   false - if there is no up neighbour.
//
// Warning:
//   We suppose labirinth has outer borders.
Cell.prototype.IsUpNeighbour = function()
{
    return !this.IsUpWall();
}

//--------------------------------------------------------------------------------------------------

// Check if there is down neighbour.
//
// Result:
//   true - if there is down neighbour,
//   false - if there is no down neighbour.
//
// Warning:
//   We suppose labirinth has outer borders.
Cell.prototype.IsDownNeighbour = function()
{
    return !this.IsDownWall();
}

//--------------------------------------------------------------------------------------------------

