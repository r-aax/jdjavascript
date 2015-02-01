/**
 * Content.js.
 *
 * Copyright Joy Developing.
 */

// Initialize.
var JD;
if (!JD) JD = {};
JD.Content = {};

// Say message.
JD.Content.Say = function(str)
{
    alert(str);
}

// Write text to document.
JD.Content.Write = function(text)
{
    document.write(text);
}

// Class name string.
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

// Write IMG to document.
JD.Content.IMG = function(url, c)
{
    with (JD.Content)
    {
        str = "<img src=\"" + url + "\"" + ClassStr(c) + ">";
        Write(str);
    }
}

// Write HR to document.
JD.Content.HR = function(c)
{
    with (JD.Content)
    {
        str = "<hr " + ClassStr(c) + ">";
        Write(str);
    }
}

// Write IFRAME to document.
JD.Content.IFRAME = function(url, c)
{
    with (JD.Content)
    {
        str = "<iframe src=\"" + url + "\"" + ClassStr(c) + "></iframe>";
        Write(str);
    }
}

// Write DIV to document.
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

// Write BR to document.
JD.Content.BR = function()
{
    JD.Content.Write("<br>");
}

// Write P to document.
JD.Content.P = function(text, c)
{
    with (JD.Content)
    {
        str = "<p" + ClassStr(c) + ">" + text + "</p>";
        Write(str);
    }
}

// Write A to document.
JD.Content.A = function(name)
{
    with (JD.Content)
    {
        str = "<a name=\"" + name + "\"></a>";
        Write(str);
    }
}

// Quoted text.
JD.Content.Quote = function(text)
{
    return "&laquo;" + text + "&raquo;";
}

