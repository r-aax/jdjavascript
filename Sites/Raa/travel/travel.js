// travel.js - function for travel page.
//
// Author: Alexey Rybakov

//--------------------------------------------------------------------------------------------------

 // Get quoted text.
 //
 // Arguments:
 //   text - text.
 //
 // Result:
 //   Quoted text.
function quote(text)
{
    return "&laquo;" + text + "&raquo;";
}

//--------------------------------------------------------------------------------------------------

// Put image to document.
function img(url)
{
    with (raa.Content)
    {
        BR();
        IMG(url, "default");
        BR();
    }
}

//--------------------------------------------------------------------------------------------------

// Write images in given range.
//
// Arguments:
//   dir - directory (folder),
//   ind_from - start index,
//   ind_to - end index,
//   ext - extension.
function imgs(dir, ind_from, ind_to, ext)
{
    for (i = ind_from; i <= ind_to; i++)
    {
        if (i < 10)
        {
            num_str = "0" + i;
        }
        else
        {
            num_str = i;
        }
        img(dir + "/" + num_str + "." + ext);
    }
}

//--------------------------------------------------------------------------------------------------

// Block with anchor and information.
//
// Arguments:
//   name - anchor name,
//   str - header string,
//   ind_from - images start index,
//   ind_to - images end index.
function a_imgs(name, str, ind_from, ind_to, ext)
{
    a(name);
    p(str, "h2");
    imgs(name, ind_from, ind_to, ext)
}

//--------------------------------------------------------------------------------------------------

// Paragraph with class.
//
// Arguments:
//   text - paragpraph text,
//   c - class.
function p(text, c)
{
    if(c == "quote")
    {
        str = quote(text);
    }
    else
    {
        str = text;
    }
    raa.Content.P(str, c);
}

//--------------------------------------------------------------------------------------------------

// Write anchor.
//
// Arguments:
//   name - name.
function a(name)
{
    raa.Content.A(name);
}

//--------------------------------------------------------------------------------------------------

// Submenu items.
//
// Arguments:
//   place - name of place,
//   doc_anchor - anchor inside root document.
function SubmenuItem(place, doc_anchor)
{
    this.Place = place;
    this.DocAnchor = doc_anchor;
}
SubmenuItem.prototype.toString = function()
{
    return "{" + this.Place + " (" + this.DocAnchor + ")}";
}

//--------------------------------------------------------------------------------------------------

// Menu item.
//
// Arguments:
//   date - date,
//   country - country,
//   places - places list,
//   doc_link - link to root document.
function MenuItem(date, country, places, doc_link)
{
    this.Date = date;
    this.Country = country;
    this.Places = places;
    this.DocLink = doc_link;
}
MenuItem.prototype.toString = function()
{
    string = "[" + this.Date + ", " + this.Country + " (" + this.DocLink + ") :";
    for (i = 0; i < this.Places.length; i++)
    {
        string += this.Places[i].toString();
        if (i != (this.Places.length - 1))
        {
            string += ", ";
        }
    }
    string += "]";
    return string;
}

//--------------------------------------------------------------------------------------------------

// Extended munu item.
//
// Arguments:
//   date - date,
//   country - country,
//   place - place,
//   doc_link - document link.
function XMenuItem(date, country, place, doc_link)
{
    this.Date = date;
    this.Country = country;
    this.Place = place;
    this.DocLink = doc_link;
    this.Count = 0;
}
XMenuItem.prototype.toString = function()
{
    return "{" + this.Date + ", " + this.Country + ", " + this.Place + ", " + this.DocLink + ", " + this.Count + "}";
}

//--------------------------------------------------------------------------------------------------

// Compares function.
//
// Arguments:
//   str1 - first string,
//   str2 - second string.
//
// Result:
//   true - if str1 > str2,
//   false if str1 <= str2.
cmp_str_f = function(str1, str2)
{
    if (str1 > str2)
    {
        return 1;
    }
    if (str2 > str1)
    {
        return -1;
    }
    return 0;
}
cmp_str_b = function(str1, str2) { return -cmp_str_f(str1, str2); }
cmp_xi_df = function(x1, x2)
{
    res = cmp_str_f(x1.Date.substr(0, 7), x2.Date.substr(0, 7));
    if (res != 0)
    {
        return res;
    }
    return cmp_str_f(x1.Country + x1.Place, x2.Country + x2.Place);
}
cmp_xi_db = function(x1, x2)
{
    res = cmp_str_b(x1.Date.substr(0, 7), x2.Date.substr(0, 7));
    if (res != 0)
    {
        return res;
    }
    return cmp_str_f(x1.Country + x1.Place, x2.Country + x2.Place);
}
cmp_xi_cf = function(x1, x2)
{
    res = cmp_str_f(x1.Country, x2.Country);
    if (res != 0)
    {
        return res;
    }
    return cmp_str_f(x1.Place + x1.Date, x2.Place + x2.Date);
}
cmp_xi_cb = function(x1, x2)
{
    res = cmp_str_b(x1.Country, x2.Country);
    if (res != 0)
    {
        return res;
    }
    return cmp_str_f(x1.Place + x1.Date, x2.Place + x2.Date);
}
cmp_xi_pf = function(x1, x2)
{
    res = cmp_str_f(x1.Place + x1.Country, x2.Place + x2.Country);
    if (res != 0)
    {
        return res;
    }
    return cmp_str_f(x1.Date, x2.Date);
}
cmp_xi_pb = function(x1, x2)
{
    res = cmp_str_b(x1.Place + x1.Country, x2.Place + x2.Country);
    if (res != 0)
    {
        return res;
    }
    return cmp_str_f(x1.Date, x2.Date);
}

//--------------------------------------------------------------------------------------------------

// Create menu.
//
// Result:
//   Menu.
function create_menu()
{
    arr =
        [
            new MenuItem
            (
                "2006-04", "Италия",
                [
                    new SubmenuItem("Римини", "rimini"),
                    new SubmenuItem("Равенна", "ravenna"),
                    new SubmenuItem("Венеция", "venice"),
                    new SubmenuItem("Верона", "verona"),
                    new SubmenuItem("Сирмионе", "sirmione"),
                    new SubmenuItem("Милан", "milan"),
                    new SubmenuItem("Парма", "parma"),
                    new SubmenuItem("Флоренция", "florence"),
                    new SubmenuItem("Сиена", "siena"),
                    new SubmenuItem("Орвието", "orvieto"),
                    new SubmenuItem("Рим", "rome"),
                    new SubmenuItem("Пиза", "pisa")
                ],
                "italy.06/index.html"
            ),
            new MenuItem("2006-04", "Сан-Марино", [new SubmenuItem("Сан-Марино", "san_marino")], "italy.06/index.html"),
            new MenuItem("2006-04", "Ватикан", [new SubmenuItem("Ватикан", "vatican")], "italy.06/index.html"),
            new MenuItem
            (
                "2006-08", "Испания",
                [
                    new SubmenuItem("Салоу", "salou"),
                    new SubmenuItem("Порт Авентура", "port_aventura"),
                    new SubmenuItem("Барселона", "barcelona")
                ],
                "spain.06/index.html"
            ),
            new MenuItem("2007-06", "Россия", [new SubmenuItem("Санкт-Петербург", "")], "piter.07/index.html"),
            new MenuItem
            (
                "2007-07", "Россия",
                [
                    new SubmenuItem("Калязин", "kalyazin"),
                    new SubmenuItem("Углич", "uglich"),
                    new SubmenuItem("Рыбинск", "rybinsk"),
                    new SubmenuItem("Тутаев", "tutaev")
                ],
                "rybinsk.07/index.html"
            ),
            new MenuItem("2007-11", "Белоруссия", [new SubmenuItem("Минск", "")], "minsk.07/index.html"),
            new MenuItem("2008-07", "Россия", [new SubmenuItem("Киров", "")], "short/kirov.0807/index.html"),
            new MenuItem("2008-10", "Россия", [new SubmenuItem("Казань", "")], "kazan.08/index.html"),
            new MenuItem("2008-11", "Китай", [new SubmenuItem("Санья", "")], "china.08/index.html"),
            new MenuItem("2008-12", "Россия", [new SubmenuItem("Киров", "")], "short/kirov.0812/index.html"),
            new MenuItem("2009-01", "Эстония", [new SubmenuItem("Таллинн", "")], "tallinn.09/index_tallinn.html"),
            new MenuItem("2009-01", "Финляндия", [new SubmenuItem("Хельсинки", "")], "tallinn.09/index_helsinki.html"),
            new MenuItem("2009-08", "Россия", [new SubmenuItem("Надым", "")], "short/nadym.09/index.html"),
            new MenuItem
            (
                "2009-09", "Польша",
                [
                    new SubmenuItem("Варшава", "warshaw"),
                    new SubmenuItem("Познань", "poznan")
                ],
                "europe.09/poland/index.html"
            ),
            new MenuItem
            (
                "2009-09", "Германия",
                [
                    new SubmenuItem("Берлин", "berlin"),
                    new SubmenuItem("Мюнхен", "munich")
                ],
                "europe.09/germany/index.html"
            ),
            new MenuItem
            (
                "2009-09", "Нидерланды",
                [
                    new SubmenuItem("Амстердам", "amsterdam"),
                    new SubmenuItem("Роттердам", "rotterdam"),
                    new SubmenuItem("Дельфт", "delft"),
                    new SubmenuItem("Гаага", "haag")
                ],
                "europe.09/netherlands/index.html"
            ),
            new MenuItem("2009-09", "Швейцария", [new SubmenuItem("Цюрих", "")], "europe.09/switzerland/index.html"),
            new MenuItem("2009-09", "Чехия", [new SubmenuItem("Прага", "")], "europe.09/czech/index.html"),
            new MenuItem
            (
                "2011-09", "Испания",
                [
                    new SubmenuItem("Марбелья", "marbella"),
                    new SubmenuItem("Пуэрто Банус", "puerto_banus"),
                    new SubmenuItem("Малага", "malaga"),
                    new SubmenuItem("Фуэнхирола", "fuengirola"),
                    new SubmenuItem("Михас", "mijas")
                ],
                "spain.11/index.html"
            ),
            new MenuItem
            (
                "2012-09", "Испания",
                [
                    new SubmenuItem("Марбелья", "marbella"),
                    new SubmenuItem("Пуэрто Банус", "puerto_banus")
                ],
                "spain.12/index.html"
            ),
            new MenuItem("2012-11", "Германия", [new SubmenuItem("Мюнхен", "")], "munich.12/index.html"),
			new MenuItem("2016-06", "Россия", [new SubmenuItem("Казань", "")], "kazan.16/index.html"),
			new MenuItem("2016-06", "Германия", [new SubmenuItem("Франкфурт", "")], "frankfurt.16/index.html"),
			new MenuItem
			(
				"2016-09", "Россия",
				[
					new SubmenuItem("Калининград", "kaliningrad"),
					new SubmenuItem("Светлогорск", "svetlogorsk"),
					new SubmenuItem("Зеленоградск", "zelenogradsk")
				],
				"kaliningrad.16/index.html"
			)
        ];

    return arr;
}

//--------------------------------------------------------------------------------------------------

// Flatten general menu.
//
// Arguments:
//   menu - general menu.
//
// Result:
//   Flat menu.
function flat_menu(menu)
{
    arr = [];
    cur = 0;

    for (i = 0; i < menu.length; i++)
    {
        mi = menu[i];
        for (j = 0; j < mi.Places.length; j++)
        {
            si = mi.Places[j];
            full_link = mi.DocLink;
            if (si.DocAnchor != "")
            {
                full_link += "#" + si.DocAnchor;
            }
            arr[cur++] = new XMenuItem(mi.Date, mi.Country, si.Place, full_link);
        }
    }

    return arr;
}

//--------------------------------------------------------------------------------------------------

// Count inner elements,
//
// Arguments:
//   xmenu - flat menu.
function count_inner_elements(xmenu)
{
    for (i = 0; i < xmenu.length; i++)
    {
        xmenu[i].Count = 5;
    }
}

//--------------------------------------------------------------------------------------------------

// Get month string from date.
//
// Arguments:
//   date - date.
//
// Result:
//   Month string.
function month(date)
{
    switch (date.substr(5, 2))
    {
        case "01": return "янв";
        case "02": return "фев";
        case "03": return "мар";
        case "04": return "апр";
        case "05": return "май";
        case "06": return "июн";
        case "07": return "июл";
        case "08": return "авг";
        case "09": return "сен";
        case "10": return "окт";
        case "11": return "ноя";
        case "12": return "дек";
        default: alert("error");
    }
}

//--------------------------------------------------------------------------------------------------

// Get year from date string.
//
// Arguments:
//   date - date string.
//
// Result:
//   Year.
function year(date)
{
    return date.substr(0, 4);
}

//--------------------------------------------------------------------------------------------------

// Flat menu item HTML.
//
// Arguments:
//   xi - menu item,
//   sort_function - sort function.
//
// Result:
//   HTML.
function xi_html(xi, sort_function)
{
    html = "<a href=\"" + xi.DocLink + "\" target=\"iframe\">";
    if ((sort_function == cmp_xi_df) || (sort_function == cmp_xi_db))
    {
        return html + "<b><nobr>" + month(xi.Date) + "</nobr></b>: " + xi.Country + " - " + xi.Place + "</a>";
    }
    if ((sort_function == cmp_xi_cf) || (sort_function == cmp_xi_cb))
    {
        return html + xi.Place + " (<nobr>" + month(xi.Date) + " " + year(xi.Date) + "</nobr>)</a>";
    }
    return "<li>error: unknown sort_function</li>";
}

//--------------------------------------------------------------------------------------------------

// Place sort flat menu item HTML.
//
// Arguments:
//   xi - menu item,
//   only_date - only date flag.
//
// Result:
//   HTML.
function xi_html_p(xi, only_date)
{
    // NB!
    loc_html = "<a href=\"" + xi.DocLink + "\" target=\"iframe\">";
    if (!only_date)
    {
        loc_html += "<b>" + xi.Place + "</b> (" + xi.Country + ") ";
    }
    loc_html += "(<nobr>" + xi.Date + "</nobr>)</a>";
    return loc_html;
}

//--------------------------------------------------------------------------------------------------

// Draw menu.
//
// Arguments:
//   sort_function - sort function.
function draw_menu(sort_function)
{
    menu = create_menu();
    xmenu = flat_menu(menu);
    xmenu.sort(sort_function);
    count_inner_elements(xmenu);

    html = "<ul>";

    if ((sort_function == cmp_xi_pf) || (sort_function == cmp_xi_pb))
    {
        html += "<li>";
        root_place = "";
        cur_place = "";
        for (i = 0; i < xmenu.length; i++)
        {
            cur_place = "<b>" + xmenu[i].Place + "</b> (" + xmenu[i].Country + ")";
            if (cur_place != root_place)
            {
                if (i != 0)
                {
                    html += "</li><li>";
                }
                html_m = html + cur_place + " " + xi_html_p(xmenu[i], true);
                html += xi_html_p(xmenu[i], false);
                root_place = cur_place;
            }
            else
            {
                html = html_m;
                html += " " + xi_html_p(xmenu[i], true);
            }
        }
        html += "</li>";
    }
    else if ((sort_function == cmp_xi_df) || (sort_function == cmp_xi_db))
    {
        root_year = "";
        cur_year = "";
        for (i = 0; i < xmenu.length; i++)
        {
            cur_year = year(xmenu[i].Date);
            if (root_year != cur_year)
            {
                if (root_year != "")
                {
                    html += "</ul><br></li>";
                }
                html += "<li><b>" + cur_year + "</b><br><br><ul>";
            }
            html += "<li>" + xi_html(xmenu[i], sort_function) + "</li>";
            if (root_year != cur_year)
            {
                root_year = cur_year;
            }
        }
        if (root_year != "")
        {
            html += "</ul></li>";
        }
    }
    else
    {
        root_country = "";
        cur_country = "";
        for (i = 0; i < xmenu.length; i++)
        {
            cur_country = xmenu[i].Country;
            if (root_country != cur_country)
            {
                if (root_country != "")
                {
                    html += "</ul><br></li>";
                }
                html += "<li><b>" + cur_country + "</b><br><br><ul>";
            }
            html += "<li>" + xi_html(xmenu[i], sort_function) + "</li>";
            if (root_country != cur_country)
            {
                root_country = cur_country;
            }
        }
        if (root_country != "")
        {
            html += "</ul></li>";
        }
    }

    html += "</ul>"

    document.getElementById("menudiv").innerHTML = html;
}

//--------------------------------------------------------------------------------------------------

// Travel statistic.
//
// Result:
//   Statistic string.
function travel_statistic()
{
    menu = create_menu();
    xmenu = flat_menu(menu);

    // Countries.
    xmenu.sort(cmp_xi_cf);
    countries_count = 0;
    previous_country = "";
    for (i = 0; i < xmenu.length; i++)
    {
        if (xmenu[i].Country != previous_country)
        {
            countries_count++;
            previous_country = xmenu[i].Country;
        }
    }

    // Places and visits.
    xmenu.sort(cmp_xi_pf);
    places_count = 0;
    visits_count = 0;
    previous_place = "";
    for (i = 0; i < xmenu.length; i++)
    {
        if (xmenu[i].Place != previous_place)
        {
            places_count++;
            previous_place = xmenu[i].Place;
        }

        visits_count++;
    }

    return "countries/places/visits - " + countries_count + "/" + places_count + "/" + visits_count;
}

//--------------------------------------------------------------------------------------------------

