// Array.js - array functional extension.
//
// Author: Alexey Rybakov

//--------------------------------------------------------------------------------------------------

// Shuffle array.
//
// Arguments:
//   a - array.
Array.prototype.Shuffle = function()
{
    return this.sort(function() { return 0.5 - Math.random(); });
}

//--------------------------------------------------------------------------------------------------

