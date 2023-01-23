import React from "react";
  

function capitalizeFirstLetter(string) ***REMOVED***
    return string == undefined ? "" :  string.charAt(0).toUpperCase() + string.slice(1);
***REMOVED***

function computeAverage(reviews, par) ***REMOVED***
    var numReviews = 0;
    var score = 0;
    for(var key in reviews) ***REMOVED***
        var review = reviews[key]
        console.log(review)
        numReviews ++;
        score += parseFloat(review[par]);
  ***REMOVED***

    return Number((score/numReviews).toFixed(2))
}


const Reviews = (***REMOVED***reviews}) => ***REMOVED***
    if(reviews.length==0) return ""
    const sortedReviews = reviews.sort((a,b) => ***REMOVED***
        if(a.timestamp <b.timestamp) ***REMOVED***
            return -1
      ***REMOVED***
  ***REMOVED***)

    return (
        <div className="reviewsDiv">
            <h1 className="centerHeader">Vurderinger</h1>

            <div className="averageDiv">
                <h3>Gjennomsnitt:</h3>
                <p>
                    <strong>Vanskelighetsgrad: </strong> ***REMOVED***computeAverage(reviews, "difficulty")}/5<br></br>
                    <strong>Relevanse: </strong> ***REMOVED***computeAverage(reviews, "relevance")}/5<br></br>
                    <strong>Likte faget: </strong> ***REMOVED***computeAverage(reviews, "enjoyment")}/5<br></br>
                </p>
            </div>

            ***REMOVED***sortedReviews.map(review => ***REMOVED***
                return(<div className="review">
                    <div className="reviewInfo">
                        <p>
                            <strong>Når: </strong> ***REMOVED***capitalizeFirstLetter(review.semester)}<br></br>
                            <strong>Fagtype erstattet: </strong> ***REMOVED***capitalizeFirstLetter(review.type.join(", "))} <br></br>
                            <strong>Fag erstattet: </strong> ***REMOVED***capitalizeFirstLetter(review.equivalent.join(", "))} <br></br>
                            <strong>Kommentar: </strong> ***REMOVED***review.comment} <br></br>
                        </p>
                    </div>

                    <div className="starRatings">
                        <p>
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
                        </p>
                    </div>

                </div>)
          ***REMOVED***)}
        </div>
    );
};
  
export default Reviews;