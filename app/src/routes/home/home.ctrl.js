"use strict"

const { response } = require("express");
const User = require("../../model/User");

const output = {
  hello: ( req, res ) => {
    res.render("home/index")
  },
  login: ( req, res ) => {
    res.render("home/login")
  },
  register: ( req, res ) => {
    res.render("home/register")
  }
}

const process = {
  login: async ( req, res) => {
    const user = new User(req.body);  // 클라이언트(유저)가 전달하는 리퀘스트 데이터를 넣어서 인스턴스화 함
    const response = await user.login();  // 유저가 login 함수를 호출하면 (user.js 에 async 하게 처리했으므로 여기도 async await 처리 필수)
    return res.json(response);  // 요청(id,password)값을 json 형태로 반환 함!
  },
  register: (req, res) => {
    const user = new User(req.body);  // 클라이언트(유저)가 전달하는 리퀘스트 데이터를 넣어서 인스턴스화 함
    const response = user.register();  // 유저가 register 함수를 호출하면
    return res.json(response);  // 요청(id,password)값을 json 형태로 반환 함!
  }
}


module.exports = {
  output,
  process
}