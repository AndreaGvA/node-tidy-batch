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
			
			var emit = new batch.clean(inputDir, outputDir, opts, function(check, bytes, array){
				fs.readdir(outputDir, function( error, files ) {
					
					control=files.length-1;
					control.should.equal(check);
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
            
            var emit = new batch.clean(inputDir, outputDir, opts, function(check, bytes, array){
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
       it("should return the progress from n to tot", function(done){
            var inputDir ="./test/toclean/",
            outputDir="./test/output/",
            control="";

            var opts = {
                doctype: 'html5',
                hideComments: true, //  multi word options can use a hyphen or "camel case"
                indent: true,
                "word-2000":true
            };
            
            var clean = new batch.clean(inputDir, outputDir, opts);
            var check=false;
            var tt=0;
            clean.on("progress", function(n, tot, file){
                if(n<=tot) {
                    check=true;
                } else {
                    check=false;
                }
                tt++;
                //n.should.be.most(tot);
                //console.log(n+" di "+tot);
                if(n===tot) {
                    check.should.be.true;
                    tt.should.equal(99);
                    done();
                }
            });
       });
   });
});
