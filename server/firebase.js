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
    getCourseById(id, res) ***REMOVED***
        courseRef
        .child(id)
        .once("value", function(snap)***REMOVED***
            res.status(200).json(***REMOVED***"course": snap.val()});
      ***REMOVED***)
  ***REMOVED***,
    getReviewsByCourseKey(key,res) ***REMOVED***
        reviewRef
        .child(key)
        .once("value", function(snap)***REMOVED***
            res.status(200).json(***REMOVED***"data": snap.val()});
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
        course = reviewRef.child(obj.key);
        newReview = course.push(obj.review); //Endre denne til å bruke key som child av review så vi får reviews-courseKey-[x,y,z]
  ***REMOVED***,
    
    
}
//Update addCourse to something like this ( handle dupes)
/*
async function createUser(user: User) ***REMOVED***
    try ***REMOVED***
        const newDocRef = db.collection('Users').doc()
        await db.runTransaction(async t => ***REMOVED***
            const checkRef = db.collection('Users')
                .where('username', '==', user.username)
            const doc = await t.get(checkRef)
            if (!doc.empty) ***REMOVED***
                throw new FirebaseError('firestore/unique-restriction',
                    `There is already a user with the username: '$***REMOVED***user.username}' in the database.`
                )
          ***REMOVED***
            await t.create(newDocRef, user)
      ***REMOVED***)
        console.log('User Created')
  ***REMOVED*** catch (err) ***REMOVED***
        if (err instanceof FirebaseError) ***REMOVED***
            console.log('Some error in firebase')
            //Do something
      ***REMOVED*** else ***REMOVED***
            console.log('Another error')
            //Do whatever
      ***REMOVED***
  ***REMOVED***
}*/
module.exports = ***REMOVED***
    dbOperations
}