// Array.js - array functional extension.
//
// Copyright Joy Developing.

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

