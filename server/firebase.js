const admin = require("firebase-admin");

const serviceAccount = require("./admin.json");

admin.initializeApp(***REMOVED***
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://omegautveksling-5df30-default-rtdb.europe-west1.firebasedatabase.app"
});


var db = admin.database();
var countryRef = db.ref("countries");
var uniRef =db.ref("universities");
var courseRef =db.ref("courses");
var reviewRef = db.ref("reviews")

const dbOperations=***REMOVED***
    getAllCourses(res) ***REMOVED***
        courseRef.once('value', function(snap)***REMOVED***
            res.status(200).json(***REMOVED***"data":snap.val()});
      ***REMOVED***)
  ***REMOVED***,
    async addCourse(obj, res)***REMOVED***
        //Also add country and city to respective references!  (Makes adding more easier)
        //Verify that course is not made already
        newCourse = courseRef.push(obj);
        key=newCourse.getKey()
        return key;
  ***REMOVED***,
    async addReview(obj,res) ***REMOVED***
        newReview = reviewRef.push(obj);
        key=newCourse.getKey()
        return key;
  ***REMOVED***
    
}


module.exports = ***REMOVED***
    dbOperations
}