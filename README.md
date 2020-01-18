# trAWSlate
Want to use Amazon Translate, but used your own "proprietary" json format for your translations and now have to convert everything into AWS's proprietary format?

This is a very simple command line tool that takes my translation file, and the destination language, parses it, fires each it at Amazon Translate and updates my translation document with the result.

Basically I've a translation file that looks like this...
```
{
  "en": {
    "translation-key-1": "Some text",
    "translation-key-2": "Some more text",
    "translation-key-3": "Even more text"
  },
  "es": {
    "translation-key-1": "Algún texto",
    "translation-key-2": "Un poco más de texto",
    "translation-key-3": "Aún más texto"
  }
}
```

Amazon Translate requires this...
```
{
   "SourceLanguageCode": "en",
   "TargetLanguageCode": "es",
   "TerminologyNames": [ "if-you-have-one" ],
   "Text": "Some text"
}
```
### Installing

Clone the repo and run

```
npm i
```

### Running the command
```
node index.js example/translation.json es
```

### Prerequisites
You'll need an AWS account, an IAM role that can use Amazon Translate and node.
Obviously you'll need a translation file in the json format above.

## A couple of assumptions
* I've found I need my AWS details in exports for node to run successfully (e.g. export AWS_ACCESS_KEY_ID=XXXX, export AWS_SECRET_ACCESS_KEY=YYYY, AWS_DEFAULT_REGION=eu-west-1)
* The first language you have in the translation file is the source language
* You want to have the same translation file for all languages
* This only supports the languages supported by [Amazon Translate](https://docs.aws.amazon.com/translate/latest/dg/what-is.html) - both source and target
* No it doesn't support XLIFF, or any other translation file type
* We only scan a single child deep into the JSON
* No it doesn't support for batching to/from S3

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) so you understand the process for submitting pull requests to me.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details