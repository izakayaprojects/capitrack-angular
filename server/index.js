const express = require("express");
const db = require("./mysql");
const auth = require("./auth");
const trx = require("./transactions");
const app = express();

db.connect();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	next();
})

app.get("/", (req, res) =>  {
	res.setHeader("Content-Type", 'application/json');
	res.status(200);
	res.send(JSON.stringify({message: "Hi!"}));
});

app.get("/api/transaction_types/:id", function(req, res) {
	res.setHeader("Content-Type", "application/json");
	trx.get_transaction_types(req.params.id).then(function(types) {
		res.status(200);
		res.send(types);
	})
})

app.get("/api/transaction_types", function(req, res) {
	res.setHeader("Content-Type", "application/json");
	trx.get_transaction_types().then(function(types) {
		res.status(200);
		res.send(types);
	})
})

app.post("/api/user", function(req, res) {
	res.setHeader("Content-Type", "application/json");
	auth.get_user(req.body.token).then(function(user) {
		res.status(200);
		res.send(user);
	})
})

app.post("/api/transactions", function(req, res) {
	res.setHeader("Content-Type", "application/json");
	auth.get_user(req.body.token).then(function(user) {
		if (user._id) {
			trx.get_all_transactions(user._id).then(function(trx) {
				res.status(200);
				res.send(trx);
			}).catch(function(err) {
				res.status(401);
				res.send(err);
			})
		} else {
			res.status(401);
			res.send({error: -1, message: "Token is invalid!"})
		}
	})
})

app.post("/api/transactions/delete", function(req, res) {
	res.setHeader("Content-Type", "application/json");
	auth.get_user(req.body.token).then(function(user) {
		if (user._id) {
			trx.delete_transaction(user._id, req.body.transaction_id).then(function(result) {
				res.status(200);
				res.send(result);
			}).catch(function(err) {
				res.status(401);
				res.send(err);
			})
		} else {
			res.status(401);
			res.send({error: -1, message: "Token is invalid!"})
		}
	})
})

// UNTESTED
app.post("/api/transactions/add", function(req, res) {
	res.setHeader("Content-Type", "application/json");
	auth.get_user(req.body.token).then(function(user) {
		if (user._id) {
			trx.add_transaction(user._id, req.body.type, req.body.isin, req.body.amount, req.body.value, req.body.timestamp).then(function(trx) {
				res.status(200);
				res.send(trx);
			}).catch(function(err) {
				res.status(401);
				res.send(err);
			})
		} else {
			res.status(401);
			res.send({error: -1, message: "Token is invalid!"})
		}
	})
})

app.get("/api/stock/find", function(req, res) {
	res.setHeader("Content-Type", "application/json");
	trx.find_stock_by_name(req.query.search).then(function(stocks) {
		res.status(200);
		res.send(stocks);
	})
})

app.get("/api/stock/get/:isin", function(req, res) {
	res.setHeader("Content-Type", "application/json");
	trx.get_stock_by_isin(req.params.isin).then(function(stocks) {
		res.status(200);
		res.send(stocks);
	})
})

app.post("/api/token_validity", function(req, res) {
	res.setHeader("Content-Type", 'application/json');
	auth.is_token_valid(req.body.token).then(function(tokenInfo) {
		res.status(200);
		res.send(tokenInfo);
	})
})

app.post("/api/login", function(req, res) {
	var email = req.body.email;
	var pass = req.body.password;
	res.setHeader("Content-Type", 'application/json');
	if (!email || !pass) {
		res.status(401);
		res.send(JSON.stringify({
			success: false,
			error: { code: -1, message: "Email or password should not be empty!" }
		}))
	} else {
		auth.check_login(email, pass).then(function(user) {
			res.status(200);
			if (user.is_active != 1) {
				res.send(JSON.stringify({
					success: true,
					data: {
						email: email,
						id: user.id,
						role: user.role,
						active: false
					}
				}));
			} else {
				// create auth token
				auth.generate_auth_token(user.id).then(function(token) {
					res.send(JSON.stringify({
						success: true,
						data: {
							email: email,
							id: user.id,
							role: user.role,
							active: true,
							token: token
						}
					}));
				}, function(err) {
					res.status(500);
					res.send(JSON.stringify({
						success: false,
						error: { code: -3, message: "Internal Server Error. Please try again later." }
					}));
				})
			}
		}, function(err) {
			res.status(401);
			res.send(JSON.stringify({
				success: false,
				error: { code: -2, message: "Wrong email address / password" }
			}));
		});
	}
})

app.listen(3000, () => console.log("Capitrack Server started!!"));