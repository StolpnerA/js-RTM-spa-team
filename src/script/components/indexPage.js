class indexPage {
  renderPage() {
    let placeRender = document.querySelector("div");
    placeRender.innerHTML = `<div class="signIn">
    <a href="https://slack.com/oauth/authorize?scope=chat:write:user emoji:read channels:history channels:write channels:read 
            files:write:user groups:history groups:read groups:write usergroups:read users.profile:read users.profile:write users:write users:read&client_id=217857254422.216894611363">
        <img src="slackIcon.png" class="slackIcon"/>
    </a>
</div>`;
  }
}
export default indexPage;
