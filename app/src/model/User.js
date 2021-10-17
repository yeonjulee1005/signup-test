"use strict";

const UserStorage = require("./UserStorage");

class User {
 constructor(body) {
   this.body = body;
 }

 login() {
  const body = this.body;

  // this.body를 가져와서 body의 id 값(클라이언트가 입력한 id 값)을 UserStorage에 getUserInfo메소드로 전달함 (받아올 때는 id와 password 만 받아옴 더 받아오고 싶은 키값을 { } 안에 추가하면 됨)  
  const { id, password } = UserStorage.getUserInfo(body.id);

  // id와 password 검증!
  if (id) {
    if (id === body.id && password === body.password) {
      return { success: true};
    }
    return { success: false, msg: "비밀번호가 틀렸습니다."};
  }
  return { success: false, msg: "존재하지 않는 아이디 입니다."};
 };
};

module.exports = User;