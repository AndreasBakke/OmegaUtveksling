// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/studieprogram", (req, res) => ***REMOVED***
  res.json(***REMOVED*** message: ["Elektronisk systemdesign og innovasjon", "Kybernetikk og robotikk", "Datateknologi"]});
});

app.listen(PORT, () => ***REMOVED***
  console.log(`Server listening on $***REMOVED***PORT}`);
});