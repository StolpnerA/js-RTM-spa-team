import indexPage from "../components/indexPage";
var index = {
  name: "index",
  match: "",
  onBeforeEnter: () => console.log(`onBeforeEnter index`),
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
