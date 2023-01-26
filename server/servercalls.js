const postgres = require('postgres');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const sql = postgres(URL, { ssl: 'require' });


async function getAllCourses() {
    const result = await sql`SELECT * FROM countries co JOIN cities ci ON co.name=ci.country JOIN universities u on ci.name=u.city JOIN courses crs on u.name=crs.university ORDER BY crs.name ASC;`;
    return(result);
}


async function getCoursesByCountry(country) {
    country=country.toLowerCase()
    const result = await sql`SELECT * FROM countries co JOIN cities ci ON co.name=ci.country JOIN universities u on ci.name=u.city JOIN courses crs on u.name=crs.university WHERE co.name=${country}`;
    return result;
}

async function getCoursesByCity(city) {
    city=city.toLowerCase()
    const result = await sql`SELECT * FROM countries co JOIN cities ci ON co.name=ci.country JOIN universities u on ci.name=u.city JOIN courses crs on u.name=crs.university WHERE ci.name=${city}`;
    return result;
}

async function getCoursesByUni(uni) {
    uni=uni.toLowerCase()
    const result = await sql`SELECT * FROM  countries co JOIN cities ci ON co.name=ci.country JOIN universities u on ci.name=u.city JOIN courses crs on u.name=crs.university WHERE u.name=${uni}`;
    return result;
}

async function checkForExisitngCourse(courseInfo) {
    const result = await sql`SELECT EXISTS(SELECT 1 FROM  countries co JOIN cities ci ON co.name=ci.country JOIN universities u on ci.name=u.city JOIN courses crs on u.name=crs.university WHERE crs.name=${courseInfo.course})`;
    return result;
}

async function verifyCourse(courseInfo){
    //Må validere at faget ikke allerde finnes (Likt studiested og fagnavn).
    //Skal godkjent som bare legges inn ved "vurdering av fag"? Ikke knyttet til faget?
    //country_name, city_name, uni_name, course_name, code, modality, semester, type, url, language, equivalent
    //LowerCase first ones:
    courseInfo.country  = courseInfo.country.toLowerCase();
    courseInfo.city     = courseInfo.city.toLowerCase();
    courseInfo.uni      = courseInfo.uni.toLowerCase();
    courseInfo.course   = courseInfo.courseInfo.toLowerCase();
    courseInfo.code     = courseInfo.code.toLowerCase();
    courseInfo.language = courseInfo.language.toLowerCase();
    
    //Handle all array-options that may be undefined
    if (courseInfo.modality === undefined) {
       courseInfo.modality = [""];
    }
    if (courseInfo.semester === undefined) {
        courseInfo.semester = [""];
    } 
    if (courseInfo.type === undefined) {
       courseInfo.type = [""];
    }
    if (courseInfo.url === undefined) {
        courseInfo.url = [""];
    }
    if (courseInfo.equivalent === undefined) {
       courseInfo.equivalent = [""];
    }
    
    const country = await sql`INSERT INTO countries VALUES (${body.country}) ON CONFLICT DO NOTHING`;
    const city = await sql`INSERT INTO cities VALUES (${body.country}, ${body.city}) ON CONFLICT DO NOTHING`;
    const uni = await sql`INSERT INTO universities VALUES (${body.city}, ${body.uni}) ON CONFLICT DO NOTHING`;
    //Make sure we have everything
    checkForExisitngCourse(courseInfo).then(result => {
        return result=='t' ? 'new' : 'dupe';
    });
}   

async function addCourse(courseInfo) {
    //country_name, city_name, uni_name, course_name, code, modality, equivalent, semester, type, url, language
    //Add course, country, city and uni
    verifyCourse(courseInfo).then(result => {
        if(result =='new'){
            newCourse(courseInfo);
        } else if(result =='dupe') {
            updateCourse(courseInfo);
        }
    })
}
async function newCourse(courseInfo) {
    const course = await sql`INSERT INTO courses VALUES (${courseInfo.uni}, ${courseInfo.name}, ${courseInfo.code}, ${courseInfo.modality}, ${courseInfo.semester}, ${courseInfo.type}, ${courseInfo.url}, ${courseInfo.language}, ${courseInfo.equivalent}) ON CONFLICT DO NOTHING`;
    return course;
}

async function updateCourse(courseInfo){
    const equivalents = await sql`UPDATE courses SET equivalent = (SELECT ARRAY(SELECT DISTINCT UNNEST(equivalent::text[]||${courseInfo.equivalent})))  WHERE name=${courseInfo.course} AND university=${courseInfo.uni}`
    const url = await sql`UPDATE courses SET url = (SELECT ARRAY(SELECT DISTINCT UNNEST(url::text[]||${courseInfo.url})))  WHERE name=${courseInfo.course} AND university=${courseInfo.uni}`
    const type = await sql`UPDATE courses SET type = (SELECT ARRAY(SELECT DISTINCT UNNEST(type::text[]||${courseInfo.type})))  WHERE name=${courseInfo.course} AND university=${courseInfo.uni}`
    const modality = await sql`UPDATE courses SET modality = (SELECT ARRAY(SELECT DISTINCT UNNEST(modality::text[]||${courseInfo.modality})))  WHERE name=${courseInfo.course} AND university=${courseInfo.uni}`
    const semester = await sql`UPDATE courses SET semester = (SELECT ARRAY(SELECT DISTINCT UNNEST(semester::text[]||${courseInfo.semester})))  WHERE name=${courseInfo.course} AND university=${courseInfo.uni}`
    //etc....
}

module.exports = {
    getAllCourses,
    getCoursesByCountry,
    getCoursesByCity,
    getCoursesByUni,
    verifyCourse,
    addCourse
}