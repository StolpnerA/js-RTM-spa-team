import MainPage from "../components/mainPage";
var main = {
  name: "main",
  match: text => text == "main",
  onBeforeEnter: () => {},
  onEnter: () => {
    let main = new MainPage();
    main.check();
  },
  onLeave: () => {}
};

export { main };
