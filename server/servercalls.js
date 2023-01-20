const postgres = require('postgres');
require('dotenv').config();

const ***REMOVED*** PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://$***REMOVED***PGUSER}:$***REMOVED***PGPASSWORD}@$***REMOVED***PGHOST}/$***REMOVED***PGDATABASE}?options=project%3D$***REMOVED***ENDPOINT_ID}`;

const sql = postgres(URL, ***REMOVED*** ssl: 'require' });


async function getAllCourses() ***REMOVED***
    const result = await sql`SELECT * FROM countries co JOIN cities ci ON co.name=ci.country JOIN universities u on ci.name=u.city JOIN courses crs on u.name=crs.university ORDER BY crs.name ASC;`;
    return(result);
}


async function getCoursesByCountry(country) ***REMOVED***
    country=country.toLowerCase()
    const result = await sql`SELECT * FROM countries co JOIN cities ci ON co.name=ci.country JOIN universities u on ci.name=u.city JOIN courses crs on u.name=crs.university WHERE co.name=$***REMOVED***country}`;
    return result;
}

async function getCoursesByCity(city) ***REMOVED***
    city=city.toLowerCase()
    const result = await sql`SELECT * FROM countries co JOIN cities ci ON co.name=ci.country JOIN universities u on ci.name=u.city JOIN courses crs on u.name=crs.university WHERE ci.name=$***REMOVED***city}`;
    return result;
}

async function getCoursesByUni(uni) ***REMOVED***
    uni=uni.toLowerCase()
    const result = await sql`SELECT * FROM  countries co JOIN cities ci ON co.name=ci.country JOIN universities u on ci.name=u.city JOIN courses crs on u.name=crs.university WHERE u.name=$***REMOVED***uni}`;
    return result;
}

async function checkForExisitngCourse(courseInfo) ***REMOVED***
    const result = await sql`SELECT EXISTS(SELECT 1 FROM  countries co JOIN cities ci ON co.name=ci.country JOIN universities u on ci.name=u.city JOIN courses crs on u.name=crs.university WHERE crs.name=$***REMOVED***courseInfo.course})`;
    return result;
}

async function verifyCourse(courseInfo)***REMOVED***
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
    if (courseInfo.modality === undefined) ***REMOVED***
       courseInfo.modality = [""];
  ***REMOVED***
    if (courseInfo.semester === undefined) ***REMOVED***
        courseInfo.semester = [""];
  ***REMOVED*** 
    if (courseInfo.type === undefined) ***REMOVED***
       courseInfo.type = [""];
  ***REMOVED***
    if (courseInfo.url === undefined) ***REMOVED***
        courseInfo.url = [""];
  ***REMOVED***
    if (courseInfo.equivalent === undefined) ***REMOVED***
       courseInfo.equivalent = [""];
  ***REMOVED***
    
    const country = await sql`INSERT INTO countries VALUES ($***REMOVED***body.country}) ON CONFLICT DO NOTHING`;
    const city = await sql`INSERT INTO cities VALUES ($***REMOVED***body.country}, $***REMOVED***body.city}) ON CONFLICT DO NOTHING`;
    const uni = await sql`INSERT INTO universities VALUES ($***REMOVED***body.city}, $***REMOVED***body.uni}) ON CONFLICT DO NOTHING`;
    //Make sure we have everything
    checkForExisitngCourse(courseInfo).then(result => ***REMOVED***
        return result=='t' ? 'new' : 'dupe';
  ***REMOVED***);
}   

async function addCourse(courseInfo) ***REMOVED***
    //country_name, city_name, uni_name, course_name, code, modality, equivalent, semester, type, url, language
    //Add course, country, city and uni
    verifyCourse(courseInfo).then(result => ***REMOVED***
        if(result =='new')***REMOVED***
            newCourse(courseInfo);
      ***REMOVED*** else if(result =='dupe') ***REMOVED***
            updateCourse(courseInfo);
      ***REMOVED***
  ***REMOVED***)
}
async function newCourse(courseInfo) ***REMOVED***
    const course = await sql`INSERT INTO courses VALUES ($***REMOVED***courseInfo.uni}, $***REMOVED***courseInfo.name}, $***REMOVED***courseInfo.code}, $***REMOVED***courseInfo.modality}, $***REMOVED***courseInfo.semester}, $***REMOVED***courseInfo.type}, $***REMOVED***courseInfo.url}, $***REMOVED***courseInfo.language}, $***REMOVED***courseInfo.equivalent}) ON CONFLICT DO NOTHING`;
    return course;
}

async function updateCourse(courseInfo)***REMOVED***
    const equivalents = await sql`UPDATE courses SET equivalent = (SELECT ARRAY(SELECT DISTINCT UNNEST(equivalent::text[]||$***REMOVED***courseInfo.equivalent})))  WHERE name=$***REMOVED***courseInfo.course} AND university=$***REMOVED***courseInfo.uni}`
    const url = await sql`UPDATE courses SET url = (SELECT ARRAY(SELECT DISTINCT UNNEST(url::text[]||$***REMOVED***courseInfo.url})))  WHERE name=$***REMOVED***courseInfo.course} AND university=$***REMOVED***courseInfo.uni}`
    const type = await sql`UPDATE courses SET type = (SELECT ARRAY(SELECT DISTINCT UNNEST(type::text[]||$***REMOVED***courseInfo.type})))  WHERE name=$***REMOVED***courseInfo.course} AND university=$***REMOVED***courseInfo.uni}`
    const modality = await sql`UPDATE courses SET modality = (SELECT ARRAY(SELECT DISTINCT UNNEST(modality::text[]||$***REMOVED***courseInfo.modality})))  WHERE name=$***REMOVED***courseInfo.course} AND university=$***REMOVED***courseInfo.uni}`
    const semester = await sql`UPDATE courses SET semester = (SELECT ARRAY(SELECT DISTINCT UNNEST(semester::text[]||$***REMOVED***courseInfo.semester})))  WHERE name=$***REMOVED***courseInfo.course} AND university=$***REMOVED***courseInfo.uni}`
    //etc....
}

module.exports = ***REMOVED***
    getAllCourses,
    getCoursesByCountry,
    getCoursesByCity,
    getCoursesByUni,
    verifyCourse,
    addCourse
}