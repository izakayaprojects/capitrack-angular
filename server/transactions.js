const mysql = require("./mysql");

module.exports = {
	get_transaction_types: function(type_id) {
		let query = "SELECT * FROM tbl_transaction_types";
		if (type_id != undefined) {
			query += " WHERE _id = "+type_id;
		}
		return new Promise(function(res, rej) {
			mysql.connection.query(query, function(err, results) {
				res({data: results});
			})
		})
	},

	// Untested
	get_all_transactions: function(userid) {
		return new Promise(function(res, rej) {
			if (userid == undefined || userid == "") {
				rej({error: -1, message: "User Id is empty!"})
			} else {
				let query = "SELECT trx._id, isin.isin, isin.name, type._id AS typeid, type.name, trx.artifact_count, trx.artifact_value_per_count, trx.extras, trx.created_at"
					+" FROM tbl_transactions AS trx"
					+" INNER JOIN tbl_isin AS isin ON trx.isin_id = isin.isin"
					+" INNER JOIN tbl_transaction_types AS type ON trx.trans_type_id = type._id";
				if (userid != undefined) {
					query += " WHERE trx.user_id = '"+userid+"'";
				}

				mysql.connection.query(query, function(err, results) {	
					res({data: results});
				})
			}
		})
	}
}