// String.js - string functional extension.
//
// Author: Alexey Rybakov

//--------------------------------------------------------------------------------------------------

// Pad string to given length.
//
// Arguments:
//   w - total width.
String.prototype.Pad = function(w)
{
    var r = this;

    while (r.length < w)
    {
        r = " " + r;
    }

    return r;
}

//--------------------------------------------------------------------------------------------------

