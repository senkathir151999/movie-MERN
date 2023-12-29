
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require('helmet');
const db = require("./db");
const config = require('./config/dev');
const app = express();
const routes = require("./routes");


const port = process.env.APP_PORT || 7007;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());
app.use(compression());

initDB();



app.use("/v1/", routes);

app.use(function (err, req, res, next) {
    // loggerModel.insertException(req.method + req.url, err.body, err.message);
    console.log(err.message);
    res.status(400).send(req.body)
});

//ALL API request that are not listed in the routes will show an Error Message.
app.all("*", (req, res) => {
    res.send("API Request Not Valid. Please check Again.");
});




async function initDB() {
    await db.init(config);
    initServer();
}

function initServer() {
    app.listen(port, () => {
        console.log("Server Started at PORT", port);
        // mailer({
        //     from: '"Server Started"<24/7courierservices@airlink.ae>',
        //     to: "vrayaroth.sanjay@gmail.com",
        //     subject: "enquiry",
        //     text: "Enquiry",
        //     html: "<br><b>API Started at PORT : </b>" + port,
        // });

    });
}



