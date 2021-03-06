"use strict"

// 모듈
const express = require("express");
const app = express();

// 환경변수 config() 메소드를 통해서 동작함
// 어떠한 os 환경이더라도 동일한 변수를 가져올 수 있도록 하기위함!
const dotenv = require("dotenv");
dotenv.config();

// 라우팅
const home = require("./src/routes/home")


// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
//url을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우, 제대로 인식이 안되는 문제를 해결하는 것
app.use(express.urlencoded());


app.use("/", home); // use -> 미들웨어를 등록해주는 것

module.exports = app;