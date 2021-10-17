"use strict"

// 데이터 저장

class UserStorage {
  // 데이터 은닉화
  static #users = {
    id: ["woorimIT", "dlduswn87", "김팀장" ],
    password: ["1234", "11111", "123456"],
    name: ["우리밋", "나개발", "김팀장"]
  };

  // 은닉한 데이터를 다른 곳에서 사용 할 수 있도록 (...은 필드 개수가 여러개일 수 있기 때문에 이렇게 보내는것.)
  static getUsers(...fields) {
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    
    return newUsers;
  }

  static getUserInfo(id) {
    const users = this.#users;
    const idx = users.id.indexOf(id);
    const userKeys = Object.keys(users);  // -> [id, password, name]

    const userInfo = userKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  };

  static save(userInfo) {
    const users = this.#users;
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.password.push(userInfo.password);
    return { success: true};
  }
};

module.exports = UserStorage;