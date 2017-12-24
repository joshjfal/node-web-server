const express = require("express");
const hbs = require("hbs");

const port = process.env.PORT || 3000; //if environment port not available use 3000.

var app = express(); //Call method, no arguments to specify

//Register partials and give it a directory
hbs.registerPartials(__dirname + "/views/partials")

//Tell node to use HBS view engine
app.set("view engine", "hbs");

//"Middleware"
app.use(express.static(__dirname + "/public"));

//Handlebars will look for a helper with the name, and then look for a local attribute like "welcomeMsg" below.
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear()
});
hbs.registerHelper("ScreamIt", (text) => {
  return text.toUpperCase();
});

//Register a handler for a http GET request:
app.get("/", (req, res) => {
  // res.send("Hello Express!");

  // res.send({ //Send an object instead, Express will automatically change type from "text/html" to "application/json"
  //   person: [
  //     'name',
  //   ]

  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMsg: "Nothing to see here folks. You will need to check back on the site a little later.",
  });

}); //First argument is where, and second argument is what to return

app.get("/about", (req, res) => {
  //res.send("About Page");

  //Use HBS render
  res.render("about.hbs", {
    pageTitle: "About Page",
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to handle request"
  })
});

app.listen(port, () => {
  console.log(`Server is online and listening on port ${port}.`);
}); // Listens on the port you specify: 3000. Second argument can be used to trigger when server started but not required.
