
class NewJax {
  constructor(elm) {
    this.elm = elm;
    this.anchors = elm.querySelectorAll('a');
    this.registerEvents();
  }

  registerEvents() {
    for (var i = 0; i < this.anchors.length; i++) {
      let el = this.anchors.item(i);
      el.addEventListener('click', (e) => {
        e.preventDefault();
        this.handle(el);
      });
    }
  }

  handle(element) {
    let elm = this.elm;
    fetch(element.href, {
      method: 'get',
      headers: {
        'X-PJAX': true
      }
    }).then(function(response) {
      return response.text();
    }).then(function(body) {
      elm.innerHTML = body;
    });
  }
}
