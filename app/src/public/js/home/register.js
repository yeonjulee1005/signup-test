"use strict";

const id = document.querySelector("#register-id"),
  name = document.querySelector("#register-username"),
  password = document.querySelector("#register-password"),
  confirmPassword = document.querySelector("#register-confirm-password"),
  registerBtn = document.querySelector("#submit");
registerBtn.addEventListener("click", register);

function register( ) {
  const req = {
    id: id.value,
    name: name.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };

  fetch("/register", {
    method: "POST",
    headers: {
      "content-Type": "application/json"
    },
    body: JSON.stringify(req)
  })
    .then((res) => res.json())  // json 형식으로 요청 받음
    .then((res) => {  // 그런 후에 요청이 성공했으면 url 이동, 실패하면 메시지 띄우기
      if (res.success) {
        location.href = "/login";
      } else {
        alert(res.msg);
      }
    })
    // 에러 캐치 구간
    .catch((err) => {
      console.error(new Error("회원가입 중 에러 발생"))
    })
};
