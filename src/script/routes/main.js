import MainPage from "../components/MainPage";
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
