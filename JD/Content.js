// Content.js.
//
// Author: Alexey Rybakov

//--------------------------------------------------------------------------------------------------

// Initialize.
var JD;
if (!JD) JD = {};
JD.Content = {};

//--------------------------------------------------------------------------------------------------

// Say message.
//
// Arguments:
//   str - string to say.
JD.Content.Say = function(str)
{
    alert(str);
}

//--------------------------------------------------------------------------------------------------

// Write text to document.
//
// Arguments:
//   text - write text to document.
JD.Content.Write = function(text)
{
    document.write(text);
}

//--------------------------------------------------------------------------------------------------

// Class name string.
//
// Arguments:
//   c - class name.
JD.Content.ClassStr = function(c)
{
    if (!c)
    {
        return "";
    }
    else
    {
        return " class=\"" + c + "\"";
    }
}

//--------------------------------------------------------------------------------------------------

// Write IMG to document.
//
// Arguments:
//   url - url string,
//   c - class name.
JD.Content.IMG = function(url, c)
{
    with (JD.Content)
    {
        str = "<img src=\"" + url + "\"" + ClassStr(c) + ">";
        Write(str);
    }
}

//--------------------------------------------------------------------------------------------------

// Write HR to document.
//
// Arguments:
//   c - class name.
JD.Content.HR = function(c)
{
    with (JD.Content)
    {
        str = "<hr " + ClassStr(c) + ">";
        Write(str);
    }
}

//--------------------------------------------------------------------------------------------------

// Write IFRAME to document.
//
// Arguments:
//   url - url string,
//   c - class name.
JD.Content.IFRAME = function(url, c)
{
    with (JD.Content)
    {
        str = "<iframe src=\"" + url + "\"" + ClassStr(c) + "></iframe>";
        Write(str);
    }
}

//--------------------------------------------------------------------------------------------------

// Write DIV to document.
//
// Arguments:
//   pos - position type,
//   x - x coordinate,
//   y - y coordinate,
//   width - width,
//   height - height,
//   text - text of div,
//   c - class name.
JD.Content.DIV = function(pos, x, y, width, height, text, c)
{
    with (JD.Content)
    {
        style_str = "style=\"position : " + pos
            + "; top : " + y + "px"
            + "; left : " + x + "px"
            + "; height : " + height + "px"
            + "; width : " + width + "px"
            + "\"";
        str = "<div " + style_str + ClassStr(c) + ">" + text + "</div>";
        Write(str);
    }
}

//--------------------------------------------------------------------------------------------------

// Write BR to document.
JD.Content.BR = function()
{
    JD.Content.Write("<br>");
}

//--------------------------------------------------------------------------------------------------

// Write P to document.
//
// Arguments:
//   text - text,
//   c - class name.
JD.Content.P = function(text, c)
{
    with (JD.Content)
    {
        str = "<p" + ClassStr(c) + ">" + text + "</p>";
        Write(str);
    }
}

//--------------------------------------------------------------------------------------------------

// Write A to document.
//
// Arguments:
//   name - anchor name.
JD.Content.A = function(name)
{
    with (JD.Content)
    {
        str = "<a name=\"" + name + "\"></a>";
        Write(str);
    }
}

//--------------------------------------------------------------------------------------------------

// Quoted text.
//
// Arguments:
//   text - text.
JD.Content.Quote = function(text)
{
    return "&laquo;" + text + "&raquo;";
}

//--------------------------------------------------------------------------------------------------

// Get number value of element.
//
// Arguments:
//   doc - document,
//   id - element identifier.
//
// Result:
//   Value.
JD.Content.ElementNValue = function(doc, id)
{
    return doc.getElementById(id).value - 0;
}

//--------------------------------------------------------------------------------------------------

// Is element (checkbox) checked.
//
// Arguments:
//   doc - document,
//   id - element identifier.
//
// Result:
//   Check value.
JD.Content.IsElementChecked = function(doc, id)
{
    var e = doc.getElementById(id);

    if (e)
    {
        return e.checked;
    }

    return false;
}

//--------------------------------------------------------------------------------------------------

