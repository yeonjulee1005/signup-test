"use strict";

const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;

    // this.body를 가져와서 client의 id 값(클라이언트가 입력한 id 값)을 UserStorage에 getUserInfo메소드로 전달함
    // (받아올 때는 id와 password 만 받아옴 더 받아오고 싶은 키값을 { } 안에 추가하면 됨)  
    // fs (file system) 은 promiss 이기 때문 데이터를 전부 읽어 오지 않을 때 실행하게 되므로
    // 동기 처리인 async await 적으로 처리해야 함.
    const { id , password} = await UserStorage.getUserInfo(client.id);

    // id와 password 검증!
    if (id) {
      if (id === client.id && password === client.password) {
        return { success: true};
      }
      return { success: false, msg: "비밀번호가 틀렸습니다."};
    }
    return { success: false, msg: "존재하지 않는 아이디 입니다."};
  };

  async register() {
    const client = this.body;
    try {
    const response = await UserStorage.save(client); 
    return response;
    } catch (err) {
      return { success: false, msg: err}
    }
  };
};

module.exports = User;