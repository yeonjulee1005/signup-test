"use strict"

const PORT = process.env.PORT || 3000;  // 환경변수에서 세팅한 값이 있을경우 그값으로 포트이동, 없으면 3000으로 연결

const app = require("../app");

app.listen(PORT, ( ) => {
  console.log("서버 가동");
});