// App Requirements
// Express
var express = require("express");
var app = express();

//Templates
var ejs = require("ejs");
app.set("view_engine", "ejs");

//BodyParser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

//Method-Override
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

//Sqlite3
var sqlite3 = require("sqlite3").verbose();

//Requiring Database
var db = new sqlite3.Database("./DB/microblog.db");

// Requiring StyleSheet
app.use('/public',express.static(__dirname + "/public"));

// Redirect to (Home Page)
app.get("/", function (req, res) {
	res.redirect("/microposts")
});

// Show All Current MicroPosts (Home Page)
app.get("/microposts", function (req, res) {
	db.all("SELECT * FROM microposts;", function (err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
		res.render("index.ejs", {microposts: data});
      });
   });

// Show Indiv. Micro Post Page
app.get("/micropost/:id", function (req, res) {
	var id = req.params.id;
	db.get("SELECT * FROM microposts WHERE id = ?", id, function (err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
		res.render("show.ejs", {micropost: data})
	});
});


// Show Creation Page
app.get("/microposts/createpost", function (req, res) {
	res.render("create.ejs");
});

// Show Edit Page
app.get("/micropost/:id/edit", function (req, res) {
	var id = req.params.id;
	db.get("SELECT * FROM microposts WHERE id = ?", id, function (err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
		res.render("edit.ejs", {micropost: data});
	});
});

// Show Post-Authors Page
app.get("/microposts/postauthors", function (req, res) {
	db.all("SELECT * FROM microposts", function (err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
		res.render("authors.ejs", {microposts: data});
	});	
});

// Show Topics & #Hashtags Page
app.get("/microposts/topics&hashtags", function (req, res) {
	db.all("SELECT * FROM microposts;", function (err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
		res.render("tags.ejs", {microposts: data});
	});
});

// Create a New Post
app.post("/microposts", function (req, res) {
	db.run("INSERT INTO microposts (title, author, body, image, tags) VALUES (?, ?, ?, ?, ?);", req.body.title, req.body.author, req.body.body, req.body.image, req.body.tags, function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Created New Post!");
		}
		res.redirect("/microposts");
	});
});

// Update a Post
app.put("/microposts/update/:id", function (req, res) {
	db.run("UPDATE microposts SET title = ?, author = ?, body = ?, image = ?, tags = ? WHERE id = ?;", req.body.title, req.body.author, req.body.body, req.body.image, req.body.tags, req.params.id, function (err) {
		if (err) {
			console.log(err);
		} else {
			console.log("Edited Post!");
		}
		res.redirect("/micropost/" + req.params.id);
	});
});

// Delete Post
app.delete("/micropost/:id", function (req, res) {
	db.run("DELETE FROM microposts WHERE id = ?;", req.params.id);
	res.redirect("/microposts");
});



// Listening on Port 3001
app.listen(3001, function() {
console.log("listening to Port 3000");
});
