// Drawer.js - module for drawing on canvas.
//
// Copyright Joy Developing.

//--------------------------------------------------------------------------------------------------

// Constructor.
//
// Arguments:
//   id - canvas identifier,
//   r_width - width of real scope,
//   r_height - height of real scope,
//   is_x_inv - is x coordinate inverted,
//   is_y_inv - is y coordinate inverted.
function Drawer(id, r_width, r_height, is_x_inv, is_y_inv)
{
    this.Canvas = document.getElementById(id);
    this.Context = this.Canvas.getContext("2d");

    // Coordinates recalculation.
    var w = this.Canvas.width;
    var h = this.Canvas.height;
    var affin = function(x, from, to, is_inv)
    {
        if (!is_inv)
        {
            return x * (to / from);
        }
        else
        {
            return to - x * (to / from);
        }
    };
    this.TX = function(x)
    {
        return affin(x, r_width, w, is_x_inv);
    };
    this.TY = function(y)
    {
        return affin(y, r_height, h, is_y_inv);
    };
    this.FX = function(x)
    {
        return affin(x, w, r_width, is_x_inv);
    };
    this.FY = function(y)
    {
        return affin(y, h, r_height, is_y_inv);
    }
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
// Line.
//--------------------------------------------------------------------------------------------------

// Draw line in canvas coordiates.
//
// Arguments:
//   x1 - x coordinate of the first point,
//   y1 - y coordinate of the first point,
//   x2 - x coordinate of the second point,
//   y2 - y coordinate of the second point.
Drawer.prototype.DrawLineI = function(x1, y1, x2, y2)
{
    with (this.Context)
    {
        beginPath();
        moveTo(x1, y1);
        lineTo(x2, y2);
        stroke();
        closePath();
    }
}

//--------------------------------------------------------------------------------------------------

// Draw line.
//
// Arguments:
//   x1 - x coordinate of the first point,
//   y1 - y coordinate of the first point,
//   x2 - x coordinate of the second point,
//   y2 - y coordinate of the second point.
Drawer.prototype.DrawLine = function(x1, y1, x2, y2)
{
    var tx1 = this.TX(x1);
    var ty1 = this.TY(y1);
    var tx2 = this.TX(x2);
    var ty2 = this.TY(y2);

    this.DrawLineI(tx1, ty1, tx2, ty2);
}

//--------------------------------------------------------------------------------------------------
// Rectangle.
//--------------------------------------------------------------------------------------------------

// Draw rectangle in canvas coordinates.
//
// Arguments:
//   x1 - x coordinate of the first point,
//   y1 - y coordinate of the first point,
//   x2 - x coordinate of the second point,
//   y2 - y coordinate of the second point.
Drawer.prototype.DrawRectI = function(x1, y1, x2, y2)
{
    this.Context.strokeRect(x1, y1, x2 - x1, y2 - y1);
}

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
    var tx1 = this.TX(x1);
    var ty1 = this.TY(y1);
    var tx2 = this.TX(x2);
    var ty2 = this.TY(y2);

    this.DrawRectI(tx1, ty1, tx2, ty2);
}

//--------------------------------------------------------------------------------------------------

// Fill rectangle in canvas coordinates.
//
// Arguments:
//   x1 - x coordinate of the first point,
//   y1 - y coordinate of the first point,
//   x2 - x coordinate of the second point,
//   y2 - y coordinate of the second point.
Drawer.prototype.FillRectI = function(x1, y1, x2, y2)
{
    this.Context.fillRect(x1, y1, x2 - x1, y2 - y1);
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
    var tx1 = this.TX(x1);
    var ty1 = this.TY(y1);
    var tx2 = this.TX(x2);
    var ty2 = this.TY(y2);

    this.FillRectI(tx1, ty1, tx2, ty2);
}

//--------------------------------------------------------------------------------------------------

// Clear rectangle in canvas coordinates.
//
// Arguments:
//   x1 - x coordinate of the first point,
//   y1 - y coordinate of the first point,
//   x2 - x coordinate of the second point,
//   y2 - y coordinate of the second point.
Drawer.prototype.ClearRectI = function(x1, y1, x2, y2)
{
    this.Context.clearRect(x1, y1, x2 - x1, y2 - y1);
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
    var tx1 = this.TX(x1);
    var ty1 = this.TY(y1);
    var tx2 = this.TX(x2);
    var ty2 = this.TY(y2);

    this.ClearRectI(tx1, ty1, tx2, ty2);
}

//--------------------------------------------------------------------------------------------------
// Circle.
//--------------------------------------------------------------------------------------------------

// Draw circle in canvas coordinates.
//
// Arguments:
//   x - x coorfinate,
//   y - y coordinate,
//   r - radius.
Drawer.prototype.DrawCircleI = function(x, y, r)
{
    with (this.Context)
    {
        beginPath();
        arc(x, y, r, 0, 2 * Math.PI);
        stroke();
        closePath();
    }
}

//--------------------------------------------------------------------------------------------------

// Draw point in canvas coordinates (equal to DrawCircleI).
//
// Arguments:
//   x - x coorfinate,
//   y - y coordinate,
//   r - radius.
Drawer.prototype.DrawPointI = function(x, y, r)
{
    this.DrawCircleI(x, y, r);
}

//--------------------------------------------------------------------------------------------------

// Draw circle.
//
// Arguments:
//   x - x coordinate,
//   y - y coordinate,
//   r - radius.
Drawer.prototype.DrawCircle = function(x, y, r)
{
    if (r > 0)
    {
        var tx = this.TX(x);
        var ty = this.TY(y);
        var tx1 = this.TX(x + r);
        var ty1 = this.TY(y + r);
        var dy = Math.abs(ty1 - ty);

        with (this.Context)
        {
            save();
            beginPath();
            translate(tx, ty);
            scale(Math.abs((tx1 - tx) / dy), 1);
            arc(0, 0, dy, 0, 2 * Math.PI);
            stroke();
            restore();
            closePath();
        }
    }
}

//--------------------------------------------------------------------------------------------------

// Draw point.
// Radius is constant.
//
// Arguments:
//   x - x coordinate,
//   y - y coordinate,
//   r - radius.
Drawer.prototype.DrawPoint = function(x, y, r)
{
    var tx = this.TX(x);
    var ty = this.TY(y);

    this.DrawPointI(tx, ty, r);
}

//--------------------------------------------------------------------------------------------------

// Fill circle in canvas coordinates.
//
// Arguments:
//   x - x coorfinate,
//   y - y coordinate,
//   r - radius.
Drawer.prototype.FillCircleI = function(x, y, r)
{
    with (this.Context)
    {
        beginPath();
        arc(x, y, r, 0, 2 * Math.PI);
        fill();
        closePath();
    }
}

//--------------------------------------------------------------------------------------------------

// Fill point in canvas coordinates (equal to FillCircleI).
//
// Arguments:
//   x - x coorfinate,
//   y - y coordinate,
//   r - radius.
Drawer.prototype.FillPointI = function(x, y, r)
{
    this.FillCircleI(x, y, r);
}

//--------------------------------------------------------------------------------------------------

// Fill circle.
//
// Arguments:
//   x - x coordinate,
//   y - y coordinate,
//   r - radius.
Drawer.prototype.FillCircle = function(x, y, r)
{
    if (r > 0)
    {
        var tx = this.TX(x);
        var ty = this.TY(y);
        var tx1 = this.TX(x + r);
        var ty1 = this.TY(y + r);
        var dy = Math.abs(ty1 - ty);

        with (this.Context)
        {
            save();
            beginPath();
            translate(tx, ty);
            scale(Math.abs((tx1 - tx) / dy), 1);
            arc(0, 0, dy, 0, 2 * Math.PI);
            fill();
            restore();
            closePath();
        }
    }
}

//--------------------------------------------------------------------------------------------------

// Fill point.
// Radius is constant.
//
// Arguments:
//   x - x coordinate,
//   y - y coordinate,
//   r - radius.
Drawer.prototype.FillPoint = function(x, y, r)
{
    var tx = this.TX(x);
    var ty = this.TY(y);

    this.FillPointI(tx, ty, r);
}

//--------------------------------------------------------------------------------------------------

