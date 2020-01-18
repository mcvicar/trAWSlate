const { Translate } = require('aws-sdk');
const core = require("../lib/core.js");
const exmapleTranslations = require("../examples/translations.json");
const singleEnTranslation = require("../examples/translation.en.json");
const singleEsTranslation = require("../examples/translation.es.json");
var translations = singleEnTranslation;

jest.mock('aws-sdk');

beforeAll(() => {
  core.tempRequest.TargetLanguageCode = "es";
});

describe('Test translation source', () => {

  test('We get the first translation language', () => {
  	var expected = singleEnTranslation;
  	var actual = core.getSourceTranslation(exmapleTranslations);
	expect(expected).toMatchObject(actual);
  });
  
  test('Source language to be en', () => {
  	var expected = "en"
  	var actual = core.tempRequest.SourceLanguageCode;
	expect(expected).toBe(actual);
  });
  
});

describe('Test transformation of the translation', () => {
  beforeEach(() => {
	// Mocking Amazon Translate
    const mockTranslateText = jest.fn().mockReturnValue("string");
    Translate.mockImplementation(() => ({
      translateText: mockTranslateText
    }));
  });
  
  test('Testing mock', () => {
    
  	var expected = "String";
  	core.sendTranslation(translations.tempRequest).then(function(actual){
  		expect(expected).toBe(actual);
  	});
  });
  
  test('Test parsing the translation', () => {
  	core.parseTranslation(singleEsTranslation);
  	var expected = singleEnTranslation;
  	var actual = translations;
	expect(expected).toMatchObject(actual);
  });

});