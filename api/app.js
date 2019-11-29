const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// bring in the routers
const indexRouter = require("./routes/index");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const uploadRouter = require("./routes/upload");
const updateProfileRouter = require("./routes/updateProfile");

const app = express();

// add database connection
const { sequelize } = require("./db/sequelize");

// add schemas
const { User } = require("./models/user");
const { Recording } = require("./models/recording");

// making database sync
sequelize
    .sync(
        { force: true } // This command will drop the table and re-create it.
    )
    .then(
        function(err) {
            console.log("\n***** TABLES ARE CREATED *****\n");
        },
        function(err) {
            console.log("An error occurred while creating the table:", err);
        }
    );

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// invoke the routers
app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/upload", uploadRouter);
app.use("/updateprofile", updateProfileRouter);

module.exports = app;
