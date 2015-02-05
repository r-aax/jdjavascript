// Utils.js.
//
// Copyright Joy Developing.

//--------------------------------------------------------------------------------------------------

// Initialize.
var JD;
if (!JD) JD = {};
JD.Utils = {};
JD.Utils.Intervals = {};

//--------------------------------------------------------------------------------------------------
// Checkers.
//--------------------------------------------------------------------------------------------------

// Checker.
//
// Arguments:
//   cond - condition,
//   str - message string.
JD.Utils.Check = function(cond, str)
{
    if (!cond)
    {
        alert("internal error : " + str);
    }
}

//--------------------------------------------------------------------------------------------------
// Pseudo random numbers.
//--------------------------------------------------------------------------------------------------

// Get random integer number from a to b.
//
// Arguments:
//   a - low bound of random number,
//   b - high bound of random number.
//
// Result:
//   Random number.
JD.Utils.RandomN = function(a, b)
{
    this.Check(a <= b, "JD.Utils.RandomN : a must not be greater than b");
    var r = a + Math.random() * (b - a + 1);

    return (r == b + 1) ? b : Math.floor(r);
}

//--------------------------------------------------------------------------------------------------

// Get random boolean value.
//
// Result:
//   Random boolean value.
JD.Utils.RandomBool = function()
{
    return Math.random() < 0.5;
}

//--------------------------------------------------------------------------------------------------

// Get random element of array.
//
// Arguments:
//   ar - array.
//
// Result:
//   Random element of array.
JD.Utils.RandomArrayElement = function(ar)
{
    return ar[this.RandomN(0, ar.length - 1)];
}

//--------------------------------------------------------------------------------------------------

// Checker for not implemented functional.
JD.Utils.NotImplemented = function()
{
    this.Check(false, "not implemented");
}

//--------------------------------------------------------------------------------------------------
// Intervals management.
//--------------------------------------------------------------------------------------------------

// Check if interval is set.
//
// Arguments:
//   name - name of interval.
//
// Result:
//   true - if interval is set,
//   false - if interval is not set.
JD.Utils.IsInterval = function(name)
{
    return this.Intervals[name] != undefined;
}

//--------------------------------------------------------------------------------------------------

// Set interval.
//
// Arguments:
//   fun - function for cyclic repeats,
//   name - name of interval,
//   time - time value.
JD.Utils.SetInterval = function(fun, name, time)
{
    if (!this.IsInterval(name))
    {
        this.Intervals[name] = setInterval(fun, time);
    }
}

//--------------------------------------------------------------------------------------------------

// Clear interval.
//
// Arguments:
//   name - name of interval.
JD.Utils.ClearInterval = function(name)
{
    if (this.IsInterval(name))
    {
        clearInterval(this.Intervals[name]);
        this.Intervals[name] = undefined;
    }
}

//--------------------------------------------------------------------------------------------------

// Clear all intervals.
JD.Utils.ClearAllIntervals = function()
{
    for (var name in this.Intervals)
    {
        this.ClearInterval(name);
    }
}

//--------------------------------------------------------------------------------------------------

