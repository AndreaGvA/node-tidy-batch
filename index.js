'use strict';
var fs = require('fs');
var tidy = require('htmltidy').tidy;
var util = require('util'),
    EventEmitter = require('events').EventEmitter;

var tidyBatch=Object.create(null);

	tidyBatch.clean=function(inputDir, outputDir, opts, callback){
	    EventEmitter.call(this);
        var self=this;
	    fs.readdir(inputDir, function( errors, files ) {
	        
	        if ( errors ) {
	            console.log("errors listing file contents.");
	        } else {
	            var totalBytes = 0;
				var length=files.length;
				var created=0;
				var result=[];
	            // This function repeatedly calls itself until the files are all read.
	            var readFiles = function(index) {
	            	
	                if ( index != files.length ) {
	                    fs.readFile( inputDir+files[index], 'utf-8', function( errors, data ) {
	                        if ( errors ) {
	                            console.log( "errors reading file. ", errors );
	                        } else {
	                            tidyBatch.tidy(data, opts, inputDir, outputDir, files, index, files.length, totalBytes, created, result, callback);
	                            created++;
	                            self.emit("progress", created, files.length, outputDir+files[index]);
	                            totalBytes += data.length;
	                            readFiles(index + 1);
	                        }
	                    });
	                }
	
	            };
	
	            readFiles(0);
	        }
	    });
	};
	tidyBatch.tidy= function(data, opts, inputDir, outputDir, files, index, length, totalBytes, created, result, callback) {
	    
	    
	    tidy(data, opts, function(err, html) {
          if (err) throw err;
              if(html=="") {
                  //console.log("html vuoto file: "+inputDir+files[index]);
                  tidyBatch.tidy(data, opts, inputDir, outputDir, files, index, length, totalBytes, created, result, callback);
              } else {
                  fs.writeFile(outputDir+files[index], html, function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    
                    result[created]=outputDir+files[index];
                    if(created==length-1) {
                        if(!!callback) callback(files.length, totalBytes, result);
                        //console.log( "Done reading files. totalBytes = " + totalBytes );
                    }
                  }); 
              }
              
            
        });
	};
	
util.inherits(tidyBatch.clean, EventEmitter);

module.exports = tidyBatch;