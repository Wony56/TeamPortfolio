# Team 122

<img src="src/assets/mainlogo.png" width="300" height="300" align="center">

 Vue.js와 Firebase를 이용한 **팀 포트폴리오** 페이지 입니다. 사이트를 개발한 팀원들의 스킬 역량과 Git Commit 내역들을 볼 수 있고, 개발자 이외의 사람들은 자신의 포트폴리오나 글을 올릴 수 있습니다. 관리자 페이지도 구현되어 있으며, 사이트의 회원 가입 수, 접속 수, traffic 등 간단한 Dashboard를 확인할 수 있습니다. 또 회원 등급 조정 하거나 탈퇴 할 수 있습니다.



## 기획

​	Project 진행에 있어서 담당은 아래와 같이 구성하였습니다.

| 이름   | 역할           | 직책               |
| ------ | -------------- | ------------------ |
| 류호진 | 기획, 개발     | Project Manager    |
| 엄윤주 | 기획, 개발, QA | Developer/Designer |
| 김창윤 | 개발           | Developer          |
| 이석원 | 개발           | Developer          |
| 조현진 | 개발, QA       | Developer          |



## Architecture
["Architecture"](/product_specification/architecture.pnh)

### Front-end

 Front-end는 HTML과 CSS, Vue.js를 이용하여서 개발을 하였습니다. 이외에 Vuetify라는 Vue Component Framework를 이용하여 디자인을 하였습니다.



### Back-end

 Back-end는 Firebase의 Real-time database와 node.js 기반으로 개발을 하였습니다. PWA(Progressive Web App)을 사용했지만 정상적으로 동작하지 않아 해당 부분은 주석처리를 하였습니디ㅏ.



### Web Framework

 NAVER API 중 하나인 CAPTCHA를 사용하기 위해 EXPRESS 서버를 따로 두었습니다. 웹 사이트를 구동 하실 때 EXPRESS를 따로 실행시키지 않아도 무관합니다. 그러나 로그인 시 5번 이상 아이디나 비밀번호를 틀리게 된다면, 정상적으로 로그인이 되지 않는 문제가 발생할 수 있습니다. 





## Getting Started(실행방법)

 저희 Project는 **EXPRESS** 와 **VUE.js**를 연동하였습니다. EXPRESS는 NAVER에서 제공하는 CAPTCHA를 사용할 때 보안을 위하여 사용하였습니다. 사이트를 이용하실 때 실행하지 않아도 무방하나, 로그인 시 5번 이상 틀리게 될 경우 요청이 정상적으로 되지 않아 로그인이 안됩니다.



### Front-end / Back-end 분리

1. project를 받은 후, "npm install"을 통해 설치해 주십시오.
2. "webmobile-final\backend" 디렉토리로 이동하신 후, "npm install"을 통해 설치해 주십시오.
3. 다시 상위 디렉토리로 돌아와 "npm run serve" 명령어를 통해 Front-end를 실행해 주십시오.
4. "webmobile-final\backend" 디렉토리로 이동하신 후, "set DEBUG=myapp:* & npm start" 명령어를 통해 EXPRESS 서버를 실행해 주십시오. (MAC OS & LINUX : DEBUG=myapp:* npm start)
5. "localhost:8080" 으로 페이지가 정상작동 하는 것을 알 수 있습니다.



### Front-end & Back-end 통합

1. "webmobile-final", "webmobile-final\backend"에서 "npm install" 명령어를 입력합니다.
2. "webmobile-final"에서 npm build" 명령어를 입력 해주십시오.
3. "webmobile-final\backend" 디렉토리로 이동하신 후 "npm start" 명령어를 실행 해주십시오.
4. "localhost:3000" 으로 저희의 홈페이지를 확인 해보실 수 있습니다.



## QA

product_specification\Final Project_QA.xlsx 에서 확인할 수 있습니다.



## References

EXPRESS SERVER : https://expressjs.com/ko/starter/generator.html

Vue.js : https://vuejs.org/

Vuetify : https://vuetifyjs.com/ko/
