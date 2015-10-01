'use strict';
var fs = require('fs');
var tidy = require('htmltidy').tidy;

var self=module.exports = {
	clean: function(inputDir, outputDir, opts, callback){
	    
		fs.readdir(inputDir, function( error, files ) {
	        if ( error ) {
	            console.log("Error listing file contents.");
	        } else {
	            var totalBytes = 0;
				var length=files.length;
				var created=0;
				var result=[];
	            // This function repeatedly calls itself until the files are all read.
	            var readFiles = function(index) {
	            	
	                if ( index != files.length ) {
	                    fs.readFile( inputDir+files[index], 'utf-8', function( error, data ) {
	                        if ( error ) {
	                            console.log( "Error reading file. ", error );
	                        } else {
	                            self.tidy(data, opts, inputDir, outputDir, files, index, files.length, totalBytes, created, result, callback);
	                            created++;
	                            totalBytes += data.length;
	                            readFiles(index + 1);
	                        }
	                    });
	                }
	
	            };
	
	            readFiles(0);
	        }
	    });
	},
	tidy: function(data, opts, inputDir, outputDir, files, index, length, totalBytes, created, result, callback) {
	    
	    
	    tidy(data, opts, function(err, html) {
          if (err) throw err;
              if(html=="") {
                  //console.log("html vuoto file: "+inputDir+files[index]);
                  self.tidy(data, opts, inputDir, outputDir, files, index, length, totalBytes, created, result, callback);
              } else {
                  fs.writeFile(outputDir+files[index], html, function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    result[created]=outputDir+files[index];
                    if(created==length-1) {
                        if(!!callback) callback(files.length, totalBytes, result);
                        console.log( "Done reading files. totalBytes = " + totalBytes );
                    }
                  }); 
              }
              
            
        });
	}
    
};