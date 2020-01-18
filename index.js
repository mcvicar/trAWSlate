const core = require("./lib/core.js");

var fs = require('fs');
// write response back to the translation file
var cliArgs = process.argv.slice(2);
const translationFile = cliArgs[0];
const targetLang = cliArgs[1];

console.log("Going to convert "+ translationFile +" into "+ targetLang);
core.tempRequest.TargetLanguageCode = targetLang;

fs.readFile(translationFile, (err, data) => {
  if (err) throw err;
  translations = JSON.parse(data);
  const sourceTranslations = core.getSourceTranslation(translations);
  core.parseTranslation(sourceTranslations).then(function(){
    console.log("Done the translations - updating the file "+ translationFile);
    
	let strTranslations = JSON.stringify(translations, null, 2);

	fs.writeFile(translationFile, strTranslations, (err) => {
		if (err) throw err;
		console.log('Translations updated');
	});
  });
});