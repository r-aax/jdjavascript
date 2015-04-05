// Vocabulary.js - vocabulary for english tests.
//
// Author: Alexey Rybakov

//--------------------------------------------------------------------------------------------------
// Create.
//--------------------------------------------------------------------------------------------------

// Create vocabulary.
function Vocabulary()
{
    this.Subvocabularies = new Array();

    this.Subvocabularies.push(CreateSubvocabulary_Top100());
    this.Subvocabularies.push(CreateSubvocabulary_Top400Things());
    this.Subvocabularies.push(CreateSubvocabulary_IrregularVerbs());
    this.Subvocabularies.push(CreateSubvocabulary_Armor());
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

