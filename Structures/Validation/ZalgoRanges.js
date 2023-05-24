const zalgoRanges = [
	/[\u0300-\u036f]/g, // Combining diacritical marks
	/[\u0483-\u0489]/g, // Combining Cyrillic
	/[\u0591-\u05bd]/g, // Hebrew combining diacritics
	/[\u05bf-\u05c7]/g, // Hebrew combining punctuation
	/[\u0600-\u0605]/g, // Arabic combining marks
	/[\u0610-\u061a]/g, // Arabic vowel signs
	/[\u064b-\u065f]/g, // Arabic combining marks
	/[\u0670]/g, // Arabic letter superscript alef
	/[\u06d6-\u06dc]/g, // Arabic combining small high
	/[\u06dd-\u06df]/g, // Arabic combining small low
	/[\u06e0-\u06e4]/g, // Arabic combining hamza
	/[\u06e7-\u06ed]/g, // Arabic combining marks
	/[\u06f0-\u06f9]/g, // Eastern Arabic-Indic digits
	/[\u0711]/g, // Syriac letter superscript alaph
	/[\u0730-\u074a]/g, // Syriac combining marks
	/[\u07a6-\u07b0]/g, // Thaana combining marks
	/[\u07eb-\u07f3]/g, // N'Ko combining marks
	/[\u0816-\u0819]/g, // Samaritan combining diacritical marks
	/[\u081b-\u0823]/g, // Samaritan combining punctuation
	/[\u0825-\u0827]/g, // Samaritan combining marks
	/[\u0829-\u082d]/g, // Samaritan combining marks
	/[\u0859-\u085b]/g, // Mandaic combining marks
	/[\u08d4-\u08e1]/g, // Arabic small high signs
	/[\u08e3-\u0903]/g, // Arabic combining signs
	/[\u093a-\u093c]/g, // Devanagari vowel signs
	/[\u0941-\u0948]/g, // Devanagari vowel signs
	/[\u094d]/g, // Devanagari sign virama
	/[\u0951-\u0957]/g, // Devanagari stress marks
	/[\u0962-\u0963]/g, // Devanagari vowel sign vocalic l
	/[\u0981-\u0983]/g, // Bengali vowel signs
	/[\u09bc]/g, // Bengali sign nukta
	/[\u09be-\u09c4]/g, // Bengali vowel signs
	/[\u09cd]/g, // Bengali sign virama
	/[\u09d7]/g, // Bengali au length mark
	/[\u09e2-\u09e3]/g, // Bengali vowel sign vocalic l
	/[\u0a01-\u0a03]/g, // Gurmukhi vowel signs
	/[\u0a3c]/g, // Gurmukhi sign nukta
	/[\u0a3e-\u0a42]/g, // Gurmukhi vowel signs
	/[\u0a47-\u0a48]/g, // Gurmukhi vowel signs
	/[\u0a4b-\u0a4d]/g, // Gurmukhi vowel signs
	/[\u0a51]/g, // Gurmukhi sign udaat
	/[\u0a70-\u0a71]/g, // Gurmukhi addak
	/[\u0a75]/g, // Gurmukhi sign yakash
	/[\u0a81-\u0a83]/g, // Gujarati vowel signs
	/[\u0abe-\u0ac5]/g, // Gujarati vowel signs
	/[\u0ac7-\u0ac9]/g, // Gujarati vowel signs
	/[\u0acb-\u0acd]/g, // Gujarati vowel signs
	/[\u0ae2-\u0ae3]/g, // Gujarati vowel sign vocalic l
	/[\u0afa-\u0aff]/g, // Gujarati sign
	/[\u0b01-\u0b03]/g, // Oriya vowel signs
	/[\u0b3e-\u0b44]/g, // Oriya vowel signs
	/[\u0b47-\u0b48]/g, // Oriya vowel signs
	/[\u0b4b-\u0b4d]/g, // Oriya vowel signs
	/[\u0b56-\u0b57]/g, // Oriya ai length mark
	/[\u0b62-\u0b63]/g, // Oriya vowel sign vocalic l
	/[\u0b82-\u0b83]/g, // Tamil vowel signs
	/[\u0bbe-\u0bc2]/g, // Tamil vowel signs
	/[\u0bc6-\u0bc8]/g, // Tamil vowel signs
	/[\u0bca-\u0bcd]/g, // Tamil vowel signs
	/[\u0bd7]/g, // Tamil au length mark
	/[\u0c00-\u0c03]/g, // Telugu vowel signs
	/[\u0c3e-\u0c44]/g, // Telugu vowel signs
	/[\u0c46-\u0c48]/g, // Telugu vowel signs
	/[\u0c4a-\u0c4d]/g, // Telugu vowel signs
	/[\u0c55-\u0c56]/g, // Telugu ai length mark
	/[\u0c62-\u0c63]/g, // Telugu vowel sign vocalic l
	/[\u0c81-\u0c83]/g, // Kannada vowel signs
	/[\u0cbe-\u0cc4]/g, // Kannada vowel signs
	/[\u0cc6-\u0cc8]/g, // Kannada vowel signs
	/[\u0cca-\u0ccd]/g, // Kannada vowel signs
	/[\u0cd5-\u0cd6]/g, // Kannada length mark
	/[\u0ce2-\u0ce3]/g, // Kannada vowel sign vocalic l
	/[\u0d00-\u0d03]/g, // Malayalam vowel signs
	/[\u0d3e-\u0d44]/g, // Malayalam vowel signs
	/[\u0d46-\u0d48]/g, // Malayalam vowel signs
	/[\u0d4a-\u0d4d]/g, // Malayalam vowel signs
	/[\u0d57]/g, // Malayalam au length mark
	/[\u0d62-\u0d63]/g, // Malayalam vowel sign vocalic l
	/[\u0d82-\u0d83]/g, // Sinhala vowel signs
	/[\u0dcf-\u0dd4]/g, // Sinhala vowel signs
	/[\u0dd6]/g, // Sinhala vowel sign au
	/[\u0dd8-\u0ddf]/g, // Sinhala vowel signs
	/[\u0df2-\u0df3]/g, // Sinhala vowel sign vocalic l
	/[\u0e34-\u0e3a]/g, // Thai vowel signs
	/[\u0e47-\u0e4e]/g, // Thai vowel signs
	/[\u0eb1]/g, // Lao vowel sign mai kan
	/[\u0eb4-\u0eb9]/g, // Lao vowel signs
	/[\u0ebb-\u0ebc]/g, // Lao vowel signs
	/[\u0ec8-\u0ecd]/g, // Lao vowel signs
	/[\u0f18-\u0f19]/g, // Tibetan vowel signs
	/[\u0f35]/g, // Tibetan mark ngas bzung nyi zla
	/[\u0f37]/g, // Tibetan mark ngas bzungs sgab
	/[\u0f39]/g, // Tibetan mark tsa phru
	/[\u0f3e-\u0f3f]/g, // Tibetan sign yar tshes
	/[\u0f71-\u0f84]/g, // Tibetan vowel signs
	/[\u0f86-\u0f8b]/g, // Tibetan vowel signs
	/[\u0f90-\u0f95]/g, // Tibetan vowel signs
	/[\u0f97-\u0f9d]/g, // Tibetan vowel signs
	/[\u0fab-\u0fad]/g, // Tibetan sign rjes su nga ro
	/[\u0fb1-\u0fb7]/g, // Tibetan vowel signs
	/[\u0fb9]/g, // Tibetan sign sbrul shad
	/[\u20d0-\u20dc]/g, // Combining marks for symbols
	/[\u20e1]/g, // Combining enclosing circle backslash
	/[\u302a-\u302f]/g, // Ideographic diacritical marks
	/[\u3099-\u309c]/g, // Combining marks for kana
	/[\ua802]/g, // Syloti Nagri sign dvisvara
	/[\ua806]/g, // Syloti Nagri sign hasanta
	/[\ua80b]/g, // Syloti Nagri sign anusvara
	/[\ua825-\ua826]/g, // Syloti Nagri vowel signs
	/[\ua8c4-\ua8c5]/g, // Saurashtra sign virama and candra
	/[\ua8e0-\ua8f1]/g, // Combining devanagari digit signs
	/[\ua926-\ua92d]/g, // Kayah Li tone marks
	/[\ua947-\ua951]/g, // Rejang vowel signs
	/[\ua980-\ua982]/g, // Javanese vowel signs
	/[\ua9b3-\ua9b5]/g, // Javanese vowel sign tarung
	/[\ua9b6-\ua9b9]/g, // Javanese vowel signs
	/[\ua9bc]/g, // Javanese sign leu
	/[\uaa29-\uaa2e]/g, // Cham vowel signs
	/[\uaa31-\uaa32]/g, // Cham vowel signs
	/[\uaa35-\uaa36]/g, // Cham vowel signs
	/[\uaa43]/g, // Cham vowel sign o
	/[\uaa4c]/g, // Cham sign virama
	/[\uaa7c-\uaa7d]/g, // Myanmar vowel signs
	/[\uaab0]/g, // Tai Viet mai khit
	/[\uaab2-\uaab4]/g, // Tai Viet vowel signs
	/[\uaab7-\uaab8]/g, // Tai Viet vowel signs
	/[\uaabe-\uaabf]/g, // Tai Viet vowel signs
	/[\uaac1]/g, // Tai Viet vowel signs
	/[\uaaec-\uaaed]/g, // Meetei Mayek vowel signs
	/[\uabe5-\uabea]/g, // Meetei Mayek vowel signs
	/[\uac00-\ud7af]/g, // Hangul syllables
	/[\ud800-\udc00\udc00-\udfff]/g, // Surrogate pairs
	/[\ufe00-\ufe0f]/g, // Variation selectors
	/[\ufe20-\ufe2f]/g, // Combining half marks
	/[\ufe33-\ufe34]/g, // CJK compatibility forms
	/[\ufe4d-\ufe4f]/g, // CJK compatibility forms
	/[\uff10-\uff19]/g, // Fullwidth digits
	/[\uff21-\uff3a\uff41-\uff5a]/g, // Fullwidth letters
	/[\uff66-\uff9f]/g, // Halfwidth Katakana
];

//const zalgoRanges = [ /[\u0300-\u036f\u0483-\u0489\u1dc0-\u1dff\u20d0-\u20ff\uFE20-\uFE2F]/g ];

/* const zalgoRanges = [
	/[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e4-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70-\u0a71\u0a75\u0a81-\u0a83\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0afa-\u0aff\u0b01-\u0b03\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82-\u0b83\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be2-\u0be3\u0c00-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55-\u0c56\u0c62\u0c63\u0c81-\u0c83\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5-\u0cd6\u0ce2-\u0ce3\u0d00-\u0d03\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62-\u0d63\u0d82-\u0d83\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2-\u0df3\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb-\u0ebc\u0ec8-\u0ecd\u0f18-\u0f19\u0f35\u0f37\u0f39\u0f3e-\u0f3f\u0f71-\u0f84\u0f86-\u0f8b\u0f90-\u0f95\u0f97-\u0f9d\u0fab-\u0fad\u0fb1-\u0fb7\u0fb9\u20d0-\u20dc\u20e1\u302a-\u302f\u3099-\u309c\ua802\ua806\ua80b\ua825-\ua826\ua8c4-\ua8c5\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3-\ua9b5\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31-\uaa32\uaa35-\uaa36\uaa43\uaa4c\uaa7c-\uaa7d\uaab0\uaab2-\uaab4\uaab7-\uaab8\uaabe-\uaabf\uaac1\uaaec-\uaaed\uabe5-\uabea\uac00-\ud7af\ud800-\udc00\udc00-\udfff\ufe00-\ufe0f\ufe20-\ufe2f\ufe33-\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff21-\uff3a\uff41-\uff5a\uff66-\uff9f]/g,
]; */

module.exports = { zalgoRanges };