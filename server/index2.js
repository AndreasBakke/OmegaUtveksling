const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

const firebase = require("./firebase.js")
var bodyParser = require('body-parser');
const ***REMOVED*** json } = require("body-parser");
var jsonParser = bodyParser.json();

const courses_data = [
  ***REMOVED***
    id: 1,
    country: "Italia",
    city: "Torino",
    university: "Politecnico di Torino",
    name: "Digital Electronics",
    equivalent: ["TFE4141"],
    type: ["obligatorisk", "valgfag"],
    url: "https://codingthesmartway.com/courses/react-complete-guide/"
***REMOVED***,
  ***REMOVED***
    id: 2,
    country: "Italia",
    city: "Torino",
    university: "Politecnico di Torino",
    name: "Embedded OperatingSystems",
    equivalent: ["Test1", "Test2", "Test2", "Test2", "Test2", "Test2", "Test2", "Test2"],
    type: ["obligatorisk", "valgfag"],
    url: "https://codingthesmartway.com/courses/react-complete-guide/"
***REMOVED***,***REMOVED***
    id: 3,
    country: "Italia",
    city: "Milano",
    university: "Politecnico di Milano",
    name: "Digital Electronics",
    equivalent: [""],
    type: ["k-emne", "valgfag"],
    url: "https://codingthesmartway.com/courses/react-complete-guide/"
***REMOVED***,
  
];

app.use(function (req, res, next) ***REMOVED***
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get("/courses", (req, res) => ***REMOVED***
  res.json(courses_data);
});
app.get("/getCourses", (req, res) => ***REMOVED***
    firebase.dbOperations.getAllCourses(res);
});

app.post('/addCourse', jsonParser, (req, res) => ***REMOVED***
    console.log(req.body)
    const testObj = ***REMOVED***
        "country": "italia",
        "city": "torino",
        "university": "politecnico di torino",
        "name": "digital electronics",
        "code": "02MIVOQ",
        "modality": ["skriftlig", "muntlig"],
        "semester": ["høst"],
        "type": ["obligatorisk"],
        "url": ["https://didattica.polito.it/pls/portal30/gap.pkg_guide.viewGap?p_cod_ins=02LQDOV&p_a_acc=2023&p_header=S&p_lang=IT&multi=N"],
        "language": ["english"],
        "equivalent": [ "TFE4141"]
  ***REMOVED***
    firebase.dbOperations.addCourse(req.body).then(key => ***REMOVED***
        res.send(***REMOVED***"key":key, "success": true})
  ***REMOVED***)
})




app.listen(PORT, () => ***REMOVED***
  console.log(`Server listening on $***REMOVED***PORT}`);
});