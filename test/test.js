'use strict';
var chai = require('chai'),
should=chai.should(),
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
      
      it("should return files with more than 0 bytes", function(done){
          var inputDir ="./test/toclean/",
            outputDir="./test/output/",
            control="",
            $len=0;
            
            fs.readdir(outputDir, function( error, files ) {
                var readFiles = function(index) {
                    
                    if ( index != files.length ) {
                        fs.readFile( outputDir+files[index], 'utf-8', function( error, data ) {
                            if ( error ) {
                                console.log( "Error reading file. ", error );
                            } else {
                                data.length.should.not.equal(0);
                                $len++;
                                if($len==files.length){
                                     done();
                                 }
                                 readFiles(index + 1);
                            }
                        });
                    }
    
                };
                readFiles(0);
            });
      });
   });
});
