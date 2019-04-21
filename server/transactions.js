const mysql = require("./mysql");
const crypto = require("crypto");

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

	add_transaction(): function(userid, type, isin, amount, valPerAmount, timestamp) {
		return new Promise(function(res, rej) {
			if (userid == undefined || userid == "") {
				rej({error: -2, message: "User Id is empty!"})
			} else {
				let trx_id = crypto.randomBytes(32).toString("hex");
				let query = "INSERT INTO tbl_transactions "+
					"(_id,user_id,isin_id,trans_type_id,artifact_count,artifact_value_per_count,created_at) "+
					"VALUES (?,?,?,?,?,?,?)"
				mysql.connection.query(query, [trx_id,userid,isin,type,amount,valPerAmount,timestamp],
					function(err, results) {
						if (err) {
							rej({error:-3, message: err})
						} else {
							result({transaction_id: trx_id})
						}
					})
			}
		});

	},

	get_all_transactions: function(userid) {
		return new Promise(function(res, rej) {
			if (userid == undefined || userid == "") {
				rej({error: -2, message: "User Id is empty!"})
			} else {
				let query = "SELECT trx._id, isin.isin, isin.name AS stock_name, type._id AS typeid, type.name, trx.artifact_count, trx.artifact_value_per_count, trx.extras, trx.created_at"
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
	},

	find_stock_by_name: function(name) {
		return new Promise(function(res, rej) {
			let query = "SELECT * from tbl_isin WHERE name LIKE '%"+name+"%' COLLATE utf8_general_ci";
			mysql.connection.query(query, function(err, results) {
				res({data: results});
			})
		})
	}
}