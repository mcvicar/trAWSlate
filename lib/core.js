const AWS = require('aws-sdk');
AWS.config.update({region:'eu-west-1'});
const translate = new AWS.Translate();

module.exports = {
  tempRequest: {
	 "SourceLanguageCode": "string",
	 "TargetLanguageCode": "string",
	 "Text": "string"
  },
  
  getSourceTranslation(translations){
	const sourceLang = Object.keys(translations)[0];
	console.log(sourceLang + " is the source for this translation");
	this.tempRequest["SourceLanguageCode"] = sourceLang;
	return translations[Object.keys(translations)[0]];
  },

  async parseTranslation(sourceTranslation) {
	var allTranslations = Array();
	if(!translations[this.tempRequest.TargetLanguageCode]) {
		translations[this.tempRequest.TargetLanguageCode] = {};
	}
	let TargetLanguageCode = this.tempRequest.TargetLanguageCode;
	for (const translationObject in sourceTranslation) {
	  if(typeof sourceTranslation[translationObject] != "object") {
		  this.tempRequest.Text = sourceTranslation[translationObject];
		  allTranslations.push(this.createTranslation(this.tempRequest, TargetLanguageCode, translationObject));
	  } else {
		if(!translations[this.tempRequest.TargetLanguageCode][translationObject]) {
			translations[this.tempRequest.TargetLanguageCode][translationObject] = {};
		}
		for (const subtranslationObject in sourceTranslation[translationObject]) {
		  this.tempRequest.Text = sourceTranslation[translationObject][subtranslationObject];
		  allTranslations.push(this.createTranslation(this.tempRequest, TargetLanguageCode, translationObject, subtranslationObject));
		}
	  }
	}
	return Promise.all(allTranslations).then(function() {
		resolve();
	}).catch(function (err) {
        console.log(err);
	});
  },
  
  async createTranslation(tempRequest, TargetLanguageCode, translationKey, subtranslationKey) {
    var that = this;
  	return new Promise(function (resolve, reject) {
      that.sendTranslation(tempRequest).then(function(translation) { 
	    if(subtranslationKey) {
		  translations[TargetLanguageCode][translationKey][subtranslationKey] = translation;
	    } else {
		  translations[TargetLanguageCode][translationKey] = translation;
	    }
	    resolve();
      }).catch(function (err) {
        console.log(err);
	  });
  	});
  },

  async sendTranslation(tempRequest) {
    return new Promise((resolve, reject) => {
      translate.translateText(tempRequest, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.TranslatedText);
        }
      });
    });
  }
};