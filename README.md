'use strict';
 var batch = require('./index');
 var inputDir ="./test/toclean/";
 var outputDir="./test/output/";
 
 var opts = {
    doctype: 'html5',
    hideComments: true, //  multi word options can use a hyphen or "camel case"
    indent: true,
    "word-2000":truegit 
};
 
batch.clean(inputDir, outputDir, opts, function(num, bytes, array){
    console.log(num);
    console.log(bytes);
    console.log(array);
});
