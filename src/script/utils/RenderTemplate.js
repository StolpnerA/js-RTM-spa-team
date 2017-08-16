class RenderTemplate {
  compileTpl(template, data) {
    var ret = template;
    Object.keys(data).forEach(key => {
      ret = ret.replace(new RegExp("\\${" + key + "}", "g"), data[key]);
    });
    return ret;
  }
}

export default RenderTemplate;
