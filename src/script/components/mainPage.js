class mainPage {
  check() {
    if (localStorage.getItem("token")) {
      localStorage.setItem("channel", "C6CS9BNG3");
      this.render();
      this.Handlers();
      this.userInfo();
      this.loadhistoryMessage();
      this.loadUsers();
    } else {
      let code = location.href;
      code = code.split("?");
      code = code.splice(1, 1);
      code = String(code);
      code = code.slice(5).split("&")[0];
      fetch(
        `https://slack.com/api/oauth.access?client_id=217857254422.216894611363&client_secret=73b8f39e3b53e9635094ae7ce4d1bf69&code=${code}`
      )
        .then(response => response.json())
        .then(data => {
          localStorage.setItem("channel", "C6CS9BNG3");
          let token = data.access_token;
          localStorage.setItem("token", `${token}`);
          localStorage.setItem("user", `${data.user_id}`);
          this.render();
          this.Handlers();
          this.userInfo();
          this.loadhistoryMessage();
          this.loadUsers();
        });
    }
  }

  render() {
    let place = document.querySelector("div");
    place.innerHTML = `
    <div class="conteiner">
    <div class="infoBox">
        <div class="userInfo">
            <span class="userName">name</span>
        </div>
        <div class="contacts">
 
        </div>
    </div>
    <div class="chat">
        <div class="control">
            <span class="nameGroup">nameGroup</span>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                <label class="mdl-button mdl-js-button mdl-button--icon" for="sample6">
                    <i class="material-icons">search</i>
                </label>
                <div class="mdl-textfield__expandable-holder">
                    <input class="mdl-textfield__input" type="text" id="sample6">
                    <label class="mdl-textfield__label" for="sample-expandable">Expandable Input</label>
                </div>
            </div>
        </div>
        <div class="workPlace">
            
        </div>
        <div class="inputMsg">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label myMdl-textfield">
                <textarea class="mdl-textfield__input sendMessage" type="text" id="sample3" ></textarea>
                <label class="mdl-textfield__label" for="sample3">Text...</label>
            </div>
        </div>
    </div>
</div>
     `;
  }
  Handlers() {
    document.querySelector(".sendMessage").addEventListener("keypress", e => {
      let key = e.which || e.keyCode;
      if (key === 13) {
        this.sendMessage();
      }
    });
  }
  sendMessage() {
    let message = document.querySelector(".sendMessage").value;
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    let channel = localStorage.getItem("channel");
    if (message) {
      console.log(message);
      fetch(
        `https://slack.com/api/chat.postMessage?token=${token}&channel=${channel}&text=${message}&as_user=${user}&username=${user}&pretty=1`
      ).then((document.querySelector(".sendMessage").value = ""));
    }
  }
  userInfo() {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    fetch(
      `https://slack.com/api/users.info?token=${token}&user=${user}&pretty=1`
    )
      .then(response => response.json())
      .then(data => {
        document.querySelector(".userName").innerHTML = data.user.name;
      });
  }
  loadhistoryMessage() {
    let token = localStorage.getItem("token");
    let channel = localStorage.getItem("channel");
    let user = localStorage.getItem("user");
    let img;
    fetch(
      `https://slack.com/api/users.info?token=${token}&user=${user}&pretty=1`
    )
      .then(response => response.json())
      .then(data => (img = data.user.profile.image_32))
      .then(
        fetch(
          `https://slack.com/api/channels.history?token=${token}&channel=${channel}&count=10&pretty=1`
        )
          .then(response => response.json())
          .then(data => {
            let fealdMessage = document.querySelector(".workPlace");
            let leng = data.messages.length - 1;
            let msg;
            let index;
            fealdMessage.innerHTML = "";
            do {
              if (localStorage.getItem("user") == data.messages[leng].user) {
                msg = data.messages[leng].text;
                fealdMessage.innerHTML += ` <div class="myMsg"> ${msg} <img src=${img} width="40" height="40" ></div>`;
              } else {
                msg = data.messages[leng].text;
                fealdMessage.innerHTML += `<div class="opponentMsg"><img src="slackIcon.png" width="40" height="40"  > ${msg}</div>`;
              }
              leng = leng - 1;
            } while (leng >= 0);
          })
      )
      .then(() => {
        let ur;
        let fealdMessage = document.querySelector(".workPlace");
        fetch(`https://slack.com/api/rtm.connect?token=${token}&pretty=1`)
          .then(response => response.json())
          .then(data => {
            ur = data.url;
          })
          .then(() => {
            let message;
            let ws = new WebSocket(`${ur}`);
            ws.onopen = function() {};

            ws.onmessage = function(event) {
              let TypeMessage = JSON.parse(event.data);
              TypeMessage = TypeMessage.type;
              if (TypeMessage == "message") {
                message = JSON.parse(event.data);
                if (localStorage.getItem("channel") == message.channel) {
                  if (localStorage.getItem("user") == message.user) {
                    fealdMessage.innerHTML += ` <div class="myMsg">${message.text} <img src=${img} width="40" height="40" ></div>`;
                  } else {
                    fealdMessage.innerHTML += `<div class="opponentMsg"><img src="slackIcon.png" width="40" height="40"  > ${message.text}</div>`;
                  }
                }

                // console.log(message.user);
                // console.log(message.channel);
                // console.log(message.text);
              }
            };
          });
      });
  }
  loadUsers() {
    let userId;
    let userName;
    let img;
    let placeRender = document.querySelector(".contacts");
    fetch(
      `https://slack.com/api/users.list?token=${localStorage.getItem(
        "token"
      )}&pretty=1`
    )
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.members.length; i++) {
          console.log(data.members[i]);
          userId = data.members[i].id;
          userName = data.members[i].name;
          img = data.members[i].profile.image_32;
          placeRender.innerHTML += ` <span class="mdl-chip mdl-chip--contact mdl-chip--deletable ${userId}">
                <img class="mdl-chip__contact" src="${img}">
                <span class="mdl-chip__text">${userName}</span>
                    </span>`;
        }
      });
  }
}
export default mainPage;
