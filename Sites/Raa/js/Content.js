/**
 * Content.js - модуль для создания наполнения сайта.
 */

 
// Определение пространства имен.
var raa;
if (!raa) raa = {};
raa.Content = {};


// Вывод сообщения.
raa.Content.Say = function(str)
{
	alert(str);
}


// Простая печать.
raa.Content.Write = function(text)
{
	document.write(text);
}


// Задание класса если он есть.
raa.Content.ClassStr = function(c)
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


// Вывод изображения данного класса.
raa.Content.IMG = function(url, c)
{
	with (raa.Content)
	{
		str = "<img src=\"" + url + "\"" + ClassStr(c) + ">";
		Write(str);
	}
}


// Горизонтальный разделитель.
raa.Content.HR = function(c)
{
	with (raa.Content)
	{
		str = "<hr " + ClassStr(c) + ">";
		Write(str);
	}
}


// Область отображения другой страницы.
raa.Content.IFRAME = function(url, c)
{
	with (raa.Content)
	{
		str = "<iframe src=\"" + url + "\"" + ClassStr(c) + "></iframe>";
		Write(str);
	}
}


// Отображение простого слоя.
raa.Content.DIV = function(pos, x, y, width, height, text, c)
{
	with (raa.Content)
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


// Перенос строки.
raa.Content.BR = function()
{
	raa.Content.Write("<br>");
}


// Оформление абзацев.
raa.Content.P = function(text, c)
{
	with (raa.Content)
	{
		str = "<p" + ClassStr(c) + ">" + text + "</p>";
		Write(str);
	}
}


// Якорь.
raa.Content.A = function(name)
{
	with (raa.Content)
	{
		str = "<a name=\"" + name + "\"></a>";
		Write(str);
	}
}

// Взятие в кавычки.
raa.Content.Quote = function(text)
{
	return "&laquo;" + text + "&raquo;";
}
