import React from "react";

const d = new Date();
const currMonth = d.getMonth();
const currYear = d.getFullYear().toString();
const currSem = currMonth<4 ? "v" : "h";
const semesters = ["h30","v30","h29","v29","h28","v28","h27","v27","h26","v26","h25","v25","h24","v24","h23","v23","h22","v22","h21","v21","h20","v20","h19","v19","h18","v18"]

const filteredSemesters = semesters.filter(semester => {
	return currSem == "v" ?  parseInt(semester.slice(-2)) <currYear.slice(-2) :  parseInt(semester.slice(-2))<currYear.slice(-2) || ( parseInt(semester.slice(-2))==currYear.slice(-2) && semester.slice(0,1) =="v");
})

async function getFormData(review) {
    var valid = 1;
  const reviewSemester = document.querySelector('select[name="reviewSemester"]').value;
  review.semester = reviewSemester;
    try{
    const type = document.querySelector('input[name="type"]:checked').value;
    review.type = [type]
    }
    catch(e){
    if(e instanceof TypeError) {
        review.type = []
        valid = 0;
    }
    }

    const equivalent = document.querySelector("input[id='equivalent']").value;
    if (equivalent.trim() =="") {
    review.equivalent=[];
    } else {
    review.equivalent=equivalent.trim().replace(", ", ",").split(",");
    }

    try{
    review.difficulty = document.querySelector('input[name="rate_difficulty"]:checked').value;
    }
    catch(e){
    if(e instanceof TypeError) {
        valid = 0;
        review.difficulty = null;
    }
    }

    try{
    review.relevance = document.querySelector('input[name="rate_relevance"]:checked').value;
    }
    catch(e){
    if(e instanceof TypeError) {
        review.relevance = null;
        valid = 0;
    }
    }

    try{
    review.enjoyment = document.querySelector('input[name="rate_enjoyment"]:checked').value;
    }
    catch(e){
    if(e instanceof TypeError) {
        review.enjoyment = null;
        valid = 0;
    }
    }

    const comment = document.querySelector("input[id='comment']").value;
    if (comment.trim() =="") {
    review.comment=null;
    } else {
    review.comment=comment;
    }
    return valid;
}

async function addReview(key, review){
    const fetchResponse = await fetch('/addReview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"key": key, "review": review})
    })
    const data = await fetchResponse.json()
    console.log(data);
    return data; //Return success/not
  }
  


const NewReview = ({showPopup, handleCloseButton, courseKey}) => {

    const handleSendReview = () => {
        console.log("test")
        var review = {};
        getFormData(review)
        .then(valid => {
            if(valid) {
                console.log("valid!")
                addReview(courseKey, review)
                .then(response => {
                    if(response.success) {
                        //Update course
                        window.location.reload();
                    }
                })
            } else {
                document.getElementById("feilInfo").style.visibility="visible";
            }
        })
        console.log(review)
    }
    return (
    <div className="newReviewPopup" style={{display: showPopup ? "block" :"none"}}>
        <div className="popupContent" >
            <span class="close" onClick={handleCloseButton}>&times;</span>
            <h2 className="popupHeader">Legg til ny vurdering</h2>
            <hr></hr>
            <div className="popupBody">
            <div className="vurderingDiv">
          <div className="courseField">
            <label className="courseLabel">Når hadde du emnet? </label>*<br></br>
            <select className="semChoice" defaultValue={'noChoice'} name="reviewSemester" id="semChoice">
              <option disabled  value="noChoice">Velg semester</option>
              {filteredSemesters.map(sem => {
                return(<option key={sem} value={sem}>{sem}</option>)
              })}
            </select>
          </div>

          <div className="courseField">
              <label className="courseLabel">Hva slags type fag ble emnet godkjent som? </label>*<br></br>
              <div className="fagtypeOptions" >
                <div><label htmlFor="typeO">Obligatorisk</label><input type="radio" name="type" id="typeO" value="obligatorisk"></input></div>
                <div><label htmlFor="typeV">Valgfag</label><input type="radio" name="type" id="typeV" value="valgfag"></input></div>
                <div><label htmlFor="typeK">K-emne</label><input type="radio" name="type" id="typeK" value="kemne"></input></div>
                <div><label htmlFor="typeIAS">Ingeniørfag annet studieprogram</label><input type="radio" name="type" id="typeIAS" value="ias"></input></div>
                <div><label htmlFor="typeA">Annet/Ikke viktig</label><input  type="radio" name="type" id="annet" value="a"></input></div>
              </div>
            </div>

            <div className="courseField">
              <label className="courseLabel" htmlFor="equivalent">Hvilket emne ved NTNU ble erstattet? (emnekode)</label><br></br>
              <input type="text" className="courseTextInput" id="equivalent" placeholder="TTTK4145, KULT1101, TFE4141"></input>
              <br></br><div className="inputNote">Spesielt om obligatorisk emne ble erstattet. La stå tomt om det ikke tilsvarer noe spesielt. <br></br>Bruk ", " for å skille flere emner.</div>
            
            </div>

          <div className="courseField">
              <label className="courseLabel">Hvor vanskelig var emnet?: </label>*<br></br>
              <div className="rate">
                <input type="radio" id="star5_difficulty" name="rate_difficulty" value="5" />
                <label htmlFor="star5_difficulty" title="text">5 stars</label>
                <input type="radio" id="star4_difficulty" name="rate_difficulty" value="4" />
                <label htmlFor="star4_difficulty" title="text">4 stars</label>
                <input type="radio" id="star3_difficulty" name="rate_difficulty" value="3" />
                <label htmlFor="star3_difficulty" title="text">3 stars</label>
                <input type="radio" id="star2_difficulty" name="rate_difficulty" value="2" />
                <label htmlFor="star2_difficulty" title="text">2 stars</label>
                <input type="radio" id="star1_difficulty" name="rate_difficulty" value="1" />
                <label htmlFor="star1_difficulty" title="text">1 star</label>
              </div>
            </div>

            <div className="courseField">
              <label className="courseLabel">Hvor relevant var emnet? </label>*<br></br>
              <div className="rate">
                <input type="radio" id="star5_relevance" name="rate_relevance" value="5" />
                <label htmlFor="star5_relevance" title="text">5 stars</label>
                <input type="radio" id="star4_relevance" name="rate_relevance" value="4" />
                <label htmlFor="star4_relevance" title="text">4 stars</label>
                <input type="radio" id="star3_relevance" name="rate_relevance" value="3" />
                <label htmlFor="star3_relevance" title="text">3 stars</label>
                <input type="radio" id="star2_relevance" name="rate_relevance" value="2" />
                <label htmlFor="star2_relevance" title="text">2 stars</label>
                <input type="radio" id="star1_relevance" name="rate_relevance" value="1" />
                <label htmlFor="star1_relevance" title="text">1 star</label>
              </div>
            </div>

            <div className="courseField">
              <label className="courseLabel">Hvor godt likte du emnet?: </label>*<br></br>
              <div className="rate">
                <input type="radio" id="star5_enjoyment" name="rate_enjoyment" value="5" />
                <label htmlFor="star5_enjoyment" title="text">5 stars</label>
                <input type="radio" id="star4_enjoyment" name="rate_enjoyment" value="4" />
                <label htmlFor="star4_enjoyment" title="text">4 stars</label>
                <input type="radio" id="star3_enjoyment" name="rate_enjoyment" value="3" />
                <label htmlFor="star3_enjoyment" title="text">3 stars</label>
                <input type="radio" id="star2_enjoyment" name="rate_enjoyment" value="2" />
                <label htmlFor="star2_enjoyment" title="text">2 stars</label>
                <input type="radio" id="star1_enjoyment" name="rate_enjoyment" value="1" />
                <label htmlFor="star1_enjoyment" title="text">1 star</label>
              </div>
            </div>
            <div className="courseField">
              <label className="courseLabel" htmlFor="comment">Kommentarer om emnet:</label><br></br>
              <input type="text" className="courseTextInput" id="comment" placeholder="Flink professor? Spesielle forkunnskaper?"></input>
            </div>
            <div id="feilInfo" style={{textAlign: "center", marginBottom: "10px", color: "darkred", visibility: "hidden"}}>
              Noe gikk galt! Sjekk at du har fylt ut alle felt med *, eller prøv igjen senere!
            </div>
            <div className="buttonDiv">
              <button className="addCourseBtn" onClick={handleSendReview} >Legg til vurdering</button>
            </div>
        </div>
            </div>
        </div>
    </div>
  );
};
  
export default NewReview;