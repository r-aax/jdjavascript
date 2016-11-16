// Vocabulary.js - vocabulary for english tests.
//
// Author: Alexey Rybakov

//--------------------------------------------------------------------------------------------------
// Create.
//--------------------------------------------------------------------------------------------------

// Create vocabulary.
//
// Arguments:
//   doc - document.
function Vocabulary(doc)
{
    this.Subvocabularies = new Array();

    with (JD.Content)
    {
        if (JD.Content.IsElementChecked(doc, "sub_top_100"))
        {
            this.Subvocabularies.push(CreateSubvocabulary_Top100());
        }

        if (IsElementChecked(doc, "sub_top_400_things"))
        {
            this.Subvocabularies.push(CreateSubvocabulary_Top400Things());
        }

        if (IsElementChecked(doc, "sub_top_100_qualities"))
        {
            this.Subvocabularies.push(CreateSubvocabulary_Top100Qualities());
        }

        if (IsElementChecked(doc, "sub_top_200_picturable"))
        {
            this.Subvocabularies.push(CreateSubvocabulary_Top200Picturable());
        }

        if (IsElementChecked(doc, "sub_irregular_verbs"))
        {
            this.Subvocabularies.push(CreateSubvocabulary_IrregularVerbs());
        }

        if (IsElementChecked(doc, "sub_armor"))
        {
            this.Subvocabularies.push(CreateSubvocabulary_Armor());
        }
		
		if (IsElementChecked(doc, "sub_rierson_critical_software"))
		{
			this.Subvocabularies.push(CreateSubvocabulary_RiersonCriticalSoftware());
		}
    }
}

//--------------------------------------------------------------------------------------------------
// Statistic.
//--------------------------------------------------------------------------------------------------

// Get count of words in vocabulary.
//
// Result:
//   Total count of words.
Vocabulary.prototype.Count = function()
{
    var n = 0;

    for (var i = 0; i < this.Subvocabularies.length; i++)
    {
        n += this.Subvocabularies[i].length;
    }

    return n;
}

//--------------------------------------------------------------------------------------------------

// Get random word (record) from vocabulary.
//
// Result:
//   Random record of words.
Vocabulary.prototype.Random = function()
{
    var c = this.Count();
    var n = JD.Utils.RandomN(0, c - 1);

    for (var i = 0; i < this.Subvocabularies.length; i++)
    {
        if (n < this.Subvocabularies[i].length)
        {
            return this.Subvocabularies[i][n];
        }

        n -= this.Subvocabularies[i].length;
    }

    JD.Utils.InternalError();
}

//--------------------------------------------------------------------------------------------------

