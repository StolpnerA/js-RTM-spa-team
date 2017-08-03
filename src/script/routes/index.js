import indexPage from "../components/indexPage";
var index = {
  name: "index",
  match: "",
  onBeforeEnter: () => {},
  onEnter: () => {
    if (localStorage.getItem("token")) {
      location.hash = "main";
    } else {
      let index = new indexPage();
      index.renderPage();
    }
  },
  onLeave: () => {}
};

export { index };
