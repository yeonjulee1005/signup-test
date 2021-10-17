"use strict";

const id = document.querySelector("#login-id"),
  password = document.querySelector("#login-password"),
  loginBtn = document.querySelector("#submit");

loginBtn.addEventListener("click", login);

function login( ) {
  const req = {
    id: id.value,
    password: password.value
  };

  fetch("/login", {
    method: "POST",
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify(req)
  })
    .then((res) => res.json())  // json 형식으로 요청 받음
    .then((res) => {  // 그런 후에 요청이 성공했으면 url 이동, 실패하면 메시지 띄우기
      if (res.success) {
        location.href = "/";
      } else {
        alert(res.msg);
      }
    })
    // 에러 캐치 구간
    .catch((err) => {
      console.error(new Error("로그인 중 에러 발생"))
    })
};
