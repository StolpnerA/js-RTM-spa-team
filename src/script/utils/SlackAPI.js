class SlackAPI {
  constructor(token) {
    this.token = token;
  }

  checkTocken(token) {
    return fetch(`https://slack.com/api/auth.test?token=${token}&pretty=1`)
      .then(response => response.json())
      .then(data => {
        if (data.ok == false) {
          localStorage.removeItem("token");
          localStorage.removeItem("channel");
          localStorage.removeItem("user");
          location.hash = "";
          return Promise.reject();
        } else {
          this.token = token;
        }
      });
  }

  readLocalToken() {
    let token = localStorage.getItem("token");

    if (token == "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("channel");
      localStorage.removeItem("user");
      location.hash = "";
    }
    return token;
  }

  readRoomMessages(room, token) {
    token = token || this.token;
    let promise = fetch(
      `https://slack.com/api/im.history?token=${token}&channel=${room}&pretty=1`
    ).then(response => response.json());

    promise.then(() => localStorage.setItem("channel", room));

    return promise;
  }
}

export default SlackAPI;
