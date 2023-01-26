const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

const firebase = require("./firebase.js")
var bodyParser = require('body-parser');
const { json } = require("body-parser");
var jsonParser = bodyParser.json();

const courses_data = [
  {
    id: 1,
    country: "Italia",
    city: "Torino",
    university: "Politecnico di Torino",
    name: "Digital Electronics",
    equivalent: ["TFE4141"],
    type: ["obligatorisk", "valgfag"],
    url: "https://codingthesmartway.com/courses/react-complete-guide/"
  },
  {
    id: 2,
    country: "Italia",
    city: "Torino",
    university: "Politecnico di Torino",
    name: "Embedded OperatingSystems",
    equivalent: ["Test1", "Test2", "Test2", "Test2", "Test2", "Test2", "Test2", "Test2"],
    type: ["obligatorisk", "valgfag"],
    url: "https://codingthesmartway.com/courses/react-complete-guide/"
  },{
    id: 3,
    country: "Italia",
    city: "Milano",
    university: "Politecnico di Milano",
    name: "Digital Electronics",
    equivalent: [""],
    type: ["k-emne", "valgfag"],
    url: "https://codingthesmartway.com/courses/react-complete-guide/"
  },
  
];

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get("/courses", (req, res) => {
  res.json(courses_data);
});
app.get("/getCourses", (req, res) => {
    firebase.dbOperations.getAllCourses(res);
});
app.get("/getCourseById", (req, res) => {
    const id=req.query.id
    firebase.dbOperations.getCourseById(id, res);
})

app.get("/getReviewsByCourseKey", (req, res) => {
    const key=req.query.key
    firebase.dbOperations.getReviewsByCourseKey(key, res);
})




app.post('/addCourse', jsonParser, (req, res) => {
    firebase.dbOperations.addCourse(req.body).then(key => {
        res.send({"key":key, "success": true})
    })
})

app.post('/addReview', jsonParser, (req,res) => {
    firebase.dbOperations.addReview(req.body).then(key => {
        res.send({"success": true})
    })
})





app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});