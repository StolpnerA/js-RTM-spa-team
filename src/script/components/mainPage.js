class mainPage {
  render() {
    let place = document.querySelector("div");
    place.innerHTML = `
    <div class="conteiner">
    <div class="infoBox">
        <div class="userInfo">
            <span>name</span>
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
                <textarea class="mdl-textfield__input" type="text" id="sample3"></textarea>
                <label class="mdl-textfield__label" for="sample3">Text...</label>
            </div>
        </div>
    </div>
</div>
     `;
  }
}
export default mainPage;
