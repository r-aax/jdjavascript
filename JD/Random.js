// Random.js.
//
// Author: Alexey Rybakov

//--------------------------------------------------------------------------------------------------

// Initialize.
var JD;
if (!JD) JD = {};
JD.Random = {};

//--------------------------------------------------------------------------------------------------

// Random in [0, 1].
//
// Result:
//   Random number.
JD.Random.Random01 = function()
{
    return Math.random();
}

//--------------------------------------------------------------------------------------------------

// Random in [A, B].
//
// Arguments:
//   lo - first bound
//   hi - second bound
//
// Result:
//   Random number.
JD.Random.RandomAB = function(lo, hi)
{
    JD.Utils.Check(lo <= hi);

    return lo + this.Random01() * (hi - lo);
}

//--------------------------------------------------------------------------------------------------

// Random in [0, A].
//
// Arguments:
//   hi - hight limit.
//
// Result:
//   Random number.
JD.Random.RandomA = function(hi)
{
    return this.RandomAB(0.0, hi);
}

//--------------------------------------------------------------------------------------------------

