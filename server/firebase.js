const admin = require("firebase-admin");

const serviceAccount = require("./admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://omegautveksling-5df30-default-rtdb.europe-west1.firebasedatabase.app"
});


var db = admin.database();
var countryRef = db.ref("countries");
var uniRef =db.ref("universities");
var courseRef =db.ref("courses");
var reviewRef = db.ref("reviews")

const dbOperations={
    getAllCourses(res) {
        courseRef.once('value', function(snap){
            res.status(200).json({"data":snap.val()});
        })
    },
    getCourseById(id, res) {
        courseRef
        .child(id)
        .once("value", function(snap){
            res.status(200).json({"course": snap.val()});
        })
    },
    getReviewsByCourseKey(key,res) {
        reviewRef
        .child(key)
        .once("value", function(snap){
            res.status(200).json({"data": snap.val()});
        })
    },
    async addCourse(obj, res){
        //Also add country and city to respective references!  (Makes adding more easier)
        //Verify that course is not made already
        newCourse = courseRef.push(obj);
        key=newCourse.getKey()
        return key;
    },
    async addReview(obj,res) {
        course = reviewRef.child(obj.key);
        newReview = course.push(obj.review); //Endre denne til å bruke key som child av review så vi får reviews-courseKey-[x,y,z]
    },
    
}
//Update addCourse to something like this ( handle dupes)
/*
async function createUser(user: User) {
    try {
        const newDocRef = db.collection('Users').doc()
        await db.runTransaction(async t => {
            const checkRef = db.collection('Users')
                .where('username', '==', user.username)
            const doc = await t.get(checkRef)
            if (!doc.empty) {
                throw new FirebaseError('firestore/unique-restriction',
                    `There is already a user with the username: '${user.username}' in the database.`
                )
            }
            await t.create(newDocRef, user)
        })
        console.log('User Created')
    } catch (err) {
        if (err instanceof FirebaseError) {
            console.log('Some error in firebase')
            //Do something
        } else {
            console.log('Another error')
            //Do whatever
        }
    }
}*/
module.exports = {
    dbOperations
}