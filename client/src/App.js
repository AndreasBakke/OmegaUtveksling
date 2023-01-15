import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App
() ***REMOVED***
  const [data, setData, listItems] = React.useState(null);

  React.useEffect(() => ***REMOVED***
    fetch("/studieprogram")
      .then((res) => res.json())
      .then((data) => setData(data.message));
***REMOVED***, []);
  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Velkommen til NTNUtveksling</h1>
        <h2>Finn fag for ditt studieprogram</h2>
        <div className="Course-Menu">
          
          <span></span><br></br>
          <span></span><br></br><span></span><br></br>
          <p>***REMOVED***!data ? "loading..." : listItems}</p>
          <span></span><br></br>
          <span></span><br></br>
          <span></span><br></br>
        </div>

        <p>***REMOVED***!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;


