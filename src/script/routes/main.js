import mainPage from "../components/mainPage";
var main = {
  name: "main",
  match: text => text == "main",
  onBeforeEnter: () => {},
  onEnter: () => {
    let main = new mainPage();
    main.check();
  },
  onLeave: () => {}
};

export { main };
