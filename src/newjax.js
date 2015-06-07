
class NewJax {
  constructor(elm) {
    this.elm = elm;
    this.anchors = elm.querySelectorAll('a');
    if (!!(window.history && window.history.pushState)) {
      this.registerEvents();
    }

  }

  registerEvents() {
    for (var i = 0; i < this.anchors.length; i++) {
      let el = this.anchors.item(i);
      el.addEventListener('click', (e) => {
        if (e.button === 0) {
          return;
        }
        if (event.preventDefault) {
          event.preventDefault()
        } else {
          event.returnValue = false;
        }

        this.handle(el);
      });
    }
  }

  handle(element) {
    let elm = this.elm;
    document.pushState
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
    let url = element.href.replace(/^.*\/\/[^\/]+/, '');

    window.history.pushState(null, null, url);
  }
}
