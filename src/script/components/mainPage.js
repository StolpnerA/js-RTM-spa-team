class mainPage {
  check() {
    if (localStorage.getItem("token")) {
      localStorage.getItem("channel") ||
        localStorage.setItem("channel", "C6CS9BNG3");
      let token = localStorage.getItem("token");
      fetch(`https://slack.com/api/auth.test?token=${token}&pretty=1`)
        .then(response => response.json())
        .then(data => {
          if (data.ok == false) {
            localStorage.removeItem("token");
            localStorage.removeItem("channel");
            localStorage.removeItem("user");
            location.hash = "";
          }
        })
        .then(this.render())
        .then(this.Handlers())
        .then(this.userInfo())
        .then(() => {
          let choosingRoom = localStorage.getItem("channel");
          choosingRoom = choosingRoom.split("");
          if (choosingRoom[0] == "D") {
            let room = choosingRoom.join("");
            let token = localStorage.getItem("token");

            fetch(
              `https://slack.com/api/im.history?token=${token}&channel=${room}&pretty=1`
            )
              .then(response => response.json())
              .then(data => {
                localStorage.setItem("channel", room);
                let leng = data.messages.length - 1;
                let placeMsg = document.querySelector(".workPlace");
                let text;
                let name;
                let img;
                placeMsg.innerHTML = "";
                if (leng != -1) {
                  fetch(
                    `https://slack.com/api/users.list?token=${token}&pretty=1`
                  )
                    .then(response => response.json())
                    .then(userInfo => {
                      do {
                        text = data.messages[leng].text;
                        if (
                          localStorage.getItem("user") ==
                          data.messages[leng].user
                        ) {
                          for (let i = 0; i < userInfo.members.length; i++) {
                            if (
                              userInfo.members[i].id ==
                              localStorage.getItem("user")
                            ) {
                              name = userInfo.members[i].name;
                              img = userInfo.members[i].profile.image_32;
                            }
                          }
                          placeMsg.innerHTML += ` <div class="myMsg"><span class="name">${name}</span><br> <img class = "myImgCss myMsgImg" src="${img}" width="40" height="40" >  <div class="msg">${text}</div> </div>`;
                        } else {
                          for (let i = 0; i < userInfo.members.length; i++) {
                            if (
                              userInfo.members[i].id == data.messages[leng].user
                            ) {
                              name = userInfo.members[i].name;
                              img = userInfo.members[i].profile.image_32;
                            }
                          }
                          placeMsg.innerHTML += `<div class="opponentMsg"><span class="name">${name}</span><br><img class = "myImgCss opponentMsgImg" src="${img}" width="40" height="40"  > <div class="msg">${text}</div></div>`;
                          document.querySelector(".nameGroup").innerHTML =
                            "@" + name;
                        }
                        leng = leng - 1;
                      } while (leng >= 0);
                      placeMsg.scrollTop = placeMsg.scrollHeight;
                    });
                }
              });
          } else if (choosingRoom[0] == "C") {
            this.loadhistoryMessage();
          }
        })
        .then(() => this.loadUsers())
        .then(() => this.channelList())
        .then(() => this.wsMsg())
        .then(() => this.exit())
        .then(() => this.HandlerMenuChatBtn())
        .then(() => this.GetYandexMap());
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
            .then(this.wsMsg())
            .then(this.exit())
            .then(this.HandlerMenuChatBtn())
            .then(this.GetYandexMap());
        });
    }
  }

  render() {
    let place = document.querySelector("div.conteiner");
    place.innerHTML = `
    <div class="demo-layout-transparent mdl-layout mdl-js-layout">
        <div class="mdl-layout__drawer">
            <span class="mdl-layout-title">
                <div class="userInfo">
                    <span class="userName">name</span>
                    <i class="material-icons exit">exit_to_app</i>
                </div>
            </span>
            <nav class="mdl-navigation">
                <div class="infoBox">
                    <div class = "channels">
                        Channels:  <i class="material-icons dialog-button" id="addChannel">add_circle</i>
                    </div>
                    <div class="contacts">
                        Contacts: 
                    </div>
                </div>
            </nav>
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
                <i class="material-icons menuChat">add_box</i><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label myMdl-textfield">
                    <textarea class="mdl-textfield__input sendMessage" type="text" id="sample3" ></textarea>
                    <label class="mdl-textfield__label" for="sample3">Text...</label>
                </div>
            </div>
        </div>
    <main class="mdl-layout__content"></main>
    </div>
    <dialog id="dialogForNewChannel" class="mdl-dialog">
        <h3 class="mdl-dialog__title">Create new channel</h3>
        <div class="mdl-dialog__content">
            <input class="nameChannel" type="text" placeholder="Enter name channel">
        </div>
        <div class="mdl-dialog__actions">
            <button type="button" class="mdl-button">Close</button>
            <button type="button" class="mdl-button accept">Accept</button>
        </div>
     </dialog>
     <dialog id="dialogForChat" class="mdl-dialog">
        <h3 class="mdl-dialog__title">Menu</h3>
        <div class="mdl-dialog__content">
            <i class="material-icons location">my_location</i>
        </div>
        <div class="mdl-dialog__actions">
            <button type="button" class="mdl-button">Close</button>
        </div>
     </dialog>
     <dialog id="dialogForSetMap" class="mdl-dialog">
        <h3 class="mdl-dialog__title">Menu</h3>
        <div class="mdl-dialog__content myCssForMap">
           <div id="map"></div>
        </div>
        <div class="mdl-dialog__actions">
            <button type="button" class="mdl-button">Close</button>
        </div>
     </dialog>
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

  sendMessage(coords) {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    let channel = localStorage.getItem("channel");
    if (!coords) {
      let message = document.querySelector(".sendMessage").value;
      if (message) {
        message = message.replace(/\&/g, "%26");
        message = message.replace(/\?/g, "%20%3F");
        fetch(
          `https://slack.com/api/chat.postMessage?token=${token}&channel=${channel}&text=${message}&as_user=${user}&username=${user}&pretty=1`
        ).then((document.querySelector(".sendMessage").value = ""));
      }
    } else {
      coords = `<map> ${coords}`;
      fetch(
        `https://slack.com/api/chat.postMessage?token=${token}&channel=${channel}&text=${coords}&as_user=${user}&username=${user}&pretty=1`
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
    let fialdMessage = document.querySelector(".workPlace");
    let img;
    let name;
    fetch(
      `https://slack.com/api/channels.history?token=${token}&channel=${channel}&pretty=1`
    )
      .then(response => response.json())
      .then(data => {
        fetch(`https://slack.com/api/users.list?token=${token}&pretty=1`)
          .then(response => response.json())
          .then(userInfo => {
            let leng = data.messages.length - 1;
            fialdMessage.innerHTML = "";
            if (leng != -1) {
              do {
                var txt = data.messages[leng].text;
                txt = txt.replace(
                  /<(http.+?)>/g,
                  '<a href="$1" target="_blank">$1</a>'
                );

                if (txt.indexOf("&lt;map&gt;") == 0) {
                  txt = txt.split("&lt;map&gt;");
                  txt = txt.splice(1, 11).join(",");
                  txt = txt.split(",");
                  txt.push(leng);
                  let div = `<div id="mapSend${leng}" style="width: 100%; height: 200px"></div>`;
                  fialdMessage.innerHTML += ` <div class="myMsg"><span class="name">${name}</span> <br> <img class = "myImgCss myMsgImg" src=${img} width="40" height="40"> <div class="msg">${div}</div> </div>`;
                  this.sendCoords(txt);
                } else {
                  if (
                    localStorage.getItem("user") == data.messages[leng].user
                  ) {
                    for (let i = 0; i < userInfo.members.length; i++) {
                      if (
                        userInfo.members[i].id == localStorage.getItem("user")
                      ) {
                        name = userInfo.members[i].name;
                        img = userInfo.members[i].profile.image_32;
                      }
                    }
                    fialdMessage.innerHTML += ` <div class="myMsg"><span class="name">${name}</span> <br> <img class = "myImgCss myMsgImg" src=${img} width="40" height="40"> <div class="msg">${txt}</div> </div>`;
                  } else {
                    for (let i = 0; i < userInfo.members.length; i++) {
                      if (userInfo.members[i].id == data.messages[leng].user) {
                        name = userInfo.members[i].name;
                        img = userInfo.members[i].profile.image_32;
                      }
                    }
                    fialdMessage.innerHTML += `<div class="opponentMsg"><span class="name">${name}</span> <br> <img class = "myImgCss opponentMsgImg" src="${img}" width="40" height="40"  > <div class="msg">${txt}</div></div>`;
                  }
                }
                leng = leng - 1;
              } while (leng >= 0);
              fialdMessage.scrollTop = fialdMessage.scrollHeight;
            }
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
          <img class="mdl-chip__contact channel_${channelId} channelName_${channelName}" src="./img/group.png">
          <span class="mdl-chip__text channel_${channelId} channelName_${channelName}">${channelName}</span>
           <button type="button" class="mdl-chip__action"><i class="material-icons myCross channel_${channelId}" id="removeChannel">cancel</i></button>
                    </span>`;
          }
        }
        let nameGroup = document.querySelector(".nameGroup");
        for (let i = 0; i < data.channels.length; i++) {
          if (data.channels[i].id == localStorage.getItem("channel")) {
            nameGroup.innerHTML = data.channels[i].name_normalized;
          }
        }
      })
      .then(() => this.heandlerChannelsClick(divChannels));
  }

  wsMsg() {
    let ur;
    let data;
    let fialdMessage = document.querySelector(".workPlace");
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
        let globalThis = this;
        ws.onopen = function() {};
        ws.onmessage = function(event) {
          let TypeMessage = JSON.parse(event.data);
          if (TypeMessage.type == "channel_archive") {
            let channel = TypeMessage.channel;
            document.querySelector(`.channel_${channel}`).remove();
          }
          if (TypeMessage.type == "channel_created") {
            let channelId = TypeMessage.channel.id;
            let channelName = TypeMessage.channel.name;
            let divChannels = document.querySelector(".channels");
            divChannels.innerHTML += `<span class="mdl-chip mdl-chip--contact mdl-chip--deletable channel_${channelId} channelName_${channelName}">
          <img class="mdl-chip__contact channel_${channelId} channelName_${channelName}" src="./img/group.png">
          <span class="mdl-chip__text channel_${channelId} channelName_${channelName}">${channelName}</span>
           <button type="button" class="mdl-chip__action"><i class="material-icons myCross channel_${channelId}" id="removeChannel">cancel</i></button>
                    </span>`;
          }
          TypeMessage = TypeMessage.type;
          if (TypeMessage == "message") {
            message = JSON.parse(event.data);
            if (
              message.ts == "1501544614.596385" ||
              message.ts == "1501796123.395835"
            ) {
              return;
            }
            userName = message.user;
            fetch(
              `https://slack.com/api/users.info?token=${token}&user=${userName}&pretty=1`
            )
              .then(response => response.json())
              .then(data => {
                if (data.user == undefined) return;
                name = data.user.name;
                img = data.user.profile.image_32;
                let txt = message.text;
                txt = txt.replace(
                  /<(http.+?)>/g,
                  '<a href="$1" target="_blank">$1</a>'
                );
                if (txt.indexOf("&lt;map&gt;") == 0) {
                  txt = txt.split("&lt;map&gt;");
                  txt = txt.splice(1, 11).join(",");
                  txt = txt.split(",");
                  txt.push(message.ts);
                  let div = `<div id="mapSend${message.ts}" style="width: 100%; height: 200px"></div>`;
                  fialdMessage.innerHTML += ` <div class="myMsg"><span class="name">${name}</span> <br> <img class = "myImgCss myMsgImg" src=${img} width="40" height="40"> <div class="msg">${div}</div> </div>`;
                  globalThis.sendCoords(txt);
                } else {
                  if (localStorage.getItem("channel") == message.channel) {
                    if (localStorage.getItem("user") == message.user) {
                      fialdMessage.innerHTML += ` <div class="myMsg"><span class="name">${name}</span><br> <img class = "myImgCss myMsgImg" src="${img}" width="40" height="40" >  <div class="msg">${txt}</div> </div>`;
                    } else {
                      fialdMessage.innerHTML += `<div class="opponentMsg"><span class="name">${name}</span><br><img class = "myImgCss opponentMsgImg" src="${img}" width="40" height="40"  > <div class="msg">${txt}</div></div>`;
                    }
                    fialdMessage.scrollTop = fialdMessage.scrollHeight;
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
      if (target.tagName == "I" && target.id == "addChannel") {
        this.addNewChannel();
      }
      if (target.tagName == "I" && target.id == "removeChannel") {
        let className = target.className;
        let token = localStorage.getItem("token");
        className = className.split("channel_")[1];
        // let del = document
        //   .querySelectorAll(`.channel_${className}`)[0]
        //   .remove();

        fetch(
          `https://slack.com/api/channels.archive?token=${token}&channel=${className}&pretty=1`
        ).then(
          fetch(
            `https://slack.com/api/channels.leave?token=${token}&channel=${className}&pretty=1`
          )
            .then(localStorage.setItem("channel", "C6CS9BNG3"))
            .then(this.loadhistoryMessage())
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
    let token = localStorage.getItem("token");
    let room;
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
        fetch(`https://slack.com/api/im.list?token=${token}&pretty=1`)
          .then(response => response.json())
          .then(data => {
            let userId = className.split("userName_")[0].slice(0, -1);
            for (let i = 0; i < data.ims.length; i++) {
              if (userId == data.ims[i].user) {
                room = data.ims[i].id;
                fetch(
                  `https://slack.com/api/im.history?token=${token}&channel=${room}&pretty=1`
                )
                  .then(response => response.json())
                  .then(data => {
                    localStorage.setItem("channel", room);
                    let leng = data.messages.length - 1;
                    let placeMsg = document.querySelector(".workPlace");
                    let text;
                    let name;
                    let img;
                    placeMsg.innerHTML = "";
                    if (leng != -1) {
                      fetch(
                        `https://slack.com/api/users.list?token=${token}&pretty=1`
                      )
                        .then(response => response.json())
                        .then(userInfo => {
                          do {
                            text = data.messages[leng].text;
                            if (
                              localStorage.getItem("user") ==
                              data.messages[leng].user
                            ) {
                              for (
                                let i = 0;
                                i < userInfo.members.length;
                                i++
                              ) {
                                if (
                                  userInfo.members[i].id ==
                                  localStorage.getItem("user")
                                ) {
                                  name = userInfo.members[i].name;
                                  img = userInfo.members[i].profile.image_32;
                                }
                              }
                              placeMsg.innerHTML += ` <div class="myMsg"><span class="name">${name}</span><br> <img class = "myImgCss myMsgImg" src="${img}" width="40" height="40" >  <div class="msg">${text}</div> </div>`;
                            } else {
                              for (
                                let i = 0;
                                i < userInfo.members.length;
                                i++
                              ) {
                                if (
                                  userInfo.members[i].id ==
                                  data.messages[leng].user
                                ) {
                                  name = userInfo.members[i].name;
                                  img = userInfo.members[i].profile.image_32;
                                }
                              }
                              placeMsg.innerHTML += `<div class="opponentMsg"><span class="name">${name}</span><br><img class = "myImgCss opponentMsgImg" src="${img}" width="40" height="40"  > <div class="msg">${text}</div></div>`;
                            }
                            leng = leng - 1;
                          } while (leng >= 0);
                          placeMsg.scrollTop = placeMsg.scrollHeight;
                        });
                    }
                  });
              }
            }
          });
      }
    });
  }

  addNewChannel() {
    let dialog = document.querySelector("#dialogForNewChannel");
    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    } else dialog.showModal();
    dialog
      .querySelector("button:not([disabled])")
      .addEventListener("click", () => {
        dialog.close();
      });
    let acceptButton = dialog.querySelector(".accept");
    acceptButton.addEventListener("click", () => {
      let nameChannel = dialog.querySelector(".nameChannel");
      nameChannel = nameChannel.value;
      let token = localStorage.getItem("token");
      if (!nameChannel) return;
      fetch(
        `https://slack.com/api/channels.create?token=${token}&name=${nameChannel}&pretty=1`
      ).then(() => dialog.close());
    });
  }

  exit() {
    document.querySelector(".exit").addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("channel");
      localStorage.removeItem("user");
      location.hash = "";
    });
  }

  HandlerMenuChatBtn() {
    let btn = document.querySelector(".menuChat");
    let dialogInfoChat = document.querySelector("#dialogForChat");
    if (!dialogInfoChat.showModal) {
      dialogPolyfill.registerDialog(dialogInfoChat);
    }
    btn.addEventListener("click", () => {
      dialogInfoChat.showModal();
      let location = dialogInfoChat.querySelector(".location");
      location.addEventListener("click", () => {
        this.GetLocation();
        dialogInfoChat.close();
      });
    });
    dialogInfoChat
      .querySelector("button:not([disabled])")
      .addEventListener("click", () => {
        dialogInfoChat.close();
      });
  }

  GetLocation() {
    let dialogForSetMap = document.querySelector("#dialogForSetMap");
    if (!dialogForSetMap.showModal) {
      dialogPolyfill.registerDialog(dialogForSetMap);
    }
    dialogForSetMap.showModal();
    dialogForSetMap
      .querySelector("button:not([disabled])")
      .addEventListener("click", () => {
        dialogForSetMap.close();
      });
  }

  GetYandexMap() {
    ymaps.ready(init.bind(this));
    var myMap;

    function init() {
      myMap = new ymaps.Map(
        "map",
        {
          center: [53.902236, 27.56184], // Minsk
          zoom: 11,
          controls: [
            "zoomControl",
            "searchControl",
            "typeSelector",
            "geolocationControl"
          ]
        },
        {
          balloonMaxWidth: 150,
          searchControlProvider: "yandex#search"
        }
      );

      document.querySelector("#map").addEventListener("click", ev => {
        if (!ev.target.matches(".sendCoords")) return;
        /*СПРОСИТЬ У ВАСИЛИЯ  ЧТО ПРОВЕРЯЕТ УСЛОВИЕ*/
        if (myMap.balloon && myMap.balloon.onSendCoordsClick) {
          myMap.balloon.onSendCoordsClick();
        }
      });

      /**
             * Processing events that occur when the user
             * left-clicks anywhere on the map.
             * When such an event occurs, we open the balloon
             *
             */
      myMap.events.add("click", e => {
        if (!myMap.balloon.isOpen()) {
          var coords = e.get("coords");
          myMap.balloon.open(coords, {
            contentHeader: "Event",
            contentBody:
              "<p>Data to send.</p>" +
              "<p>This coordinates: " +
              [coords[0].toPrecision(6), coords[1].toPrecision(6)].join(", ") +
              "</p>" +
              `<button class="sendCoords">Send this coordinates</button>`
          });
          myMap.balloon.onSendCoordsClick = () => this.sendMessage(coords);
        } else {
          myMap.balloon.close();
        }
      });

      /**
             * Processing events that occur when the user
             * right-clicks anywhere on the map.
             * When such an event occurs, we display a popup hint
             * at the point of click.
             */
      myMap.events.add("contextmenu", function(e) {
        myMap.hint.open(e.get("coords"), "Someone right-clicked");
      });

      // Hiding the hint when opening the balloon.
      myMap.events.add("balloonopen", function(e) {
        myMap.hint.close();
      });
    }
  }

  sendCoords(coords) {
    ymaps.ready(init);
    var myMap, myPlacemark;

    function init() {
      myMap = new ymaps.Map(`mapSend${coords[2]}`, {
        center: [coords[0], coords[1]],
        zoom: 7,
        controls: []
      });

      myPlacemark = new ymaps.Placemark([coords[0], coords[1]], {
        balloonContent: "Я тут!"
      });

      myMap.geoObjects.add(myPlacemark);
    }
  }
}

export default mainPage;
