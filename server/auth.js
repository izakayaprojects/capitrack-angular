const md5 = require("md5");
const crypto = require("crypto");
const mysql = require("./mysql");

const AUTH_KEY_LIFETIME = 1000 * 3600 * 24; // 1 Day

module.exports = {
	check_login: function(email, pass) {
		var query = "SELECT _id, role, is_active FROM tbl_users WHERE email = ? AND password = ?";
		return new Promise(function(resolve, reject) {
			mysql.connection.query(query, [email, md5(pass)], function(err, results) {
				if (err) {
					reject(Error(err));
				} else {
					if (results.length > 0) {
						resolve({
							id: results[0]._id, 
							role: results[0].role, 
							is_active: results[0].is_active
						});
					} else {	
						reject(Error("Not found!"));
					}
				}
			});	
		})
	},

	logout: function(token) {
		var query = "DELETE FROM tbl_user_auth WHERE auth_key = ?";
		return new Promise(function(resolve, reject){
			mysql.connection.query(query, [token], function(err, results) {
				resolve({})
			})
		})
	},

	get_user: function(token) {
		return new Promise(function(resolve, reject) {
			let query = "SELECT user._id, user.email, user.first_name, user.last_name, user.role, user.is_active"+
				" FROM tbl_users AS user"+
				" INNER JOIN tbl_user_auth as auth ON user._id = auth.user_id"+
				" WHERE auth.auth_key = ?";
			mysql.connection.query(query, [token], function(err, results) {
				if (results == undefined || results.length == 0) resolve({})
				else resolve(results[0]);
			});
		})
	},

	is_token_valid: function(token) {
		return new Promise(function(resolve, reject) {
			mysql.connection.query("SELECT user_id, expire_at FROM tbl_user_auth WHERE auth_key = ?", [token],
				function(err, results) {
					if (err) {
						reject(Error(err))
					} else {
						if (results.length == 0) {
							resolve({
								code: -1,
								valid: false,
								reason: "Token is invalid"
							})
						} else {
							var expiration = new Date(results[0].expire_at);
							var now = new Date();
							if (expiration < now) {
								resolve({
									code: -2,
									valid: false,
									reason: "Token is expired"
								})
							} else {
								resolve({
									code: 1,
									valid: true,
								})
							}
						}
					}
				});
		})
	},

	generate_auth_token: function(userid) {
		return new Promise(function(resolve, reject){
			mysql.connection.query("DELETE FROM tbl_user_auth WHERE user_id = ?", [userid],
				function(err, results) {
					var token = crypto.randomBytes(32).toString("hex");
					var expiration = new Date(Date.now() + AUTH_KEY_LIFETIME);
					mysql.connection.query("INSERT INTO tbl_user_auth VALUES (?,?,?)", 
						[userid, token, expiration],
						function (err, results) {
							resolve({
								authentication_key: token,
								until: expiration
							});
						})
				})
		});
	}
}