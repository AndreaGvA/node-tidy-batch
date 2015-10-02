#tidy-batch
___
###A node module to batch clean html with node htmltidy

####Install:
```
npm install tidy-batch
```

####Usage:

```
'use strict';
 var batch = require('tidy-batch');
 var inputDir ="./test/toclean/";
 var outputDir="./test/output/";
 
 var opts = {
    doctype: 'html5',
    hideComments: true, //  multi word options can use a hyphen or "camel case"
    indent: true,
    "word-2000":true 
};
 
var clean= new batch.clean(inputDir, outputDir, opts, function(num, bytes, array){
    console.log(num);
    console.log(bytes);
    console.log(array);
});

//You can monitor the progress with
clean.on("progress", function(num, tot){
	console.log(num);
	console.log(tot);
});

```

####Options
You can pass all the options provided by [htmltidy](http://tidy.sourceforge.net/docs/quickref.html )

```
var opts = {
    doctype: 'html5',
    hideComments: true, //  multi word options can use a hyphen or "camel case"
    indent: true,
    "word-2000":truegit 
};
```
