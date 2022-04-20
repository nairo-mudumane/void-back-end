const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3333;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes")(app);

app.listen(port, () => console.log(`http://localhost:${port}`));
