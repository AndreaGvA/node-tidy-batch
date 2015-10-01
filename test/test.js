'use strict';
var should = require('chai').should(),
batch = require('../index.js'),
fs=require('fs');


describe("tidy-batch", function() {
  describe(".clean()", function() {
     it("should convert all the files in the directory", function(done){
          	var inputDir ="./test/toclean/",
			outputDir="./test/output/",
			control="";

			var opts = {
			    doctype: 'html5',
			    hideComments: true, //  multi word options can use a hyphen or "camel case"
			    indent: true,
			    "word-2000":true
			};
			
			batch.clean(inputDir, outputDir, opts, function(check, bytes, array){
				fs.readdir(outputDir, function( error, files ) {
					
					control=files.length;
					control.should.equal(check+1);
					done();
				});
			});
			
      });
      
      it("should return an array with the same length of the files computed", function(done){
            var inputDir ="./test/toclean/",
            outputDir="./test/output/",
            control="";

            var opts = {
                doctype: 'html5',
                hideComments: true, //  multi word options can use a hyphen or "camel case"
                indent: true,
                "word-2000":true
            };
            
            batch.clean(inputDir, outputDir, opts, function(check, bytes, array){
                fs.readdir(outputDir, function( error, files ) {
                    
                    array.should.be.an("array");
                    array.should.have.length(check);
                    done();
                });
            });
            
      });
      
     
      
   });
});
