'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var NewJax = (function () {
  function NewJax(elm) {
    _classCallCheck(this, NewJax);

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

  _createClass(NewJax, [{
    key: 'registerEvents',
    value: function registerEvents() {
      var _this = this;

      var _loop = function (i) {
        var el = _this.anchors.item(i);
        el.addEventListener('click', function (e) {
          if (e.button === 0) {
            return;
          }
          if (event.preventDefault) {
            event.preventDefault();
          } else {
            event.returnValue = false;
          }

          _this.handle(el);
        });
      };

      for (var i = 0; i < this.anchors.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: 'handle',
    value: function handle(element) {
      var elm = this.elm;
      fetch(element.href, {
        method: 'get',
        headers: {
          'X-PJAX': true
        }
      }).then(function (response) {
        response.text();
      }).then(function (body) {
        elm.innerHTML = body;
        return;
      });
      this.changeUrl(element.href.replace(/^.*\/\/[^\/]+/, ''));
    }
  }, {
    key: 'changeUrl',
    value: function changeUrl(url) {
      window.history.pushState(null, null, url);
    }
  }]);

  return NewJax;
})();
//# sourceMappingURL=newjax.js.map