/**
 * 
 */

function PropertyValue (value, type){
	this.value = value;
	this.type = type;
}

class Config {
	constructor (jsonObject) {
		if (jsonObject.apiKey !== undefined)
			this.apiKey = jsonObject.apiKey;

		if (jsonObject.application !== undefined)
			this.application = jsonObject.application;

		if (jsonObject.projectBranch !== undefined)
			this.projectBranch = jsonObject.projectBranch;

		if (jsonObject.lookupHierarchy !== undefined) {
			var temp = null;
			if (jsonObject.lookupHierarchy.map !== undefined)
				temp = jsonObject.lookupHierarchy.map;
			else
				temp = jsonObject.lookupHierarchy;
			this.lookup = {};
			for (var key in temp) {
				this.lookup[key] = temp[key];
			}
		}
	}	
}

class Collection {
	constructor (name2, desc2, tags2, createdDate2, lastUpdatedBy2, lastUpdatedOn2) {
		this.name = name2;
		this.desc = desc2;
		
		if (tags2 !== undefined)
			this.tags = tags2;
		else
			this.tags = "";
		
		if (createdDate2 !== undefined)
			this.createdDate = createdDate2;
		else
			this.createdDate = "";
		if (lastUpdatedBy2 !== undefined)
			this.lastUpdatedBy = lastUpdatedBy2;
		else
			this.lastUpdatedBy = "";
		
		if (lastUpdatedOn2 !== undefined)
			this.lastUpdatedOn = lastUpdatedOn2;
		else
			this.lastUpdatedOn = "";
	}
/*
	get lastUpdatedBy() {
		return this.lastUpdatedBy;
	}

	set lastUpdatedBy(lastUpdatedBy2) {
		this.lastUpdatedBy = lastUpdatedBy2;
	}

	get lastUpdatedOn() {
		return this.lastUpdatedOn;
	}

	set lastUpdatedOn(lastUpdatedOn) {
		this.lastUpdatedOn = lastUpdatedOn;
	}

	get createdDate() {
		return this.createdDate;
	}

	set createdDate(createdDate) {
		this.createdDate = createdDate;
	}

	get name() {
		return this.name;
	}

	set name(name) {
		this.name = name;
	}

	get desc() {
		return this.desc;
	}

	set desc(desc) {
		this.desc = desc;
	}

	get tags() {
		return this.tags;
	}

	set tags(tags) {
		this.tags = tags;
	}
*/}

class Application extends Collection {

	/*constructor (name, desc, tags) {
		super(name, desc, tags);
	}*/

	constructor(name, desc, tags, createdDate, lastUpdatedBy, lastUpdatedOn) {
		var t = "", cd = "", lub = "", luo = "";
		if (tags !== undefined) {
			t = tags;
		}
		if (createdDate != undefined) {
			cd = createdDate;
		}
		if (lastUpdatedBy !== undefined) {
			lub = lastUpdatedBy;
		}
		if (lastUpdatedOn !== undefined) {
			luo = lastUpdatedOn
		}
		super(name, desc, t, cd, lub, luo);
	}

}

class ProjectBranch extends Collection {

	constructor (name, desc, tags, enabled, createdDate, lastUpdatedBy, lastUpdatedOn) {
		
		var t = "", e = "true", cd = "", lub = "", luo = "";
		if (tags !== undefined) {
			t = tags;
		}
		if (enabled !== undefined) {
			e = enabled;
		}
		if (createdDate != undefined) {
			cd = createdDate;
		}
		if (lastUpdatedBy !== undefined) {
			lub = lastUpdatedBy;
		}
		if (lastUpdatedOn !== undefined) {
			luo = lastUpdatedOn
		}
		super(name, desc, t, cd, lub, luo);
		this.enabled = e;
	}

/*	get enabled() {
		return this.enabled;
	}

	set enabled(enabled) {
		this.enabled = enabled;
	}
*/}

class Lookup extends Collection {

	constructor(name, desc, values, order, tags, createdDate, lastUpdatedBy, lastUpdatedOn) {
		
		var t = "", cd = "", lub = "", luo = "";
		
		if (tags !== undefined) {
			t = tags;
		}
		if (createdDate != undefined) {
			cd = createdDate;
		}
		if (lastUpdatedBy !== undefined) {
			lub = lastUpdatedBy;
		}
		if (lastUpdatedOn !== undefined) {
			luo = lastUpdatedOn
		}	
		super(name, desc, t, cd, lub, luo);
		
		this.order = order;
		this.values = values.split(",");
	}

/*	get order() {
		return this.order;
	}

	set order(order) {
		this.order = order;
	}

	get values() {
		return this.values;
	}

	set values(values) {
		this.values = values;
	}
*/}

class Property extends Collection {

	constructor (name, desc, type, defaultValue, tags, availability, createdDate, lastUpdatedBy, lastUpdatedOn) {
		
		var t = "", cd = "", lub = "", luo = "";
		
		if (tags !== undefined) {
			t = tags;
		}
		if (createdDate != undefined) {
			cd = createdDate;
		}
		if (lastUpdatedBy !== undefined) {
			lub = lastUpdatedBy;
		}
		if (lastUpdatedOn !== undefined) {
			luo = lastUpdatedOn
		}	
		super(name, desc, t, cd, lub, luo);
		
		this.availability = (availability === undefined ? "ALL" : availability);
		this.type = type;
		this.defaultValue = (defaultValue === undefined ? null : defaultValue);
	}
	
/*	get availability() {
		return this.availability;
	}
	
	get type() {
		return this.type;
	}
	
	get defaultValue() {
		return this.defaultValue;
	}
	
	set availability(availability) {
		this.availability = availability;
	}
	
	set type(type) {
		this.type = type;
	}
	
	set defaultValue(defaultValue) {
		this.defaultValue = defaultValue;
	}
*/}

class PropertyEntry {

	constructor (name2, value2, keyFilter2, lastUpdatedBy2, lastUpdatedOn2) {
		this.name = name2;
		this.value = value2;
		this.lastUpdatedBy = lastUpdatedBy2;
		this.lastUpdatedOn = lastUpdatedOn2
		var filter = keyFilter2.split("/");
		this.keyFilter = {};
		for (var i = 0; i < filter.length; i++) {
			if (filter[i] != "") {
				var f = filter[i].split("=");
				this.keyFilter[f[0]] = f[1];
			}
		}
	}
}
var BeyondProps = {
	"STRING" : "1",
	"NUMBER": "2",
	"BOOLEAN" : "3",
	"DATE" : "4",
	"REGEX" : "5",
	"MAP" : "6"
}

class BeyondPropsClient {
	
	constructor (apiKey) {
		this.apiKey = apiKey;
		this.config = new Config({"apiKey" : apiKey});
		this.mode = "prod";
		
		this.dataTypes = {
			"1": "STRING",
			"2": "NUMBER",
			"3": "BOOLEAN",
			"4": "DATE",
			"5": "REGEX",
			"6": "MAP"
		};
	
	}

	getDataTypeName (type) {
		return this.dataTypes[type];
	}
	
	switchApplication (appName) {
		var conf = { "application" : appName };
		this.switchConfig(new Config(conf));
	}
	
	switchBranch (branchName) {
		var conf = { "application" : this.config.application, "projectBranch" : branchName };
		this.switchConfig(new Config(conf));
	}
	
	switchConfig (config) {
		var apiKey = this.config.apiKey;
		
		if (config instanceof Config) {
			this.config = config;
			if (this.config.apiKey !== undefined || this.config.apiKey !== null || this.config.apiKey !== "") {
				this.config.apiKey = apiKey;
			}
			return this.connect();
		}
	}
	
	clearProperties() {
		this.properties = {};
	}
	
	setProperty(propName, val, configKey) {
		if (this.properties === undefined || this.properties == null) {
			this.properties = {};
		}
		
		var key = "";
		var obj = {};
		if (configKey === undefined || configKey == null) {
			key = propName;
			obj = {
				"propertyName" : propName,
				"value" : val
			};
		} else {
			key = configKey + (configKey.slice(configKey.length - 1) == "/" ? "" : ("/" + propName));
			obj = {
				"propertyName" : propName,
				"value" : val,
				"configKey" : configKey
			};
		}
		
		this.properties[key] = obj; //this will add/replace the values
	}
	
	getPropertyValue (property) {
		if (property == null || property.trim() == "") {
			throw "Property Name can't be empty";
		}
		
		var properties = [];
		properties.push(property);
		return this.getPropertyValues(properties)[property];
	}
	
	getPropertyValues (properties) {
		if (properties == null || properties.length == 0) {
			throw "Properties can't be empty";
		}
		
		var req = {};

		if (this.authToken === undefined || this.authToken == null) {
			console.error("Beyondprops authentication token missing, please reconnect");
			return null;
		}
		
		if (this.authTokenExpirationTime.getTime() < new Date().getTime()) {
			console.error("Beyondprops authentication token expired, please reconnect");
			return null;
		}

		req.authToken = this.authToken;
		
		try {
			var self=this;
			self.retValue = {};
			//let's check the local property cache first
			for (var property in properties) {
				if (this.propertyCache[property] !== undefined) {
					self.retValue[property] = this.propertyCache[property];
				} else {
					req.properties.push(property);
				}
			}
			
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this.getPropertyEndPoint, false);

			//Send the proper header information along with the request
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("accept", "application/json");
			
			xhr.onload = function() {
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
					var response = JSON.parse(this.responseText);

					// Request finished. Do processing here.
					if (response.statusCode == 0) {
						/*sample:
						 	current.promotype: {
								map: {
									type: 1
									val: "ABC123"
								}
							}
						 */
						var obj = response["data"][0]["map"];
						for (var p in obj) {
						    if (obj.hasOwnProperty(p)) {
						       self.retValue[p] = obj[p]["map"];
						       self.propertyCache[p] = obj[p]["map"];
						    }
						}
					} else {
						console.log(response.errors);
						self.retValue = null;
					}			    	
				}				
			}
			xhr.onerror = function() {
				self.retValue = null;
			}
			xhr.send(JSON.stringify(req));
			return this.retValue;
		} catch (e) {
			console.log(e);
			return null;
		}
	}
	
	updateAllProperties () {
		
		if (this.properties == null || JSON.stringify(this.properties) == "[]") {
			throw "No properties are set";
		}

		var req = {};
		
		req["authToken"] =  this.authToken;
		req["data"] = [];
		
		for (key in this.properties) {
			req["data"].push(this.properties[key]);
		}
		
		try {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this.setPropertyEndPoint, false);

			//Send the proper header information along with the request
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("accept", "application/json");
			var self = this;
			self.result = null;
			xhr.onreadystatechange = function() { // Call a function when the state changes.
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

					var response = JSON.parse(this.responseText);

					// Request finished. Do processing here.
					if (response.statusCode == 0) {
						self.result = "success";
					} else {
						console.log(response.errors);
						self.result = null;
					}			    	
				}
			}
			xhr.onerror = function() {
				return null;
			}
			xhr.send(JSON.stringify(req));
			return this.result;
		} catch (e) {
			console.log(e);
			return null;
		}
	}
	
	set mode (mode) {
		this._mode = mode;
	}

	get mode () {
		return this._mode;
	}

	addCollection(collObj) {
		if (collObj instanceof Application) {
			return this.addApplication(collObj);
		} else if (collObj instanceof ProjectBranch) {
			return this.addProjectBranch(collObj);
		} else if (collObj instanceof Lookup) {
			return this.addLookup(collObj);
		} else if (collObj instanceof Property) {
			return this.addProperty(collObj);
		}
	}

	updateCollection(collObj) {
		if (collObj instanceof Application) {
			return this.updateApplication(collObj);
		} else if (collObj instanceof ProjectBranch) {
			return this.updateProjectBranch(collObj);
		} else if (collObj instanceof Lookup) {
			return this.updateLookup(collObj);
		} else if (collObj instanceof Property) {
			return this.updateProperty(collObj);
		}
	}

	deleteCollection(collObj) {
		if (collObj instanceof Application) {
			return this.deleteApplication(collObj);
		} else if (collObj instanceof ProjectBranch) {
			return this.deleteProjectBranch(collObj);
		} else if (collObj instanceof Lookup) {
			return this.deleteLookup(collObj);
		} else if (collObj instanceof Property) {
			return this.deleteProperty(collObj);
		}
	}

	//application methods
	
	addApplication(app) {
		var apps = [];
		apps.push(app);
		return this.executeCollectionService(apps, false, false, "application");
	}

	updateApplication(app) {
		var apps = [];
		apps.push(app);
		return this.executeCollectionService(apps, true, false, "application");
	}

	deleteApplication (app) {
		var apps = [];
		apps.push(app);
		return this.executeCollectionService(apps, false, true, "application");		
	}

	getApplication (appName) {
		if (appName == null || appName.trim() == "") {
			throw "Application Name can't be empty";
		}
		
		var appNames = [];
		appNames.push(appName);
		return this.getApplications(appNames)[0];
	}

	getApplications (appNames) {
		if (appNames == null || appNames.length == 0) {
			throw "Application Names can't be empty";
		}
		
		var req = {};
		var data = [];

		if (this.authToken === undefined || this.authToken == null) {
			console.error("Beyondprops authentication token missing, please reconnect");
			return null;
		}
		
		if (this.authTokenExpirationTime.getTime() < new Date().getTime()) {
			console.error("Beyondprops authentication token expired, please reconnect");
			return null;
		}

		req.collection  = "application";
		req.authToken = this.authToken;

		for (var i = 0; i < appNames.length; i++) {
			data.push({"name" : appNames[i]});
		}

		req.data = data;

		var retValue = [];

		try {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this.collectionEndPoint, false);

			//Send the proper header information along with the request
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("accept", "application/json");
			var self = this;

			xhr.onreadystatechange = function() { // Call a function when the state changes.
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

					var response = JSON.parse(this.responseText);
					self.retValue = [];
					// Request finished. Do processing here.
					if (response.statusCode == 0) {

						var dataArr = response["data"];
						for (var j = 0; j < dataArr.length; j++) {
							var appObj = dataArr[j]["map"];
							self.retValue.push(new Application(
									appObj["name"], 
									appObj["desc"], 
									appObj["tags"], 
									appObj["createdDate"], 
									appObj["lastUpdatedBy"] !== undefined ? appObj["lastUpdatedBy"] : "", 
									appObj["lastUpdatedOn"] !== undefined ? appObj["lastUpdatedOn"] : ""
										));
						}

					} else {
						console.log(response.errors);
						self.retValue = null;
					}			    	
				}
			}
			xhr.onerror = function() {
				self.retValue = null;
			}
			xhr.send(JSON.stringify(req));
			return this.retValue;
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	listApplications () {
		var req = {};
		var data = [];
		

		if (this.authToken === undefined || this.authToken == null) {
			console.error("Beyondprops authentication token missing, please reconnect");
			return null;
		}
		
		if (this.authTokenExpirationTime.getTime() < new Date().getTime()) {
			console.error("Beyondprops authentication token expired, please reconnect");
			return null;
		}

		req.collection  = "application";
		req.authToken = this.authToken;

		var retValue = [];

		try {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this.collectionEndPoint, false);

			//Send the proper header information along with the request
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("accept", "application/json");
			var self = this;
			self.retValue = [];
			xhr.onreadystatechange = function() { // Call a function when the state changes.
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

					var response = JSON.parse(this.responseText);
					// Request finished. Do processing here.
					if (response.statusCode == 0) {

						var dataArr = response["data"];
						for (var j = 0; j < dataArr.length; j++) {
							var appObj = dataArr[j]["map"];
							self.retValue.push(new Application(appObj["name"], appObj["desc"], appObj["tags"], appObj["createdDate"], appObj["lastUpdatedBy"] !== undefined ? appObj["lastUpdatedBy"] : "", appObj["lastUpdatedOn"] !== undefined ? appObj["lastUpdatedOn"] : ""));
						}
					} else {
						console.log(response.errors);
						self.retValue = null;
					}			    	
				}
			}
			xhr.onerror = function() {
				self.retValue = null;
			}
			xhr.send(JSON.stringify(req));
			console.log(xhr.readyState); //dummy statement
			return this.retValue;
		} catch (e) {
			console.log(e);
			return null;
		}
	}
	
	//project branch methods
	
	addProjectBranch(branch) {
		var branches = [];
		branches.push(branch);
		return this.executeCollectionService(branches, false, false, "projectBranch");
	}

	updateProjectBranch(branch) {
		var branches = [];
		branches.push(branch);
		return this.executeCollectionService(branches, true, false, "projectBranch");	
	}

	deleteProjectBranch(branch) {
		var branches = [];
		branches.push(branch);
		return this.executeCollectionService(branches, false, true, "projectBranch");	
	}

	getProjectBranch (branchName) {
		if (branchName == null || branchName == "") {
			throw "Branch Name can't be empty";
		}
		var branchNames = [];
		branchNames.push(branchName);
		return this.getProjectBranches(branchNames)[0];
	}

	getProjectBranches (branchNames) {
		if (branchNames == null || branchNames.length == 0) {
			throw "Branch Names can't be empty";
		}
		var req = {};
		var data = [];

		if (this.authToken === undefined || this.authToken == null) {
			console.error("Beyondprops authentication token missing, please reconnect");
			return null;
		}
		
		if (this.authTokenExpirationTime.getTime() < new Date().getTime()) {
			console.error("Beyondprops authentication token expired, please reconnect");
			return null;
		}

		req.collection  = "projectBranch";
		req.authToken = this.authToken;

		for (var i = 0; i < branchNames.length; i++) {
			data.push({"name" : branchNames[i]});
		}

		req.data = data;

		var retValue = [];

		try {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this.collectionEndPoint, false);

			//Send the proper header information along with the request
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("accept", "application/json");
			var self = this;
			self.retValue = [];
			xhr.onreadystatechange = function() { // Call a function when the state changes.
				//if (this.readyState === XMLHttpRequest.DONE && 
				if(this.status === 200) {
					var response = JSON.parse(this.responseText);

					// Request finished. Do processing here.
					if (response.statusCode == 0) {
						
						var dataArr = response["data"];
						for (var j = 0; j < dataArr.length; j++) {
							var branchObj = dataArr[j]["map"];
							self.retValue.push(new ProjectBranch(
									branchObj["name"], 
									branchObj["desc"], 
									branchObj["tags"], 
									branchObj["enabled"],
									branchObj["createdDate"], 
									branchObj["lastUpdatedBy"] !== undefined ? branchObj["lastUpdatedBy"] : "", 
									branchObj["lastUpdatedOn"] !== undefined ? branchObj["lastUpdatedOn"] : ""
									));
						}
					} else {
						console.log(response.errors);
						self.retValue = null;
					}			    	
				}
			}
			xhr.onerror = function() {
				self.retValue = null;
			}
			xhr.send(JSON.stringify(req));
			return this.retValue;
			
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	get authenticationToken() {
		return this.authToken;
	}
	
	listProjectBranches () {
		var req = {};
		var data = [];

		if (this.authToken === undefined || this.authToken == null) {
			console.error("Beyondprops authentication token missing, please reconnect");
			return null;
		}
		
		if (this.authTokenExpirationTime.getTime() < new Date().getTime()) {
			console.error("Beyondprops authentication token expired, please reconnect");
			return null;
		}

		req.collection  = "projectBranch";
		req.authToken = this.authToken;

		var retValue = [];

		try {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this.collectionEndPoint, false);

			//Send the proper header information along with the request
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("accept", "application/json");
			var self = this;
			self.retValue = [];
			xhr.onreadystatechange = function() { // Call a function when the state changes.
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

					var response = JSON.parse(this.responseText);

					// Request finished. Do processing here.
					if (response.statusCode == 0) {

						var dataArr = response["data"];
						if (dataArr !== undefined && dataArr != null) {
							for (var j = 0; j < dataArr.length; j++) {
								var branchObj = dataArr[j]["map"];
								self.retValue.push(new ProjectBranch(
										branchObj["name"], 
										branchObj["desc"], 
										branchObj["tags"], 
										branchObj["enabled"],
										branchObj["createdDate"], 
										branchObj["lastUpdatedBy"] !== undefined ? branchObj["lastUpdatedBy"] : "", 
										branchObj["lastUpdatedOn"] !== undefined ? branchObj["lastUpdatedOn"] : "")
										);
							}
						} else {
							self.retValue = null;
						}
					} else {
						console.log(response.errors);
						self.retValue = null;
					}			    	
				}
			}
			xhr.onerror = function() {
				self.retValue = null;
			}
			xhr.send(JSON.stringify(req));
			return this.retValue;
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	//lookup hierarchy methods
	
	addLookup(lookup) {
		var lookups = [];
		lookups.push(lookup);
		return this.executeCollectionService(lookups, false, false, "config");
	}

	updateLookup(lookup) {
		var lookups = [];
		lookups.push(lookup);
		return this.executeCollectionService(lookups, true, false, "config");
	}

	deleteLookup(lookup) {
		var lookups = [];
		lookups.push(lookup);
		return this.executeCollectionService(lookups, false, true, "config");
	}

	getLookup(lookupName) {
		if (lookupName == null || lookupName == "") {
			throw "Lookup Name can't be empty";
		}
		var lookupNames = [];
		lookupNames.push(lookupName);
		return this.getLookups(lookupNames)[0];
	}

	getLookups(lookupNames) {
		if (lookupNames == null || lookupNames.length == 0) {
			throw "Lookup Names can't be empty";
		}
		var req = {};
		var data = [];

		if (this.authToken === undefined || this.authToken == null) {
			console.error("Beyondprops authentication token missing, please reconnect");
			return null;
		}
		
		if (this.authTokenExpirationTime.getTime() < new Date().getTime()) {
			console.error("Beyondprops authentication token expired, please reconnect");
			return null;
		}

		req.collection  = "config";
		req.authToken = this.authToken;

		for (var i = 0; i < lookupNames.length; i++) {
			data.push({"name" : lookupNames[i]});
		}

		req.data = data;

		var retValue = [];

		try {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this.collectionEndPoint, false);

			//Send the proper header information along with the request
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("accept", "application/json");
			var self = this;
			self.retValue = [];
			xhr.onreadystatechange = function() { // Call a function when the state changes.
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
					var response = JSON.parse(this.responseText);

					// Request finished. Do processing here.
					if (response.statusCode == 0) {

						var dataArr = response["data"];
						for (var j = 0; j < dataArr.length; j++) {
							var lookupObj = dataArr[j]["map"];
							self.retValue.push(new Lookup(
									lookupObj["name"], 
									lookupObj["desc"], 
									lookupObj["tags"], 
									lookupObj["order"],
									lookupObj["values"],
									lookupObj["createdDate"], 
									lookupObj["lastUpdatedBy"] !== undefined ? lookupObj["lastUpdatedBy"] : "", 
									lookupObj["lastUpdatedOn"] !== undefined ? lookupObj["lastUpdatedOn"] : "" 
									));
						}
					} else {
						console.log(response.errors);
						self.retValue = null;
					}			    	
				}
			}
			
			xhr.onerror = function() {
				self.retValue = null;
			}
			
			xhr.send(JSON.stringify(req));
			return this.retValue;
			
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	listLookups () {
		var req = {};
		var data = [];

		if (this.authToken === undefined || this.authToken == null) {
			console.error("Beyondprops authentication token missing, please reconnect");
			return null;
		}
		
		if (this.authTokenExpirationTime.getTime() < new Date().getTime()) {
			console.error("Beyondprops authentication token expired, please reconnect");
			return null;
		}

		req.collection  = "config";
		req.authToken = this.authToken;

		var retValue = [];

		try {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this.collectionEndPoint, false);

			//Send the proper header information along with the request
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("accept", "application/json");
			var self = this;
			self.retValue = [];
			xhr.onreadystatechange = function() { // Call a function when the state changes.
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
					var response = JSON.parse(this.responseText);

					// Request finished. Do processing here.
					if (response.statusCode == 0) {

						var dataArr = response["data"];
						if (dataArr !== undefined && dataArr != null) {
							for (var j = 0; j < dataArr.length; j++) {
								var lookupObj = dataArr[j]["map"];
								self.retValue.push(new Lookup(
										lookupObj["name"], 
										lookupObj["desc"], 
										lookupObj["tags"], 
										lookupObj["order"],
										lookupObj["values"],
										lookupObj["createdDate"], 
										lookupObj["lastUpdatedBy"] !== undefined ? lookupObj["lastUpdatedBy"] : "", 
										lookupObj["lastUpdatedOn"] !== undefined ? lookupObj["lastUpdatedOn"] : ""
										));
							}
						} else {
							self.retValue = null;
						}

					} else {
						console.log(response.errors);
						self.retValue = null;
					}			    	
				}
			}
			
			xhr.onerror = function() {
				self.retValue = null;
			}
			
			xhr.send(JSON.stringify(req));
			return this.retValue;
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	//property methods
	addProperty(property) {
		var properties = [];
		properties.push(property);
		return this.executeCollectionService(properties, false, false, "property");
	}

	updateProperty(property) {
		var properties = [];
		properties.push(property);
		return this.executeCollectionService(properties, true, false, "property");
	}

	deleteProperty(property) {
		var properties = [];
		properties.push(property);
		return this.executeCollectionService(properties, false, true, "property");
	}

	getProperty(propertyName) {
		if (propertyName == null || propertyName == "") {
			throw "Property Name can't be empty";
		}
		var propertyNames = [];
		propertyNames.push(propertyName);
		return this.getProperties(propertyNames)[0];
	}

	getStringProperty(propertyName) {
		return this.getPropertyValue(propertyName).val;
		
	}
	
	getNumberProperty(propertyName) {
		if (propertyName == null || propertyName == "") {
			throw "Property Name can't be empty";
		}
		var propVal = this.getPropertyValue(propertyName).val;
		var out = Number(propVal);
		if (isNaN(out)) {
			throw "Property value is not a number, " + propVal;
		} else {
			return out;
		}
	}
	
	getDateProperty(propertyName) {
		if (propertyName == null || propertyName == "") {
			throw "Property Name can't be empty";
		}
		var propVal = this.getPropertyValue(propertyName).val;
		var out = new Date(propVal);
		if (isNaN(out)) {
			throw "Property value is not a valid date, " + propVal;
		} else {
			return out;
		}
	}
	
	getBooleanProperty(propertyName) {
		if (propertyName == null || propertyName == "") {
			throw "Property Name can't be empty";
		}
		var propVal = this.getPropertyValue(propertyName).val;
		var out = (propVal == "YES" || propVal == "yes" || propVal == "1" || propVal == "true" || propVal == "TRUE") ? true : false;
		return out;
	}
	
	getMapProperty(propertyName) {
		if (propertyName == null || propertyName == "") {
			throw "Property Name can't be empty";
		}
		var propVal = this.getPropertyValue(propertyName).val;
		try {
			var out = {};
			var propVals = propVal.split(",");
			for (propVal1 in propVals) {
				if (propVal1 != "") {
					var temp = propVal1.split("=");
					out[temp[0]] = temp[1];
				}
			}
			return out;
		} catch (e) {
			throw "Property value is not in a valid Map format, " + propVal;
		}
	}
	
	getProperties(propertyNames) {
		if (propertyNames == null || propertyNames.length == 0) {
			throw "Property Names can't be empty";
		}
		
		var req = {};
		var data = [];

		req.collection  = "property";
		req.authToken = this.authToken;

		for (var i = 0; i < propertyNames.length; i++) {
			data.push({"name" : propertyNames[i]});
		}

		req.data = data;

		var retValue = [];

		try {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this.collectionEndPoint, false);

			//Send the proper header information along with the request
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("accept", "application/json");
			var self = this;
			self.retValue = [];
			xhr.onreadystatechange = function() { // Call a function when the state changes.
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
					var response = JSON.parse(this.responseText);

					// Request finished. Do processing here.
					if (response.statusCode == 0) {

						var dataArr = response["data"];
						for (var j = 0; j < dataArr.length; j++) {
							var propertyObj = dataArr[j]["map"];

							self.retValue.push(new Property(
									propertyObj["name"], 
									propertyObj["desc"], 
									propertyObj["tags"],
									propertyObj["availability"],
									propertyObj["type"],
									propertyObj["defaultValue"],
									propertyObj["createdDate"], 
									propertyObj["lastUpdatedBy"] !== undefined ? lookupObj["lastUpdatedBy"] : "", 
									propertyObj["lastUpdatedOn"] !== undefined ? lookupObj["lastUpdatedOn"] : "" 
									));
						}

					} else {
						console.log(response.errors);
						self.retValue = null;
					}			    	
				}
			}
			
			xhr.onerror = function() {
				self.retValue = null;
			}
			
			xhr.send(JSON.stringify(req));
			return this.retValue;
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	listProperties () {
		var req = {};
		var data = [];

		if (this.authToken === undefined || this.authToken == null) {
			console.error("Beyondprops authentication token missing, please reconnect");
			return null;
		}
		
		if (this.authTokenExpirationTime.getTime() < new Date().getTime()) {
			console.error("Beyondprops authentication token expired, please reconnect");
			return null;
		}

		req.collection  = "property";
		req.authToken = this.authToken;

		var retValue = [];

		try {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this.collectionEndPoint, false);

			//Send the proper header information along with the request
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("accept", "application/json");
			var self = this;
			self.retValue = [];
			xhr.onreadystatechange = function() { // Call a function when the state changes.
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
					var response = JSON.parse(this.responseText);

					// Request finished. Do processing here.
					if (response.statusCode == 0) {

						var dataArr = response["data"];
						for (var j = 0; j < dataArr.length; j++) {
							var propertyObj = dataArr[j]["map"];
							self.retValue.push(new Property(
									propertyObj["name"], 
									propertyObj["desc"], 
									propertyObj["tags"],
									propertyObj["availability"],
									propertyObj["type"],
									propertyObj["defaultValue"],
									propertyObj["createdDate"], 
									propertyObj["lastUpdatedBy"] !== undefined ? lookupObj["lastUpdatedBy"] : "", 
									propertyObj["lastUpdatedOn"] !== undefined ? lookupObj["lastUpdatedOn"] : ""
									));
						}
					} else {
						console.log(response.errors);
						self.retValue = null;
					}			    	
				}
			}
			
			xhr.onerror = function() {
				self.retValue = null;
			}
			
			xhr.send(JSON.stringify(req));
			return this.retValue;
			
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	//property hash	
	listPropertyEntries () {
		var req = {};
		var data = [];

		if (this.authToken === undefined || this.authToken == null) {
			console.error("Beyondprops authentication token missing, please reconnect");
			return null;
		}
		
		if (this.authTokenExpirationTime.getTime() < new Date().getTime()) {
			console.error("Beyondprops authentication token expired, please reconnect");
			return null;
		}

		req.collection  = "propertyentry";
		req.authToken = this.authToken;

		var retValue = [];

		try {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this.collectionEndPoint, false);

			//Send the proper header information along with the request
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("accept", "application/json");
			var self = this;
			self.retValue = [];
			xhr.onreadystatechange = function() { // Call a function when the state changes.
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
					var response = JSON.parse(this.responseText);

					// Request finished. Do processing here.
					if (response.statusCode == 0) {

						var dataArr = response["data"];
						for (var j = 0; j < dataArr.length; j++) {
							var propertyObj = dataArr[j]["map"];
							self.retValue.push(new PropertyEntry(
									propertyObj["name"], 
									propertyObj["value"], 
									propertyObj["keyFilter"],
									propertyObj["lastUpdatedBy"] !== undefined ? propertyObj["lastUpdatedBy"] : "", 
									propertyObj["lastUpdatedOn"] !== undefined ? propertyObj["lastUpdatedOn"] : ""
									));
						}
					} else {
						console.log(response.errors);
						self.retValue = null;
					}			    	
				}
			}
			
			xhr.onerror = function() {
				self.retValue = null;
			}
			
			xhr.send(JSON.stringify(req));
			return this.retValue;
			
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	executeCollectionService(collections, isUpdate, isDelete, collType) {
		var req = {};
		var data = [];

		if (this.authToken === undefined || this.authToken == null) {
			console.error("Beyondprops authentication token missing, please reconnect");
			return false;
		}
		
		if (this.authTokenExpirationTime.getTime() < new Date().getTime()) {
			console.error("Beyondprops authentication token expired, please reconnect");
			return false;
		}

		req.collection  = collType;
		req.data = collections;
		req.authToken = this.authToken;

		if (isUpdate) {
			req.operation = "update";
		}
		if (isDelete) {
			req.operation = "delete";
		}

		try {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this.collectionEndPoint, false);

			//Send the proper header information along with the request
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("accept", "application/json");
			var self = this;
			self.retValue = false;
			xhr.onreadystatechange = function() { // Call a function when the state changes.
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

					var response = JSON.parse(this.responseText);

					// Request finished. Do processing here.
					if (response.statusCode == 0) {
						self.retValue =  true;
					} else {
						console.log(response.errors);
						self.retValue = false;
					}			    	
				}
			}
			
			xhr.onerror = function() {
				self.retValue = false;
			}
			
			xhr.send(JSON.stringify(req));
			return self.retValue;
		} catch (e) {
			console.log(e);
		}
	}
	
	get currentConfig() {
		return this.authenticatedConfig;
	}

	connect(config) {

		//let's authenticate 
		var req = {};

		if (this.authToken != null && this.authTokenExpirationTime.getTime() > new Date().getTime()) {
			req.authToken =  this.authToken;
		} else {
			if (this.authenticatedConfig != null && this.authenticatedConfig.apiKey != null) {
				req.apiKey = this.authenticatedConfig.apiKey;
			} else if (this.apiKey != null) {
				req.apiKey =  this.apiKey;
			} else {
				console.log("Api Key is missing");
				return null;
			}
		}

		if (config !== undefined) {
			if (config.application !== null) {
				req.appName = config.application;
			}

			if (config.projectBranch !== null) {
				req.projectBranch = config.projectBranch;
			}

			if (config.lookup !== null) {
				req.config = config.lookup;
			}
		} else if (this.config !== null) {
			if (this.config.application !== null) {
				req.appName = this.config.application;
			}

			if (this.config.projectBranch !== null) {
				req.projectBranch = this.config.projectBranch;
			}

			if (this.config.lookup !== null) {
				req.config = this.config.lookup;
			}
		}

		try {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this.authenticationEndPoint, false);

			//Send the proper header information along with the request
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.setRequestHeader("accept", "application/json");
			var self = this;
			xhr.onreadystatechange = function() { // Call a function when the state changes.
				if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
					var response = JSON.parse(this.responseText);

					// Request finished. Do processing here.
					if (response.statusCode == 0) {

						var responseData = response.data[0].map;

						self.authToken = responseData.authToken;

						self.authTokenExpirationTime = new Date(responseData.expirationDate);
						var auth = responseData.authentication.map;
						self.apiKey = auth.apiKey;
						self.authenticatedConfig = new Config(auth);
						return true;
					} else {
						console.log(response.errors);
						return false;
					}			    	
				}
			}
			
			xhr.onerror = function() {
				return false;
			}
			
			xhr.send(JSON.stringify(req));
			return true;
		} catch (e) {
			console.log("authentication failed!");
			console.log(e);
			return false;
		}
	}
}

/*
BeyondPropsClient.prototype.collectionEndPoint  = "https://services.beyondpropsdev.net/collections";
BeyondPropsClient.prototype.authenticationEndPoint  = "https://services.beyondpropsdev.net/auhenticate";
BeyondPropsClient.prototype.setPropertyEndPoint  = "https://services.beyondpropsdev.net/setproperty";
BeyondPropsClient.prototype.getPropertyEndPoint  = "https://services.beyondpropsdev.net/getproperty";
*/

BeyondPropsClient.prototype.collectionEndPoint = "https://b38df6hqbh.execute-api.us-east-1.amazonaws.com/Prod/";
BeyondPropsClient.prototype.authenticationEndPoint = "https://hs2cjeq0ed.execute-api.us-east-1.amazonaws.com/Prod/";
BeyondPropsClient.prototype.setPropertyEndPoint = "https://9fo2f8m98j.execute-api.us-east-1.amazonaws.com/Prod/";
BeyondPropsClient.prototype.getPropertyEndPoint = "https://p1ama3nwr2.execute-api.us-east-1.amazonaws.com/Prod/";

