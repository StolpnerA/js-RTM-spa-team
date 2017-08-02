class mainPage {
  check() {
    if (localStorage.getItem("token")) {
      localStorage.getItem("channel") ||
        localStorage.setItem("channel", "C6CS9BNG3");
      Promise.resolve()
        .then(this.render())
        .then(this.Handlers())
        .then(this.userInfo())
        .then(() => {
          this.loadhistoryMessage();
        })
        .then(this.loadUsers())
        .then(this.channelList())
        .then(this.wsMsg());
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
          Promise.resolve()
            .then(this.render())
            .then(this.Handlers())
            .then(this.userInfo())
            .then(this.loadhistoryMessage())
            .then(this.loadUsers())
            .then(this.channelList())
            .then(this.wsMsg());
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
        <div class = "channels">
          Channels: 
        </div>
        <div class="contacts">
          Contacts: 
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
        e.preventDefault();
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
        document.querySelector(".userName").innerHTML = `<img src="${data.user
          .profile.image_32}"> ${data.user.name}`;
      });
  }

  loadhistoryMessage() {
    let token = localStorage.getItem("token");
    let channel = localStorage.getItem("channel");
    let user = localStorage.getItem("user");
    let img;
    let name;
    fetch(
      `https://slack.com/api/channels.history?token=${token}&channel=${channel}&count=10&pretty=1`
    )
      .then(response => response.json())
      .then(data => {
        fetch(`https://slack.com/api/users.list?token=${token}&pretty=1`)
          .then(response => response.json())
          .then(userInfo => {
            let fealdMessage = document.querySelector(".workPlace");
            let leng = data.messages.length - 1;
            let msg;
            let index;
            fealdMessage.innerHTML = "";
            do {
              if (localStorage.getItem("user") == data.messages[leng].user) {
                for (let i = 0; i < userInfo.members.length; i++) {
                  if (userInfo.members[i].id == localStorage.getItem("user")) {
                    name = userInfo.members[i].name;
                    img = userInfo.members[i].profile.image_32;
                  }
                }
                msg = data.messages[leng].text;
                fealdMessage.innerHTML += ` <div class="myMsg"><span class="name">${name}</span> <br> ${msg} <img class = "myImgCss" src=${img} width="40" height="40"></div>`;
              } else {
                for (let i = 0; i < userInfo.members.length; i++) {
                  if (userInfo.members[i].id == data.messages[leng].user) {
                    name = userInfo.members[i].name;
                    img = userInfo.members[i].profile.image_32;
                  }
                }
                msg = data.messages[leng].text;
                fealdMessage.innerHTML += `<div class="opponentMsg"><span class="name">${name}</span> <br> <img class = "myImgCss" src="${img}" width="40" height="40"  > ${msg}</div>`;
              }
              leng = leng - 1;
            } while (leng >= 0);
          });
      });
  }

  loadUsers() {
    let userId;
    let userName;
    let img;
    let divContacts = document.querySelector(".contacts");
    fetch(
      `https://slack.com/api/users.list?token=${localStorage.getItem(
        "token"
      )}&pretty=1`
    )
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.members.length; i++) {
          userId = data.members[i].id;
          userName = data.members[i].name;
          img = data.members[i].profile.image_32;
          divContacts.innerHTML += ` <span class="mdl-chip mdl-chip--contact mdl-chip--deletable user_${userId} userName_${userName}">
                <img class="mdl-chip__contact user_${userId} userName_${userName}" src="${img}">
                <span class="mdl-chip__text user_${userId} userName_${userName}">${userName}</span>
                    </span>`;
        }
      })
      .then(() => this.heandlerMsgUsersClick(divContacts));
  }

  channelList() {
    let token = localStorage.getItem("token");
    let channelId, channelName;
    let divChannels = document.querySelector(".channels");
    fetch(`https://slack.com/api/channels.list?token=${token}&pretty=1`)
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.channels.length; i++) {
          if (data.channels[i].is_archived == false) {
            channelId = data.channels[i].id;
            channelName = data.channels[i].name;
            divChannels.innerHTML += `<span class="mdl-chip mdl-chip--contact mdl-chip--deletable channel_${channelId} channelName_${channelName}">
          <img class="mdl-chip__contact channel_${channelId} channelName_${channelName}" src="">
          <span class="mdl-chip__text channel_${channelId} channelName_${channelName}">${channelName}</span>
           <button type="button" class="mdl-chip__action"><i class="material-icons myCross channel_${channelId}">cancel</i></button>
                    </span>`;
          }
        }
      })
      .then(() => this.heandlerChannelsClick(divChannels));
  }

  wsMsg() {
    let ur;
    let data;
    let fealdMessage = document.querySelector(".workPlace");
    let token = localStorage.getItem("token");
    let img;
    let user = localStorage.getItem("user");
    let userName;

    fetch(`https://slack.com/api/rtm.connect?token=${token}&pretty=1`)
      .then(response => response.json())
      .then(data => {
        ur = data.url;
      })
      .then(() => {
        let message;
        let ws = new WebSocket(`${ur}`);
        let name;
        ws.onopen = function() {};
        ws.onmessage = function(event) {
          let TypeMessage = JSON.parse(event.data);

          if (TypeMessage.type == "channel_created") {
            let channelId = TypeMessage.channel.id;
            let channelName = TypeMessage.channel.name;
            let divChannels = document.querySelector(".channels");
            divChannels.innerHTML += `<span class="mdl-chip mdl-chip--contact mdl-chip--deletable channel_${channelId} channelName_${channelName}">
          <img class="mdl-chip__contact channel_${channelId} channelName_${channelName}" src="">
          <span class="mdl-chip__text channel_${channelId} channelName_${channelName}">${channelName}</span>
           <button type="button" class="mdl-chip__action"><i class="material-icons myCross channel_${channelId}">cancel</i></button>
                    </span>`;
          }
          TypeMessage = TypeMessage.type;
          if (TypeMessage == "message") {
            message = JSON.parse(event.data);
            if (message.ts == "1501544614.596385") {
              return;
            }
            userName = message.user;
            fetch(
              `https://slack.com/api/users.info?token=${token}&user=${userName}&pretty=1`
            )
              .then(response => response.json())
              .then(data => {
                name = data.user.name;
                img = data.user.profile.image_32;
                if (localStorage.getItem("channel") == message.channel) {
                  if (localStorage.getItem("user") == message.user) {
                    fealdMessage.innerHTML += ` <div class="myMsg"><span class="name">${name}</span><br>${message.text} <img class = "myImgCss" src="${img}" width="40" height="40" ></div>`;
                  } else {
                    fealdMessage.innerHTML += `<div class="opponentMsg"><span class="name">${name}</span><br><img class = "myImgCss" src="${img}" width="40" height="40"  > ${message.text}</div>`;
                  }
                }
              });
          }
        };
      });
  }

  heandlerChannelsClick(divChannels) {
    divChannels.addEventListener("click", e => {
      let target = e.target;
      if (target.tagName == "I") {
        let className = target.className;
        let token = localStorage.getItem("token");
        className = className.split("channel_")[1];
        let del = document
          .querySelectorAll(`.channel_${className}`)[0]
          .remove();

        fetch(
          `https://slack.com/api/channels.archive?token=${token}&channel=${className}&pretty=1`
        ).then(
          fetch(
            `https://slack.com/api/channels.leave?token=${token}&channel=${className}&pretty=1`
          )
        );
      }
      if (target.tagName == "SPAN" || target.tagName == "IMG") {
        let className = target.className;
        className = className.split("channel_")[1];
        localStorage.setItem(
          "channel",
          className.split("channelName_")[0].slice(0, -1)
        );
        let nameGroupTag = document.querySelector(".nameGroup");
        let channelName = className.split("channelName_")[1];
        nameGroupTag.innerHTML = "# " + channelName;
        fetch(
          `https://slack.com/api/channels.join?token=${localStorage.getItem(
            "token"
          )}&name=${channelName}&pretty=1`
        ).then(this.loadhistoryMessage());
      }
    });
  }
  heandlerMsgUsersClick(divContacts) {
    divContacts.addEventListener("click", e => {
      let target = e.target;
      if (target.tagName == "SPAN" || target.tagName == "IMG") {
        let className = target.className;
        className = className.split("user_")[1];
        localStorage.setItem(
          "channel",
          className.split("userName_")[0].slice(0, -1)
        );
        let nameGroupTag = document.querySelector(".nameGroup");
        let channelName = className.split("userName_")[1];
        nameGroupTag.innerHTML = "@ " + channelName;
        this.loadhistoryMessage();
      }
    });
  }
}

export default mainPage;
