"use strict"

// 데이터 저장 (fs : file system) 프로미스를 사용하기위해 promises 사용
const fs = require("fs").promises;

class UserStorage {
  
  static #getUserInfo(data, id) {
    const users = JSON.parse(data)

    const idx = users.id.indexOf(id);
    const userKeys = Object.keys(users);  // -> [id, password, name]

    const userInfo = userKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});
    console.log(userInfo)
    return userInfo;
  }

  // 은닉한 데이터를 다른 곳에서 사용 할 수 있도록 (...은 필드 개수가 여러개일 수 있기 때문에 이렇게 보내는것.)
  static getUsers(...fields) {
    // const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    
    return newUsers;
  }

  static getUserInfo(id) {
    // 데이터를 fs 로 읽어옴, 에러랑 데이터를 콜백으로 던져서, 만약 에러가 있으면 에러를 던지고,
    // 아니면 데이터를 버퍼 16진수로 반환되는데, JSON.parse()로 부르면 우리가 알아 볼수 있게 변환됨
    // 즉 해당 경로는 db 경로가 되고, 최하단 json 파일은 해당 db의 테이블이다.
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUserInfo(data, id)
      }) // 위의 로직이 성공했을때 실행
      .catch(console.error); // 위의 로직이 에러났을때 실행
  };

  static save(userInfo) {
    // const users = this.#users;
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.password.push(userInfo.password);
    return { success: true};
  }
};

module.exports = UserStorage;