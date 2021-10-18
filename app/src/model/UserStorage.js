"use strict"

const db = require("../config/db");
class UserStorage {

  static getUserInfo(id) {
    // Promise 내부의 구문이 성공할 경우 resolve 실행 / 실패할 경우 reject 실행
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE id = ?;";
      db.query(
        query,
        [id], (err, data) => {
          if (err) { reject(`${err}`) };
          resolve(data[0])
      });
    });
  };

  static async save(userInfo) {  
    // Promise 내부의 구문이 성공할 경우 resolve 실행 / 실패할 경우 reject 실행
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users(id, name, password) VALUE(?, ?, ?);";
      db.query(
        query,
        [userInfo.id, userInfo.name, userInfo.password],
        (err) => {
          if (err) { reject(`${err}`) };
          resolve({ success: true });
      });
    });
  };

};

module.exports = UserStorage;



// 데이터 저장 (fs : file system) 프로미스를 사용하기위해 promises 사용
// const fs = require("fs").promises;

  // static getUsers(isAll, ...fields) {

  // }

  // 은닉한 데이터를 다른 곳에서 사용 할 수 있도록 (...은 필드 개수가 여러개일 수 있기 때문에 이렇게 보내는것.)
  // static getUsers(isAll, ...fields) {
    // 데이터를 fs 로 읽어옴, 에러랑 데이터를 콜백으로 던져서, 만약 에러가 있으면 에러를 던지고,
    // 아니면 데이터를 버퍼 16진수로 반환되는데, JSON.parse()로 부르면 우리가 알아 볼수 있게 변환됨
    // 즉 해당 경로는 db 경로가 되고, 최하단 json 파일은 해당 db의 테이블이다.
    // return fs
    //   .readFile("./src/databases/users.json")
    //   .then((data) => {
    //     return this.#getUsers(data, isAll, fields)
    //   }) // 위의 로직이 성공했을때 실행
    //   .catch(console.error); // 위의 로직이 에러났을때 실행
  // }

  // static getUserInfo(id) {
    // 데이터를 fs 로 읽어옴, 에러랑 데이터를 콜백으로 던져서, 만약 에러가 있으면 에러를 던지고,
    // 아니면 데이터를 버퍼 16진수로 반환되는데, JSON.parse()로 부르면 우리가 알아 볼수 있게 변환됨
    // 즉 해당 경로는 db 경로가 되고, 최하단 json 파일은 해당 db의 테이블이다.
    // return fs
    //   .readFile("./src/databases/users.json")
    //   .then((data) => {
    //     return this.#getUserInfo(data, id)
    //   }) // 위의 로직이 성공했을때 실행
    //   .catch(console.error); // 위의 로직이 에러났을때 실행
  // };

  // static async save(userInfo) {
    // db를 작성할때에는 항상 무조건 덮어쓰기 때문에, 데이터를 먼저 읽어 온 후
    // 그 데이터에 추가 하고 싶은 데이터를 추가한 뒤에
    // 데이터를 넣어야 됨! 모든 필드의 데이터 입력시, true 해야 함
    // const users = await this.getUsers(true);
    // // 만약에 db에 저장된 아이디를 입력하였을 경우 오류 표시
    // if (users.id.includes(userInfo.id)) {
    //   throw "이미 존재하는 아이디입니다."
    // }

    // // 유저가 입력한 데이터가 db에 저장된 아이디에 없으면 데이터를 저장하게 하는것
    // users.id.push(userInfo.id)
    // users.name.push(userInfo.name)
    // users.password.push(userInfo.password)

    // fs.writeFile("./src/databases/users.json", JSON.stringify(users));

    // return { success: true }


  // static #getUserInfo(data, id) {
  //   const users = JSON.parse(data)

  //   const idx = users.id.indexOf(id);
  //   const userKeys = Object.keys(users);  // -> [id, password, name]

  //   const userInfo = userKeys.reduce((newUser, info) => {
  //     newUser[info] = users[info][idx];
  //     return newUser;
  //   }, {});
  //   console.log(userInfo)
  //   return userInfo;
  // }

  // static #getUsers(data, isAll, fields) {
  //   const users = JSON.parse(data)
  //   if (isAll) { return users }

  //   const newUsers = fields.reduce((newUsers, field) => {
  //     if (users.hasOwnProperty(field)) {
  //       newUsers[field] = users[field];
  //     }
  //     return newUsers;
  //   }, {});
    
  //   return newUsers;
  // }
  // 