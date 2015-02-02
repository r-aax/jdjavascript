// Drawer.js - module for drawing on canvas.
//
// Copyright Joy Developing.

//--------------------------------------------------------------------------------------------------

// Constructor.
//
// Arguments:
//   id - canvas identifier
function Drawer(id)
{
    this.Canvas = document.getElementById(id);
    this.Context = this.Canvas.getContext("2d");
}

//--------------------------------------------------------------------------------------------------
// Style.
//--------------------------------------------------------------------------------------------------

// Set color.
//
// Arguments:
//   s - color.
Drawer.prototype.SetColor = function(s)
{
    this.Context.strokeStyle = s;
}

//--------------------------------------------------------------------------------------------------

// Set fill color.
//
// Arguments:
//   s - fill color.
Drawer.prototype.SetFillColor = function(s)
{
    this.Context.fillStyle = s;
}

//--------------------------------------------------------------------------------------------------

// Set line width.
//
// Arguments:
//   w - line width.
Drawer.prototype.SetLineWidth = function(w)
{
    this.Context.lineWidth = w;
}

//--------------------------------------------------------------------------------------------------
// Rectangle.
//--------------------------------------------------------------------------------------------------

// Draw rectangle.
//
// Arguments:
//   x1 - x coordinate of the first point,
//   y1 - y coordinate of the first point,
//   x2 - x coordinate of the second point,
//   y2 - y coordinate of the second point.
Drawer.prototype.DrawRect = function(x1, y1, x2, y2)
{
    this.Context.strokeRect(x1, y1, x2 - x1, y2 - y1);
}

//--------------------------------------------------------------------------------------------------

// Fill rectangle.
//
// Arguments:
//   x1 - x coordinate of the first point,
//   y1 - y coordinate of the first point,
//   x2 - x coordinate of the second point,
//   y2 - y coordinate of the second point.
Drawer.prototype.FillRect = function(x1, y1, x2, y2)
{
    this.Context.fillRect(x1, y1, x2 - x1, y2 - y1);
}

//--------------------------------------------------------------------------------------------------

// Clear rectangle.
//
// Arguments:
//   x1 - x coordinate of the first point,
//   y1 - y coordinate of the first point,
//   x2 - x coordinate of the second point,
//   y2 - y coordinate of the second point.
Drawer.prototype.ClearRect = function(x1, y1, x2, y2)
{
    this.Context.clearRect(x1, y1, x2 - x1, y2 - y1);
}

//--------------------------------------------------------------------------------------------------

