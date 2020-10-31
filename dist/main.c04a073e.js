// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var hashMap = JSON.parse(localStorage.getItem('x')) || [{
  url: 'developer.mozilla.org',
  logo: 'D',
  logoText: 'text'
}, {
  url: 'github.com',
  logo: 'G',
  logoText: 'text'
}];
var $lastLi = $('.lastLi');
var $liList = $('.siteList');

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('http://', '').replace('https://', '').replace('www.', '').replace(/\/.*/, '');
};

var createAndInsertLi = function createAndInsertLi(elements) {
  return $("<li>\n          <div class=\"site\">\n            <div class=\"logo\">\n              ".concat(elements.url[0], "\n            </div>\n            <div class=\"link\">\n              ").concat(elements.url, "\n            </div>\n            <div class=\"closeButton\">\n              <svg class=\"icon\">\n              <use xlink:href=\"#icon-close\"></use>\n              </svg>\n            </div>\n          </div>\n      </li>")).insertBefore($lastLi);
};

var render = function render() {
  $liList.find('li:not(.lastLi)').remove();
  hashMap.forEach(function (elements, index) {
    var $li = createAndInsertLi(elements);
    $li.on('click', function () {
      window.open('http://' + elements.url);
    });
    $li.on('click', '.closeButton', function (e) {
      hashMap.splice(index, 1);
      render();
      e.stopPropagation();
    });
  });
};

render();
$('.addButton').on('click', function () {
  var url = window.prompt('请输入要添加网站的网址');

  if (url !== '' && url !== null) {
    url = simplifyUrl(url);
    hashMap.push({
      url: url,
      logo: url[0],
      logoType: 'text'
    });
    render();
  }
});

window.onbeforeunload = function () {
  var stringHash = JSON.stringify(hashMap);
  localStorage.setItem('x', stringHash);
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.c04a073e.js.map