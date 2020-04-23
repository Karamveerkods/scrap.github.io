const {
    ViewedItem
} = require("../../models/schema/viewedItem");
//const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");

module.exports = {
	insertItemStatus:async (data) => {
		let mongoInsertData = data.map(val=>{return {id: val.data.id,viewedStatus: "viewed"}});
		return new Promise((resolve, reject) => {
			ViewedItem
			.insertMany(mongoInsertData)
			.then(res=>{resolve('success')})
			.catch(err=>{reject('err')})
			})
		},
		getViewedItems: () =>{
			return ViewedItem.find({}, { _id:0 ,viewedStatus: 0, __v:0 })	
		}
}