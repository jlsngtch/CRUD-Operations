const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const Department = require("./models/Department");
const app = express();

// connect to database and listen to connection
const dbURI =
  "mongodb+srv://jlsngtch:aG8mJx47lI7h2ec9@cluster0.3tcyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
try {
  mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
      console.log("Database connected!");
      app.listen(3000);
    });
} catch (error) {
  console.log(error);
}

//Register view engine
app.set("view engine", "ejs");
//Use Middleware.

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//home routes.
app.get("/", (req, res) => {
  res.redirect("/users");
});

//index page!

app.get("/users", (req, res) => {
  console.log("req made on" + req.url);
  User.find()
    .sort({ createdAt: -1 }) //it will find all data and show it in descending order
    .then((result) => {
      res.render("index", { users: result, title: "Home" }); //it will then render index page along with users
    })
    .catch((err) => {
      console.log(err);
    });
});

//department.ejs
app.get("/departments", (req, res) => {
  console.log("Req made on" + req.url);
  Department.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("departments", { departments: result, title: "Department" });
    });
});
//About page.

app.get("/about", (req, res) => {
  console.log("req made on" + req.url);
  res.render("about", { title: "About" });
});

//Route for user to create.

app.get("/user/create", (req, res) => {
  console.log("GET req made on" + req.url);
  res.render("addUser", { title: "Add-User" });
});

//route to create department.
app.get("/department/create", (req, res) => {
  console.log("GET req made on:" + req.url);
  res.render("addDepartments", { title: "Add-Department" });
});

// route for user specific details.

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((result) => {
      res.render("details", {
        user: result,
        action: "edit",
        title: "User Details",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//route for specific departments

app.get("/departments/:id", (req, res) => {
  const id = req.params.id;
  Department.findById(id)
    .then((result) => {
      res.render("departmentDetails", {
        department: result,
        action: "edit",
        title: "department details",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
//route for edit/name/ variable to display current value to input into the field.

app.get("/edit/:name/:action", (req, res) => {
  const name = req.params.name;

  console.log("Req made on" + req.url);
  User.findOne({ name: name })
    .then((result) => {
      res.render("edit", { user: result, title: "Edit-User" });
    })
    .catch((err) => {
      console.log(err);
      s;
    });
});

//submitting data routes
//for department.
app.post("/department/create", (req, res) => {
  console.log("POST req made on" + req.url);
  console.log("Form submitted to server");

  const department = new Department(req.body);

  department
    .save() // Saving to database collection.

    .then((result) => {
      res.redirect("/departments"); // redirect to home page.
    })
    .catch((err) => {
      console.log(err);
    });
});

//for add user
app.post("/user/create", (req, res) => {
  console.log("POST req made on" + req.url);
  console.log("Form submitted to the server");

  /*Note: when you are passing form obj directly to collection using model you
          have to give same name in form of that data that is to be passed in database 
          and that name is declared inside schema*/
  const user = new User(req.body); //passing object of form data directly to collection

  user
    .save() // Saving to database collection.

    .then((result) => {
      res.redirect("/users"); // redirect to home page.
    })
    .catch((err) => {
      console.log(err);
    });
});
//route for updating users.
app.post("/edit/:id", (req, res) => {
  console.log("POST req made on" + req.url);
  User.updateOne({ _id: req.params.id }, req.body) //then updating that user whose id is get from url
    //first passing id which user is to be updated than passing update info
    .then((result) => {
      res.redirect("/users"); //is success save this will redirect to home page
      console.log("Users profile Updated");
    })
    .catch((err) => {
      //if data not saved error showed
      console.log(err);
    });
});

//Routes for deleting users.

app.post("/users/:name", (req, res) => {
  const name = req.params.name;
  console.log(name);

  User.deleteOne({ name: name })
    .then((result) => {
      res.redirect("/users");
    })
    .catch((err) => {
      console.log(err);
    });
});

//route to delete department.

app.post("/departments/:department", (req, res) => {
  const department = req.params.department;
  console.log(department);
  Department.deleteOne({ department: department })
    .then((result) => {
      res.redirect("/departments");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Route for handling errors.

app.use((req, res) => {
  console, log("Req made on" + req.url);
  res.render("/404", { title: "Not Found" });
});
