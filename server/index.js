const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const servercalls = require("./servercalls")

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

app.get('/getCourses', (req, res) => {
  servercalls.getAllCourses()
  .then(response => {
    res.json(response);
  })
  .catch(error => {
    console.log(error);
  })
})


app.post("/addCourse",jsonParser,(req, res) => {
  console.log(req.body);
  servercalls.addCourse(req.body);
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});