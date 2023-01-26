import React from "react";
  

function capitalizeFirstLetter(string) {
    return string == undefined ? "" :  string.charAt(0).toUpperCase() + string.slice(1);
  }

function computeAverage(reviews, par) {
    var numReviews = 0;
    var score = 0;
    for(var key in reviews) {
        var review = reviews[key]
        numReviews ++;
        score += parseFloat(review[par]);
    }

    return Number((score/numReviews).toFixed(1))
}

function getAllEquivalents(reviews){
    var equivalents = []
    for(var key in reviews) {
        var review = reviews[key];
        for(var key2 in review.equivalent ) {
            var equivalent = review.equivalent[key2]
            if(equivalents.indexOf(equivalent) === -1)  equivalents.push(equivalent);
        }
    }
    return equivalents.join(", ")
}

const Reviews = ({reviews, handleNewReview}) => {
    if(reviews.length==0) return ""
    const sortedReviews = reviews.sort((a,b) => {
        console.log(b.semester[2])
        if(a.semester[2] >b.semester[2]) {
            return -1
        }
    })

    return (
        <div className="reviewsDiv">
            <h1 className="centerHeader" style={{marginBottom: "5px"}}>Vurderinger</h1>
            <div className="averageDiv">
                <h3>Gjennomsnitt:</h3>
                    <p>
                        <strong>Vanskelighetsgrad: </strong> {computeAverage(reviews, "difficulty")}/5<br></br>
                        <strong>Relevanse: </strong> {computeAverage(reviews, "relevance")}/5<br></br>
                        <strong>Likte faget: </strong> {computeAverage(reviews, "enjoyment")}/5<br></br>
                    </p>
            </div>
            <div className="equivalenceDiv">
                <p>
                    <strong>Tidligere godkjent som: </strong> {getAllEquivalents(reviews)}
                </p>
            </div>


            <p style={{textAlign: "right", fontSize: "20px", margin: "0", marginBottom: "5px"}} ><span onClick={handleNewReview} style={{ cursor: "pointer"}}>Legg til ny + </span></p>

            {sortedReviews.map(review => {
                return(<div className="review" key={review.timestamp}>
                    <div className="reviewInfo">
                        <p>
                            <strong>Når: </strong> {capitalizeFirstLetter(review.semester)}<br></br>
                            <strong>Fagtype erstattet: </strong> {capitalizeFirstLetter(review.type.join(", "))} <br></br>
                            <strong>Fag erstattet: </strong> {capitalizeFirstLetter(review.equivalent.join(", "))} <br></br>
                            <strong>Kommentar: </strong> {review.comment} <br></br>
                        </p>
                    </div>

                    <div className="starRatings">
                        <div className="starR starDiff">
                            <strong>Vanskelighetsgrad: </strong> 
                            <span id="1" className={review.difficulty >= 1 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className={review.difficulty >= 2 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className={review.difficulty >= 3 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className={review.difficulty >= 4 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className={review.difficulty == 5 ? "starYellow" : "starGrey"}>&#9733;</span>
                        </div>

                        <div className="starR starDiff">
                            <strong>Relevanse: </strong>
                            <span id="1" className={review.relevance >= 1 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className={review.relevance >= 2 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className={review.relevance >= 3 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className={review.relevance >= 4 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className={review.relevance == 5 ? "starYellow" : "starGrey"}>&#9733;</span>
                        </div>

                        <div className="starR starDiff">
                            <strong>Likte faget: </strong>
                            <span id="1" className={review.enjoyment >= 1 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className={review.enjoyment >= 2 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className={review.enjoyment >= 3 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className={review.enjoyment >= 4 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className={review.enjoyment == 5 ? "starYellow" : "starGrey"}>&#9733;</span>
                        </div>
                    </div>

                </div>)
            })}
        </div>
    );
};
  
export default Reviews;