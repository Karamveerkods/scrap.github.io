const {
    Download
} = require("../../models/schema/download");

module.exports = {
    fetch:() => {
		return Download.find({});
	}
}      	