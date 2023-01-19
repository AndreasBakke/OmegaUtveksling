// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

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
app.get("/courses", (req, res) => ***REMOVED***
  res.json(courses_data);
});

app.listen(PORT, () => ***REMOVED***
  console.log(`Server listening on $***REMOVED***PORT}`);
});