// Maths.js - mathematical functions.
//
// Author: Alexey Rybakov

//--------------------------------------------------------------------------------------------------

// Initialize.
var JD;
if (!JD) JD = {};
JD.Maths = {};

//--------------------------------------------------------------------------------------------------

// Check if number is in bounds.
//
// Arguments:
//   num - number,
//   lo - low bound,
//   hi - hight bound.
//
// Result:
//   true - if number is in bounds,
//   false - if number is not in bounds.
JD.Maths.IsInBounds = function(num, lo, hi)
{
    return (num >= lo) && (num <= hi);
}

//--------------------------------------------------------------------------------------------------

