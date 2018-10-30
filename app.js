var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();

// APP CONFIG
mongoose.connect('mongodb://localhost:27017/restful_blog_app', { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function(req, res) {
    res.redirect("/blogs");
})

// INDEX ROUTE
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log("ERROR");
        }
        else {
            res.render("index", { blogs: blogs });
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
    res.render("new");
})

// CREATE ROUTE
app.post("/blogs", function(req, res) {
    Blog.create(req.body.blog, function(err, newBlog) {
        if (err) {
            console.log(err);
        }
        else {
            //redirect back to the index page
            res.redirect("/blogs");
        }
    });
});

// RESTFUL ROUTES

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("SERVER IS RUNNING");
});
