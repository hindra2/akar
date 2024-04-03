const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;
const saltRounds = 10;
