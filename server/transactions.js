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

	add_transaction: function(userid, type, isin, amount, valPerAmount, timestamp) {
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
							rej({error:-3, message: "Error inserting transaction!"})
						} else {
							res({transaction_id: trx_id})
						}
					})
			}
		});

	},

	delete_transaction: function(userid, trxid) {
		return new Promise(function(res, rej) {
			if (userid == undefined || userid == "") {
				rej({error: -2, message: "User Id is empty!"})
			} else if (trxid == undefined || trxid == "") {
				rej({error: -3, message: "Transaction Id is empty!"})
			} else {
				let query = "DELETE FROM tbl_transactions WHERE _id = ? AND user_id = ?"
				mysql.connection.query(query, [trxid, userid], function(err, results) {
					if (err) {
						rej({error: -4, message: "Error deleting transaction!"})
					} else {
						res({success: true, 
							deleted_transaction_id: trxid, 
							deleted_transactions: results.affectedRows
						})
					}
				})
			}
		})
	},

	get_all_transactions: function(userid) {
		return new Promise(function(res, rej) {
			if (userid == undefined || userid == "") {
				rej({error: -2, message: "User Id is empty!"})
			} else {
				let query = "SELECT trx._id, isin.isin, isin.name AS stock_name, type._id AS typeid, type.name, trx.artifact_count, trx.artifact_value_per_count, trx.extras, trx.created_at"
					+" FROM tbl_transactions AS trx"
					+" LEFT JOIN tbl_isin AS isin ON trx.isin_id = isin.isin"
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
	},

	get_stock_by_isin: function(isin) {
		return new Promise(function(res, rej) {
			let query = "SELECT * from tbl_isin WHERE isin = ?";
			mysql.connection.query(query, [isin], function(err, results) {
				res({data: results});
			})
		})
	},

	add_stock: function(isin, name, market, secType, secType2) {
		// TODO add stock to db
		return new Promise(function(res, rej) {
			let query = "INSERT INTO tbl_isin (isin,name,market_sector,security_type,security_type2) VALUES (?,?,?,?,?)";
			mysql.connection.query(query, [isin, name, market, secType, secType2], function(err, results) {
				if (err) {
					rej({error: -2, message: "Error adding new stock!"})
				} else {
					res({success: true, 
						isin: isin, 
						newly_added: results.affectedRows
					})
				}
			})
		})
	}
}