export default class NewJax {
  constructor(elm) {
    if (elm && elm.nodeType) {
      this.elm = elm;
      this.anchors = elm.querySelectorAll('a');
      if (!!(window.history && window.history.pushState)) {
        this.registerEvents();
      }
    } else {
      throw new TypeError('Invalid argument passed to NewJax');
    }
  }

  registerEvents() {
    for (let i = 0; i < this.anchors.length; i++) {
      let el = this.anchors.item(i);
      el.addEventListener('click', (e) => {
        if (e.button === 0) {
          return;
        }
        if (event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue = false;
        }

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
    }).then((response) => {
      response.text();
    }).then((body) => {
      elm.innerHTML = body;
      return;
    });
    this.changeUrl(element.href.replace(/^.*\/\/[^\/]+/, ''));
  }

  changeUrl(url) {
    window.history.pushState(null, null, url);
  }
}
