import mainPage from "../components/mainPage";
var main = {
  name: "main",
  match: text => text === "main",
  onBeforeEnter: () => console.log(`onBeforeEnter index`),
  onEnter: () => {
    let main = new mainPage();
    main.render();
  },
  onLeave: () => {}
};

export { main };
