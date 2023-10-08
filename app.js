const fileUpload = require("express-fileupload")
const cookieParser = require('cookie-parser');
const express = require("express");
const server = express();
server.use(cookieParser()); // Обработка cookies
server.use(fileUpload()); // Загрузка файлов на сервер
server.use(express.json()); // Обработка параметров в body
const path = require("path");

server.use('/public', express.static('public'));
const routes = require("./routes");
server.use("/", routes);
server.listen(3000);

server.set("views",path.join(__dirname,"views"));
server.set("view engine",'ejs');


// const express = require("express");
// const fileUpload = require("express-fileupload")
// const cookieParser = require('cookie-parser');
//
// const server = express();
// server.use(cookieParser()); // Обработка cookies
// server.use(fileUpload()); // Загрузка файлов на сервер
// server.use(express.json()); // Обработка параметров в body
// const groups = require('./groups.js');
// server.use('/groups', groups);
// server.listen(3000);