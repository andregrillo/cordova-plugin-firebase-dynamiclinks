var path = require("path");
var fs = require("fs");
var utils = require("./utils");
module.exports = function(context) {
    return new Promise(function(resolve, reject) {
        var wwwpath = utils.getWwwPath(context);
        var configPath = path.join(wwwpath, "google-services");
        //Checks if the configuration files exist in the folder to be deleted
        var configFile = path.join(configPath, "GoogleService-Info.plist");
        try {
	      if (fs.existsSync(configFile)) {
	      	var zipFile = path.join(configPath, "google-services.zip");
	      	console.log("Cleaning up ", zipFile);
	      	fs.unlinkSync(zipFile)
	      } else {
	      	console.log("Cleaning up ", configPath);
	      	utils.rmNonEmptyDir(configPath);
	      }
	    } catch(err) {
	      console.error(err)
	    }
        /*utils.rmNonEmptyDir(configPath);*/
        return resolve();
    });
};
