import React from "react";
  

function capitalizeFirstLetter(string) ***REMOVED***
    return string == undefined ? "" :  string.charAt(0).toUpperCase() + string.slice(1);
***REMOVED***

function computeAverage(reviews, par) ***REMOVED***
    var numReviews = 0;
    var score = 0;
    for(var key in reviews) ***REMOVED***
        var review = reviews[key]
        numReviews ++;
        score += parseFloat(review[par]);
  ***REMOVED***

    return Number((score/numReviews).toFixed(1))
}

function getAllEquivalents(reviews)***REMOVED***
    var equivalents = []
    for(var key in reviews) ***REMOVED***
        var review = reviews[key];
        for(var key2 in review.equivalent ) ***REMOVED***
            var equivalent = review.equivalent[key2]
            if(equivalents.indexOf(equivalent) === -1)  equivalents.push(equivalent);
      ***REMOVED***
  ***REMOVED***
    return equivalents.join(", ")
}

const Reviews = (***REMOVED***reviews, handleNewReview}) => ***REMOVED***
    if(reviews.length==0) return ""
    const sortedReviews = reviews.sort((a,b) => ***REMOVED***
        console.log(b.semester[2])
        if(a.semester[2] >b.semester[2]) ***REMOVED***
            return -1
      ***REMOVED***
  ***REMOVED***)

    return (
        <div className="reviewsDiv">
            <h1 className="centerHeader" style=***REMOVED******REMOVED***marginBottom: "5px"}}>Vurderinger</h1>
            <div className="averageDiv">
                <h3>Gjennomsnitt:</h3>
                    <p>
                        <strong>Vanskelighetsgrad: </strong> ***REMOVED***computeAverage(reviews, "difficulty")}/5<br></br>
                        <strong>Relevanse: </strong> ***REMOVED***computeAverage(reviews, "relevance")}/5<br></br>
                        <strong>Likte faget: </strong> ***REMOVED***computeAverage(reviews, "enjoyment")}/5<br></br>
                    </p>
            </div>
            <div className="equivalenceDiv">
                <p>
                    <strong>Tidligere godkjent som: </strong> ***REMOVED***getAllEquivalents(reviews)}
                </p>
            </div>


            <p style=***REMOVED******REMOVED***textAlign: "right", fontSize: "20px", margin: "0", marginBottom: "5px"}} ><span onClick=***REMOVED***handleNewReview} style=***REMOVED******REMOVED*** cursor: "pointer"}}>Legg til ny + </span></p>

            ***REMOVED***sortedReviews.map(review => ***REMOVED***
                return(<div className="review" key=***REMOVED***review.timestamp}>
                    <div className="reviewInfo">
                        <p>
                            <strong>Når: </strong> ***REMOVED***capitalizeFirstLetter(review.semester)}<br></br>
                            <strong>Fagtype erstattet: </strong> ***REMOVED***capitalizeFirstLetter(review.type.join(", "))} <br></br>
                            <strong>Fag erstattet: </strong> ***REMOVED***capitalizeFirstLetter(review.equivalent.join(", "))} <br></br>
                            <strong>Kommentar: </strong> ***REMOVED***review.comment} <br></br>
                        </p>
                    </div>

                    <div className="starRatings">
                        <div className="starR starDiff">
                            <strong>Vanskelighetsgrad: </strong> 
                            <span id="1" className=***REMOVED***review.difficulty >= 1 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className=***REMOVED***review.difficulty >= 2 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className=***REMOVED***review.difficulty >= 3 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className=***REMOVED***review.difficulty >= 4 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className=***REMOVED***review.difficulty == 5 ? "starYellow" : "starGrey"}>&#9733;</span>
                        </div>

                        <div className="starR starDiff">
                            <strong>Relevanse: </strong>
                            <span id="1" className=***REMOVED***review.relevance >= 1 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className=***REMOVED***review.relevance >= 2 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className=***REMOVED***review.relevance >= 3 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className=***REMOVED***review.relevance >= 4 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className=***REMOVED***review.relevance == 5 ? "starYellow" : "starGrey"}>&#9733;</span>
                        </div>

                        <div className="starR starDiff">
                            <strong>Likte faget: </strong>
                            <span id="1" className=***REMOVED***review.enjoyment >= 1 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className=***REMOVED***review.enjoyment >= 2 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className=***REMOVED***review.enjoyment >= 3 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className=***REMOVED***review.enjoyment >= 4 ? "starYellow" : "starGrey"}>&#9733;</span>
                            <span className=***REMOVED***review.enjoyment == 5 ? "starYellow" : "starGrey"}>&#9733;</span>
                        </div>
                    </div>

                </div>)
          ***REMOVED***)}
        </div>
    );
};
  
export default Reviews;