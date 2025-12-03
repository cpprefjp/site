/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 1239:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var cache = {};
var importAll = function importAll(r) {
  r.keys().forEach(function (key) {
    return cache[key] = r(key);
  });
};
importAll(__webpack_require__(1792));

/***/ }),

/***/ 9066:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Kunai: function() { return /* binding */ Kunai; }
});

// EXTERNAL MODULE: ../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(5841);
// EXTERNAL MODULE: ../node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(8102);
// EXTERNAL MODULE: ../node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(1705);
// EXTERNAL MODULE: ../node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(2099);
// EXTERNAL MODULE: ../node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(8183);
// EXTERNAL MODULE: ../node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(3467);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
;// ./kunai/compat.js
/* provided dependency */ var $ = __webpack_require__(5616);


var Compat = /*#__PURE__*/function () {
  function Compat(log, repo) {
    (0,classCallCheck/* default */.A)(this, Compat);
    this.log = log.makeContext('Compat');
    this.repo = [].concat(repo);
    this.log.info('applying...');

    // fake
    window.tree_onclick = function (e) {
      // do nothing
      e.stopPropagation();
      // return false
    };

    // real...
    $('.treespan').on('click', this.onTreeClick.bind(this));
    {
      var url = 'https://github.com/cpprefjp/site_generator/issues/47';
      var footer = $('body > footer');
      if (footer.length) {
        this.log.warn("applying legacy <footer> workaround... (".concat(url, ")"), footer[0]);
        footer.detach();
        $('main div[itemtype="http://schema.org/Article"]').append(footer);
      } else {
        this.log.warn("legacy <footer> not found. time to remove this workaround? (".concat(url, ")"));
      }
    }

    // $('#navbar-collapse ul.nav > li:nth-child(2) > a').text(repo.join('/'))

    this.log.info('applied.');
  } // constructor
  (0,createClass/* default */.A)(Compat, [{
    key: "onTreeClick",
    value: function onTreeClick(e) {
      e.stopPropagation();
      var self = $(e.currentTarget);
      self.parent('li').toggleClass('active');

      // let ul = self.siblings('ul')
      // this.log.debug('onTreeClick', e, self, ul)
      // ul.toggle()
    }
  }]);
  return Compat;
}(); // Compat

;// ./kunai/ui/badge.js
/* provided dependency */ var badge_$ = __webpack_require__(5616);
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var base_url = null;
var unresolved_links = [];
var badge_onDatabase = function onDatabase(db) {
  base_url = db.base_url.toString();
  for (var _i = 0, _unresolved_links = unresolved_links; _i < _unresolved_links.length; _i++) {
    var a_elem = _unresolved_links[_i];
    a_elem.attr('href', base_url.replace(/\/$/, '') + a_elem.attr('href'));
  }
  unresolved_links.length = 0;
};
var sanitize = function sanitize(badges) {
  var i = 0;
  var _iterator = _createForOfIteratorHelper(badges),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var b_raw = _step.value;
      ++i;
      var b = badge_$(b_raw);
      var b_classes = b.attr('class').split(/\s+/).map(function (t) {
        return t.trim();
      });
      var classes = [];
      // const clean_txt = b.text().trim().replace(/\(([^)]+)\)/, '$1')

      var deprecated_or_removed = false;
      var cppv = null;
      var named_version = null;
      var _iterator2 = _createForOfIteratorHelper(b_classes),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var c = _step2.value;
          if (/^(?:future|archive)$/.test(c)) {
            named_version = c;
            b.attr('data-named-version', c);
            classes.push('named-version-spec');
            continue;
          }
          var cppm = c.match(/^cpp(\d[\da-zA-Z])(.*)$/);
          if (!cppm) continue;
          b.attr('data-cpp-version', cppm[1]);
          if (cppm[1].length) {
            cppv = cppm[1];
          }
          if (c.match(/deprecated$/)) {
            deprecated_or_removed = true;
            classes.push('deprecated-spec');
          } else if (c.match(/removed$/)) {
            deprecated_or_removed = true;
            classes.push('removed-spec');
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      if (!deprecated_or_removed) {
        classes.push('added-in-spec');
      }
      b.addClass(classes.join(' '));
      var lang_path = cppv ? "/lang/cpp".concat(cppv) : named_version ? "/lang/".concat(named_version) : "/lang";
      var a_elem = badge_$('<a>', {
        href: "".concat(lang_path, ".html")
      }).append(badge_$('<i>'))
      // .append($('<span>').text(clean_txt))
      .appendTo(b.empty());
      if (base_url) a_elem.attr('href', base_url.replace(/\/$/, '') + a_elem.attr('href'));else unresolved_links.push(a_elem);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return i;
};

;// ./kunai/ui/tooltip.js



var Tooltip = /*#__PURE__*/function () {
  /**
   * ツールチップを構築します。
   * @param {Document} [_document] - 表示対象のドキュメント
   * @param {object} [config] - 設定
   */
  function Tooltip(_document, config) {
    (0,classCallCheck/* default */.A)(this, Tooltip);
    this.document = _document || document;
    this.view = this.document.defaultView || window;
    this.config = {
      horizontalMargin: 8,
      // (設定) ツールチップ配置時のビューポート横余白
      verticalMargin: 8,
      // (設定) ツールチップ配置時のビューポート縦余白
      verticalOffset: 2,
      // (設定) ツールチップと対象要素の縦の距離
      tooltipId: 'kunai-ui-tooltip',
      tooltipClassRevealed: 'kunai-ui-tooltip-revealed'
    };
    if (config) (0,esm_extends/* default */.A)(this.config, config);
    this.span = document.createElement('span');
    this.span.id = this.config.tooltipId;
    this.document.body.appendChild(this.span);
  }
  (0,createClass/* default */.A)(Tooltip, [{
    key: "_place",
    value: function _place(x, y) {
      // 物理ピクセル位置にぴったり合わせる
      var pixelRatio = this.view.devicePixelRatio;
      x = Math.round(x * pixelRatio) / pixelRatio;
      y = Math.round(y * pixelRatio) / pixelRatio;
      this.span.style.left = "".concat(x, "px");
      this.span.style.top = "".concat(y, "px");
      this.span.classList.add(this.config.tooltipClassRevealed);
    }

    /**
     * マウス位置および対象領域を元にして、ツールチップを適切な位置に表示します。
     * @param {string} desc - 表示する文字列
     * @param {number} mouseX - ビューポート内のマウス位置X 
     * @param {number} mouseY - ビューポート内のマウス位置Y
     * @param {DOMRect} rect - 表示対象オブジェクトの領域
     *
     */
  }, {
    key: "show",
    value: function show(desc, mouseX, mouseY, rect) {
      // 幾何情報の取得
      this.span.dataset.desc = desc;
      var tw = this.span.offsetWidth; // ツールチップの表示幅
      var th = this.span.offsetHeight; // ツールチップの表示高さ
      var vw = this.document.documentElement.clientWidth; // スクロールバーを除くビューポートの幅
      var vh = this.document.documentElement.clientHeight; // スクロールバーを除くビューポートの高さ

      // 位置の決定
      var x = Math.max(this.config.horizontalMargin, Math.min(vw - tw - this.config.horizontalMargin, mouseX));
      var y = rect.top - this.config.verticalOffset - th;
      if (y < this.config.verticalMargin) {
        y = rect.bottom + this.config.verticalOffset;
        if (y + th > vh - this.config.verticalMargin) y = mouseY + this.config.verticalOffset;
      }
      this._place(x, y);
    }

    /**
     * ツールチップを隠します。
     */
  }, {
    key: "hide",
    value: function hide() {
      this.span.classList.remove(this.config.tooltipClassRevealed);
    }
  }]);
  return Tooltip;
}();

;// ./kunai/ui/content.js
/* provided dependency */ var content_$ = __webpack_require__(5616);


function content_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = content_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function content_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return content_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return content_arrayLikeToArray(o, minLen); }
function content_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var _hitElementRects = function _hitElementRects(elem, x, y) {
  var _iterator = content_createForOfIteratorHelper(elem.getClientRects()),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var rect = _step.value;
      if (rect.left <= x && x <= rect.right && rect.top <= y && y <= rect.bottom) return rect;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return null;
};
var Content = /*#__PURE__*/function () {
  function Content(log) {
    (0,classCallCheck/* default */.A)(this, Content);
    this.log = log.makeContext('Content');
    this.log.debug('initializing...');
    this.log.debug("found ".concat(sanitize(content_$('main[role="main"] div[itemtype="http://schema.org/Article"] .content-body span.cpp')), " badges"));

    // 横幅を超える画像を横スクロール可能にするためにスクロール用のdivで囲む
    content_$('div[itemprop="articleBody"]').find('img').wrap('<div class="scrollable">');

    // ページ推移後にキーボードで画面スクロールするためにフォーカスを当てる
    content_$('main[role="main"] div[itemtype="http://schema.org/Article"]').trigger('focus');
    this.setupTooltip();
  }
  (0,createClass/* default */.A)(Content, [{
    key: "setupTooltip",
    value: function setupTooltip() {
      var tooltip = new Tooltip(document);
      var target = null;
      content_$('a[data-desc]').on({
        mouseover: function mouseover(e) {
          var rect = _hitElementRects(this, e.clientX, e.clientY);
          if (rect) {
            target = this;
            tooltip.show(this.dataset.desc, e.clientX, e.clientY, rect);
          }
        },
        mouseout: function mouseout() {
          if (this === target) {
            target = null;
            tooltip.hide();
          }
        }
      });
      var checkScroll = function checkScroll(e) {
        if (target !== null && !_hitElementRects(target, e.clientX, e.clientY)) {
          target = null;
          tooltip.hide();
        }
      };
      window.addEventListener('scroll', checkScroll, true);
      window.addEventListener('resize', checkScroll);
    }
  }]);
  return Content;
}();

// EXTERNAL MODULE: ../node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(7850);
// EXTERNAL MODULE: ../node_modules/crsearch/js/crsearch.js + 10 modules
var crsearch = __webpack_require__(2091);
;// ./kunai/ui/treeview.js
/* provided dependency */ var treeview_$ = __webpack_require__(5616);






function treeview_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = treeview_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function treeview_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return treeview_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return treeview_arrayLikeToArray(o, minLen); }
function treeview_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var DOM = /*#__PURE__*/function () {
  function DOM(log, kc) {
    (0,classCallCheck/* default */.A)(this, DOM);
    this.log = log.makeContext('DOM');
    this.kc = kc;
    this.lazyLoaders = new WeakMap();
    this.lastBranchID = 0;
    this.branchPrevs = new Map();
    this.indexElems = new WeakMap();
    this.topElems = new Map();

    // this.scrollIsAutoFired = false
  }
  (0,createClass/* default */.A)(DOM, [{
    key: "createContent",
    value: function () {
      var _createContent = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee(obj) {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.log.info("createContent '".concat(obj.self.id, "'"), obj);
                _context.t0 = obj.self.id.type;
                _context.next = _context.t0 === crsearch/* IndexType */.fo.header ? 4 : _context.t0 === crsearch/* IndexType */.fo.category ? 4 : _context.t0 === crsearch/* IndexType */.fo.module ? 4 : 7;
                break;
              case 4:
                _context.next = 6;
                return this.createHeaderContent(obj);
              case 6:
                return _context.abrupt("return", _context.sent);
              case 7:
                this.log.error('createContent', obj);
                throw new Error("unhandled index type in createContent");
              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function createContent(_x) {
        return _createContent.apply(this, arguments);
      }
      return createContent;
    }()
  }, {
    key: "createHeaderContent",
    value: function () {
      var _createHeaderContent = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee5(h) {
        var _this = this;
        var empty, elem, classes, classBatchSize, i, batch, batchElements, others, otherBatchSize, _i, _batch, _batchElements;
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // this.log.debug(`createHeaderContent (${h.self.id.join()})`, e, elem, h)
                empty = true;
                elem = this.indexElems.get(h.self);
                if (!(h.classes && h.classes.length)) {
                  _context5.next = 19;
                  break;
                }
                empty = false;
                classes = treeview_$('<ul>', {
                  class: 'classes'
                }).appendTo(elem); // バッチ処理で段階的に要素を追加
                classBatchSize = 10;
                i = 0;
              case 7:
                if (!(i < h.classes.length)) {
                  _context5.next = 19;
                  break;
                }
                batch = h.classes.slice(i, i + classBatchSize);
                _context5.next = 11;
                return Promise.all(batch.map(/*#__PURE__*/function () {
                  var _ref = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee2(c) {
                    return regenerator_default().wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return _this.makeClass(c);
                          case 2:
                            return _context2.abrupt("return", _context2.sent);
                          case 3:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));
                  return function (_x3) {
                    return _ref.apply(this, arguments);
                  };
                }()));
              case 11:
                batchElements = _context5.sent;
                classes.append(batchElements);

                // iOS Safariに処理時間を与える
                if (!(i + classBatchSize < h.classes.length)) {
                  _context5.next = 16;
                  break;
                }
                _context5.next = 16;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 0);
                });
              case 16:
                i += classBatchSize;
                _context5.next = 7;
                break;
              case 19:
                if (!(h.others && h.others.length)) {
                  _context5.next = 36;
                  break;
                }
                empty = false;
                others = treeview_$('<ul>', {
                  class: 'others'
                }).appendTo(elem); // バッチ処理で段階的に要素を追加
                otherBatchSize = 10;
                _i = 0;
              case 24:
                if (!(_i < h.others.length)) {
                  _context5.next = 36;
                  break;
                }
                _batch = h.others.slice(_i, _i + otherBatchSize);
                _context5.next = 28;
                return Promise.all(_batch.map(/*#__PURE__*/function () {
                  var _ref2 = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee3(o) {
                    return regenerator_default().wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _this.makeOther(o);
                          case 2:
                            return _context3.abrupt("return", _context3.sent);
                          case 3:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));
                  return function (_x4) {
                    return _ref2.apply(this, arguments);
                  };
                }()));
              case 28:
                _batchElements = _context5.sent;
                others.append(_batchElements);

                // iOS Safariに処理時間を与える
                if (!(_i + otherBatchSize < h.others.length)) {
                  _context5.next = 33;
                  break;
                }
                _context5.next = 33;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 0);
                });
              case 33:
                _i += otherBatchSize;
                _context5.next = 24;
                break;
              case 36:
                if (empty) {
                  elem.addClass('empty');
                }
                this.lazyLoaders.set(h.self, /*#__PURE__*/(0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee4() {
                  return regenerator_default().wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return _this.getHeader(h);
                        case 2:
                          return _context4.abrupt("return", _context4.sent);
                        case 3:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                })));
              case 38:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function createHeaderContent(_x2) {
        return _createHeaderContent.apply(this, arguments);
      }
      return createHeaderContent;
    }()
  }, {
    key: "getHeader",
    value: function () {
      var _getHeader = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee6(h) {
        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", true);
              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));
      function getHeader(_x5) {
        return _getHeader.apply(this, arguments);
      }
      return getHeader;
    }()
  }, {
    key: "doExpand",
    value: function () {
      var _doExpand = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee7(idx) {
        var elem;
        return regenerator_default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.lazyLoaders.get(idx)();
              case 2:
                elem = this.indexElems.get(idx); // let content_wrapper = elem.closest('.content-wrapper')
                // let content = content_wrapper.children('.content')
                // const wasExpanded = elem.hasClass('expanded')
                // const oldSt = content_wrapper.scrollTop()
                // const oldOfs = content.position().top
                // const oldTop = elem.position().top
                // this.log.debug(`(oldSt: ${oldSt}, oldOfs: ${oldOfs}, oldTop: ${oldTop})`)
                elem.toggleClass('expanded');

                // if (wasExpanded) {
                // const newSt = content_wrapper.scrollTop()
                // const newOfs = content.position().top
                // const newTop = elem.position().top
                // this.log.debug(`(newSt: ${newSt}, newOfs: ${newOfs}, newTop: ${newTop})`)
                // this.scrollIsAutoFired = true
                // content_wrapper.animate({
                // scrollTop: oldTop,
                // }, 1)
                // }
              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function doExpand(_x6) {
        return _doExpand.apply(this, arguments);
      }
      return doExpand;
    }()
  }, {
    key: "doStackExpand",
    value: function () {
      var _doStackExpand = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee8(topID) {
        var _iterator, _step, _step$value, id, e;
        return regenerator_default().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                // this.log.debug(`doStackExpand '${topID}'`, topID)
                _iterator = treeview_createForOfIteratorHelper(this.topElems);
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    _step$value = (0,slicedToArray/* default */.A)(_step.value, 2), id = _step$value[0], e = _step$value[1];
                    if (id === topID) {
                      e.toggleClass('expanded');
                    } else {
                      e.removeClass('expanded');
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function doStackExpand(_x7) {
        return _doStackExpand.apply(this, arguments);
      }
      return doStackExpand;
    }()
  }, {
    key: "scrollAt",
    value: function () {
      var _scrollAt = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee9(idx) {
        var e, broot, croot, wrapper;
        return regenerator_default().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this.log.info("scrollAt '".concat(idx.id.join(), "'"), idx.id);
                e = this.indexElems.get(idx);
                broot = e.closest('.kunai-branch');
                croot = broot.closest('.content');
                wrapper = croot.closest('.content-wrapper'); // this.log.debug(`wrapper`, wrapper)
                // this.log.debug(`pos`, broot.position().top, croot.position().top, e.position().top, e.children('.expandbar').position().top)
                wrapper.animate({
                  scrollTop: Math.max(e.position().top - 24, 0)
                }, 1);
              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
      function scrollAt(_x8) {
        return _scrollAt.apply(this, arguments);
      }
      return scrollAt;
    }()
  }, {
    key: "kunaiBranch",
    value: function () {
      var _kunaiBranch = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee10(me, branchFor, scrollHandler) {
        var elem;
        return regenerator_default().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                elem = treeview_$('<div>', {
                  class: 'kunai-branch',
                  'data-branch-id': this.lastBranchID++,
                  'data-branch-for': branchFor
                }).append(me.addClass('branch'));
                if (scrollHandler) {
                  elem.prepend(treeview_$('<div>', {
                    class: 'preview'
                  }));
                  elem.scroll(scrollHandler);
                }
                return _context10.abrupt("return", elem);
              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
      function kunaiBranch(_x9, _x10, _x11) {
        return _kunaiBranch.apply(this, arguments);
      }
      return kunaiBranch;
    }()
  }, {
    key: "makeTitle",
    value: function () {
      var _makeTitle = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee11(top) {
        return regenerator_default().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", top.root ? treeview_$('<a>', {
                  class: 'title',
                  href: top.root.url(),
                  title: top.category.name
                }).text(top.category.name) : treeview_$('<a>', {
                  class: 'title',
                  title: top.category.name
                }).text(top.category.name));
              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));
      function makeTitle(_x12) {
        return _makeTitle.apply(this, arguments);
      }
      return makeTitle;
    }()
  }, {
    key: "makeArticle",
    value: function () {
      var _makeArticle = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee12(idx) {
        var li;
        return regenerator_default().wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                li = treeview_$('<li>', {
                  class: 'article'
                }).append(treeview_$('<a>', {
                  href: idx.url()
                }).text(idx.id.join()));
                this.indexElems.set(idx, li);
                return _context12.abrupt("return", li);
              case 3:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
      function makeArticle(_x13) {
        return _makeArticle.apply(this, arguments);
      }
      return makeArticle;
    }()
  }, {
    key: "makeMember",
    value: function () {
      var _makeMember = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee13(m) {
        var li;
        return regenerator_default().wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.t0 = treeview_$('<li>', {
                  class: 'member classy'
                });
                _context13.t1 = treeview_$('<a>', {
                  href: m.url()
                });
                _context13.next = 4;
                return m.join_html(DOM.crOptions);
              case 4:
                _context13.t2 = _context13.sent;
                _context13.t3 = _context13.t1.html.call(_context13.t1, _context13.t2);
                li = _context13.t0.append.call(_context13.t0, _context13.t3);
                this.indexElems.set(m, li);
                if (this.kc.getPriorityForIndex(m).index !== this.kc.prioSpecials.get('__functions__').index) {
                  li.addClass('special');
                }
                return _context13.abrupt("return", li);
              case 10:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));
      function makeMember(_x14) {
        return _makeMember.apply(this, arguments);
      }
      return makeMember;
    }()
  }, {
    key: "makeClass",
    value: function () {
      var _makeClass = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee15(c) {
        var _this2 = this;
        var li, members;
        return regenerator_default().wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                li = treeview_$('<li>', {
                  class: 'class classy'
                });
                this.indexElems.set(c.self, li);
                _context15.t0 = treeview_$('<a>', {
                  class: 'self'
                }).attr('href', c.self.url());
                _context15.next = 5;
                return c.self.join_html(DOM.crClassOptions);
              case 5:
                _context15.t1 = _context15.sent;
                _context15.t0.html.call(_context15.t0, _context15.t1).appendTo(li);
                if (c.self.cpp_version) {
                  li.attr('data-cpp-version', c.self.cpp_version);
                }
                if (!(c.members && c.members.length)) {
                  _context15.next = 17;
                  break;
                }
                members = treeview_$('<ul>', {
                  class: 'members'
                }).appendTo(li);
                _context15.t2 = members;
                _context15.next = 13;
                return Promise.all(c.members.map(/*#__PURE__*/function () {
                  var _ref4 = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee14(m) {
                    return regenerator_default().wrap(function _callee14$(_context14) {
                      while (1) {
                        switch (_context14.prev = _context14.next) {
                          case 0:
                            _context14.next = 2;
                            return _this2.makeMember(m);
                          case 2:
                            return _context14.abrupt("return", _context14.sent);
                          case 3:
                          case "end":
                            return _context14.stop();
                        }
                      }
                    }, _callee14);
                  }));
                  return function (_x16) {
                    return _ref4.apply(this, arguments);
                  };
                }()));
              case 13:
                _context15.t3 = _context15.sent;
                _context15.t2.append.call(_context15.t2, _context15.t3);
                _context15.next = 17;
                break;
              case 17:
                return _context15.abrupt("return", li);
              case 18:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));
      function makeClass(_x15) {
        return _makeClass.apply(this, arguments);
      }
      return makeClass;
    }()
  }, {
    key: "makeOther",
    value: function () {
      var _makeOther = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee16(o) {
        var li;
        return regenerator_default().wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                li = treeview_$('<li>', {
                  class: "other ".concat(o.id.type)
                });
                this.indexElems.set(o, li);
                if (crsearch/* IndexID */.ku.isClassy(o.id.type)) {
                  li.addClass('classy');
                }
                _context16.t0 = li;
                _context16.t1 = treeview_$('<a>').attr('href', o.url());
                _context16.next = 7;
                return o.join_html(DOM.crOptions);
              case 7:
                _context16.t2 = _context16.sent;
                _context16.t3 = _context16.t1.html.call(_context16.t1, _context16.t2);
                return _context16.abrupt("return", _context16.t0.append.call(_context16.t0, _context16.t3));
              case 10:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));
      function makeOther(_x17) {
        return _makeOther.apply(this, arguments);
      }
      return makeOther;
    }()
  }, {
    key: "makeLang",
    value: function () {
      var _makeLang = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee18(l) {
        var _this3 = this;
        var ret, a, self;
        return regenerator_default().wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                ret = treeview_$('<li>', {
                  class: 'lang',
                  'data-lang-id': l.self.id.join()
                });
                a = treeview_$('<a>', {
                  class: 'title',
                  'href': l.self.url()
                }).text(l.self.id.join()).appendTo(ret);
                self = treeview_$('<ul>', {
                  class: 'articles'
                });
                _context18.t0 = self;
                _context18.next = 6;
                return Promise.all(l.articles.map(/*#__PURE__*/function () {
                  var _ref5 = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee17(ar) {
                    return regenerator_default().wrap(function _callee17$(_context17) {
                      while (1) {
                        switch (_context17.prev = _context17.next) {
                          case 0:
                            _context17.next = 2;
                            return _this3.makeArticle(ar);
                          case 2:
                            return _context17.abrupt("return", _context17.sent);
                          case 3:
                          case "end":
                            return _context17.stop();
                        }
                      }
                    }, _callee17);
                  }));
                  return function (_x19) {
                    return _ref5.apply(this, arguments);
                  };
                }()));
              case 6:
                _context18.t1 = _context18.sent;
                _context18.t0.append.call(_context18.t0, _context18.t1);
                _context18.t2 = ret;
                _context18.next = 11;
                return this.kunaiBranch(self, 'articles');
              case 11:
                _context18.t3 = _context18.sent;
                _context18.t2.append.call(_context18.t2, _context18.t3);
                return _context18.abrupt("return", ret);
              case 14:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));
      function makeLang(_x18) {
        return _makeLang.apply(this, arguments);
      }
      return makeLang;
    }()
  }, {
    key: "makeExpandable",
    value: function () {
      var _makeExpandable = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee21(elem, obj) {
        var _this4 = this;
        var bar;
        return regenerator_default().wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                // this.log.debug(`makeExpandable '${obj.self.id.join()}'`, elem, obj)
                this.indexElems.set(obj.self, elem);
                this.lazyLoaders.set(obj.self, /*#__PURE__*/(0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee19() {
                  return regenerator_default().wrap(function _callee19$(_context19) {
                    while (1) {
                      switch (_context19.prev = _context19.next) {
                        case 0:
                          _context19.next = 2;
                          return _this4.createContent(obj);
                        case 2:
                        case "end":
                          return _context19.stop();
                      }
                    }
                  }, _callee19);
                })));
                bar = treeview_$('<div>', {
                  class: 'expandbar'
                }).appendTo(elem);
                bar.append(treeview_$('<div>', {
                  class: 'expander'
                }).on('click', /*#__PURE__*/(0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee20() {
                  return regenerator_default().wrap(function _callee20$(_context20) {
                    while (1) {
                      switch (_context20.prev = _context20.next) {
                        case 0:
                          _context20.next = 2;
                          return _this4.doExpand(obj.self);
                        case 2:
                        case "end":
                          return _context20.stop();
                      }
                    }
                  }, _callee20);
                }))));
                _context21.t0 = bar;
                _context21.t1 = treeview_$('<a>').attr('href', obj.self.url());
                _context21.next = 8;
                return obj.self.join_html(DOM.crOptions);
              case 8:
                _context21.t2 = _context21.sent;
                _context21.t3 = _context21.t1.html.call(_context21.t1, _context21.t2);
                _context21.t0.append.call(_context21.t0, _context21.t3);
                return _context21.abrupt("return", elem);
              case 12:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21, this);
      }));
      function makeExpandable(_x20, _x21) {
        return _makeExpandable.apply(this, arguments);
      }
      return makeExpandable;
    }()
  }, {
    key: "makeHeader",
    value: function () {
      var _makeHeader = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee22(h) {
        var li;
        return regenerator_default().wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                li = treeview_$('<li>', {
                  class: 'header'
                });
                if (h.self.cpp_version) {
                  li.attr('data-cpp-version', h.self.cpp_version);
                } else if (h.self.ns && h.self.ns.cpp_version) {
                  // throw h
                }
                _context22.next = 4;
                return this.makeExpandable(li, h);
              case 4:
                return _context22.abrupt("return", _context22.sent);
              case 5:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22, this);
      }));
      function makeHeader(_x22) {
        return _makeHeader.apply(this, arguments);
      }
      return makeHeader;
    }()
  }]);
  return DOM;
}();
(0,defineProperty/* default */.A)(DOM, "crOptions", {
  badges: {
    noselfcpp: true,
    switches: ['simple']
  }
});
(0,defineProperty/* default */.A)(DOM, "crClassOptions", {
  badges: {
    noselfcpp: false,
    switches: ['simple']
  }
});
var Treeview = /*#__PURE__*/function () {
  function Treeview(log, kc, e) {
    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    (0,classCallCheck/* default */.A)(this, Treeview);
    this.log = log.makeContext('Treeview');
    this.kc = kc;
    this.e = e;
    this.root = treeview_$('<div>', {
      class: 'tree v2'
    }).appendTo(this.e);
    this.opts = (0,esm_extends/* default */.A)({}, opts);
    this.legacy = this.opts.legacy;
    this.log.debug('initializing...');
    if (this.legacy) {
      var c = sanitize(this.e.find('.cpp-sidebar'));
      this.log.debug("found ".concat(c, " badges"));
    }
  }
  (0,createClass/* default */.A)(Treeview, [{
    key: "onPageID",
    value: function () {
      var _onPageID = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee23(ids) {
        var h;
        return regenerator_default().wrap(function _callee23$(_context23) {
          while (1) {
            switch (_context23.prev = _context23.next) {
              case 0:
                _context23.prev = 0;
                this.page_idx = this.db.all_fullpath_pages.get(ids.join('/'));
                if (this.page_idx) {
                  _context23.next = 4;
                  break;
                }
                throw new Error("Index for path '".concat(ids.join('/'), "' not present in database"));
              case 4:
                _context23.next = 6;
                return this.dom.doStackExpand(this.page_idx.ns.namespace[0]);
              case 6:
                if (!(crsearch/* IndexID */.ku.isClassy(this.page_idx.id.type) || this.page_idx.in_header)) {
                  _context23.next = 14;
                  break;
                }
                this.log.info("maybe classy page '".concat(this.page_idx.id.join(), "'"));
                h = this.page_idx.in_header;
                this.log.info("expanding current page header '".concat(h.id.join(), "'"), h, this.page_idx);
                _context23.next = 12;
                return this.dom.doExpand(h);
              case 12:
                _context23.next = 20;
                break;
              case 14:
                if (!crsearch/* IndexType */.fo.isHeader(this.page_idx.id.type)) {
                  _context23.next = 19;
                  break;
                }
                _context23.next = 17;
                return this.dom.doExpand(this.page_idx);
              case 17:
                _context23.next = 20;
                break;
              case 19:
                this.log.info("current page '".concat(this.page_idx.id.join(), "' is not classy. nothing left to expand"));
              case 20:
                if (!(ids.length > 1)) {
                  _context23.next = 24;
                  break;
                }
                // highlight self
                this.dom.indexElems.get(this.page_idx).addClass('current-page');

                // finally, always scroll to self
                _context23.next = 24;
                return this.dom.scrollAt(this.page_idx);
              case 24:
                _context23.next = 29;
                break;
              case 26:
                _context23.prev = 26;
                _context23.t0 = _context23["catch"](0);
                this.log.error("Failed to determine current page for id '".concat(ids.join('/'), "'. Sidebar will NOT work properly! (").concat(_context23.t0, ")"), ids);
              case 29:
              case "end":
                return _context23.stop();
            }
          }
        }, _callee23, this, [[0, 26]]);
      }));
      function onPageID(_x23) {
        return _onPageID.apply(this, arguments);
      }
      return onPageID;
    }()
  }, {
    key: "onData",
    value: function () {
      var _onData = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee24(db) {
        var _iterator2, _step2, t, name, real_name;
        return regenerator_default().wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                this.db = db;
                this.tree = db.getTree(this.kc);

                // workaround name
                _iterator2 = treeview_createForOfIteratorHelper(this.tree);
                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    t = _step2.value;
                    if (t.root) {
                      name = t.root.id.join();
                      real_name = t.category.name;
                      if (name !== real_name) {
                        this.log.warn("got incorrect title '".concat(name, "'; expected = '").concat(real_name, "'. ignoring..."));
                      }
                    }
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
                this.dom = new DOM(this.log, this.kc);
                _context24.next = 7;
                return this.onDataImpl();
              case 7:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24, this);
      }));
      function onData(_x24) {
        return _onData.apply(this, arguments);
      }
      return onData;
    }()
  }, {
    key: "onDataImpl",
    value: function () {
      var _onDataImpl = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee27() {
        var _this5 = this;
        var root, cats, filteredTops, batchSize, i, batch, batchElements;
        return regenerator_default().wrap(function _callee27$(_context27) {
          while (1) {
            switch (_context27.prev = _context27.next) {
              case 0:
                this.log.debug('data', this.tree);
                root = treeview_$('<ul>', {
                  class: 'root stackable'
                }).appendTo(this.root);
                cats = this.kc.categories(); // バッチ処理で段階的にDOM要素を生成
                filteredTops = this.tree.filter(function (top) {
                  return top.category.index !== cats.get('index').index;
                });
                batchSize = 5; // 一度に処理する要素数
                i = 0;
              case 6:
                if (!(i < filteredTops.length)) {
                  _context27.next = 18;
                  break;
                }
                batch = filteredTops.slice(i, i + batchSize);
                _context27.next = 10;
                return Promise.all(batch.map(/*#__PURE__*/function () {
                  var _ref8 = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee26(top) {
                    var topID, stack, content_wrapper, content, is_not_empty;
                    return regenerator_default().wrap(function _callee26$(_context26) {
                      while (1) {
                        switch (_context26.prev = _context26.next) {
                          case 0:
                            topID = top.namespace.namespace[0];
                            stack = treeview_$('<li>', {
                              class: 'top stack',
                              'data-top-id': topID
                            });
                            _this5.dom.topElems.set(topID, stack);
                            _context26.t0 = stack;
                            _context26.t1 = treeview_$('<div>', {
                              class: 'heading'
                            }).append(treeview_$('<div>', {
                              class: 'expander'
                            }).on('click', /*#__PURE__*/(0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee25() {
                              return regenerator_default().wrap(function _callee25$(_context25) {
                                while (1) {
                                  switch (_context25.prev = _context25.next) {
                                    case 0:
                                      _this5.dom.doStackExpand(topID);
                                    case 1:
                                    case "end":
                                      return _context25.stop();
                                  }
                                }
                              }, _callee25);
                            }))));
                            _context26.next = 7;
                            return _this5.dom.makeTitle(top);
                          case 7:
                            _context26.t2 = _context26.sent;
                            _context26.t3 = _context26.t1.append.call(_context26.t1, _context26.t2);
                            _context26.t0.append.call(_context26.t0, _context26.t3);
                            content_wrapper = treeview_$('<div>', {
                              class: 'content-wrapper'
                            }).appendTo(stack);
                            content = treeview_$('<div>', {
                              class: 'content'
                            }).appendTo(content_wrapper);
                            is_not_empty = false;
                            if (!(top.category.index === cats.get('lang').index)) {
                              _context26.next = 19;
                              break;
                            }
                            _context26.next = 16;
                            return _this5.processLangTop(top, content);
                          case 16:
                            is_not_empty = _context26.sent;
                            _context26.next = 22;
                            break;
                          case 19:
                            _context26.next = 21;
                            return _this5.processTop(top, content);
                          case 21:
                            is_not_empty = _context26.sent;
                          case 22:
                            if (!is_not_empty) {
                              stack.addClass('empty');
                            }
                            return _context26.abrupt("return", stack);
                          case 24:
                          case "end":
                            return _context26.stop();
                        }
                      }
                    }, _callee26);
                  }));
                  return function (_x25) {
                    return _ref8.apply(this, arguments);
                  };
                }()));
              case 10:
                batchElements = _context27.sent;
                // バッチごとにDOMに追加
                root.append(batchElements);

                // iOS Safariに処理時間を与える
                if (!(i + batchSize < filteredTops.length)) {
                  _context27.next = 15;
                  break;
                }
                _context27.next = 15;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 0);
                });
              case 15:
                i += batchSize;
                _context27.next = 6;
                break;
              case 18:
              case "end":
                return _context27.stop();
            }
          }
        }, _callee27, this);
      }));
      function onDataImpl() {
        return _onDataImpl.apply(this, arguments);
      }
      return onDataImpl;
    }()
  }, {
    key: "processTop",
    value: function () {
      var _processTop = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee30(top, e) {
        var _this6 = this;
        var is_empty, self, articleBatchSize, i, batch, batchElements, _self;
        return regenerator_default().wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                is_empty = true;
                if (!(top.articles && top.articles.length)) {
                  _context30.next = 23;
                  break;
                }
                is_empty = false;
                self = treeview_$('<ul>', {
                  class: 'articles'
                }); // バッチ処理で段階的に要素を追加
                articleBatchSize = 10;
                i = 0;
              case 6:
                if (!(i < top.articles.length)) {
                  _context30.next = 18;
                  break;
                }
                batch = top.articles.slice(i, i + articleBatchSize);
                _context30.next = 10;
                return Promise.all(batch.map(/*#__PURE__*/function () {
                  var _ref10 = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee28(ar) {
                    return regenerator_default().wrap(function _callee28$(_context28) {
                      while (1) {
                        switch (_context28.prev = _context28.next) {
                          case 0:
                            _context28.next = 2;
                            return _this6.dom.makeArticle(ar);
                          case 2:
                            return _context28.abrupt("return", _context28.sent);
                          case 3:
                          case "end":
                            return _context28.stop();
                        }
                      }
                    }, _callee28);
                  }));
                  return function (_x28) {
                    return _ref10.apply(this, arguments);
                  };
                }()));
              case 10:
                batchElements = _context30.sent;
                self.append(batchElements);

                // iOS Safariに処理時間を与える
                if (!(i + articleBatchSize < top.articles.length)) {
                  _context30.next = 15;
                  break;
                }
                _context30.next = 15;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 0);
                });
              case 15:
                i += articleBatchSize;
                _context30.next = 6;
                break;
              case 18:
                _context30.t0 = e;
                _context30.next = 21;
                return this.dom.kunaiBranch(self, 'articles');
              case 21:
                _context30.t1 = _context30.sent;
                _context30.t0.append.call(_context30.t0, _context30.t1);
              case 23:
                if (!(top.headers && top.headers.length)) {
                  _context30.next = 35;
                  break;
                }
                is_empty = false;
                _context30.t2 = treeview_$('<ul>', {
                  class: 'headers'
                });
                _context30.next = 28;
                return Promise.all(top.headers.map(/*#__PURE__*/function () {
                  var _ref11 = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee29(h) {
                    return regenerator_default().wrap(function _callee29$(_context29) {
                      while (1) {
                        switch (_context29.prev = _context29.next) {
                          case 0:
                            _context29.next = 2;
                            return _this6.dom.makeHeader(h);
                          case 2:
                            return _context29.abrupt("return", _context29.sent);
                          case 3:
                          case "end":
                            return _context29.stop();
                        }
                      }
                    }, _callee29);
                  }));
                  return function (_x29) {
                    return _ref11.apply(this, arguments);
                  };
                }()));
              case 28:
                _context30.t3 = _context30.sent;
                _self = _context30.t2.append.call(_context30.t2, _context30.t3);
                _context30.t4 = e;
                _context30.next = 33;
                return this.dom.kunaiBranch(_self, 'headers');
              case 33:
                _context30.t5 = _context30.sent;
                _context30.t4.append.call(_context30.t4, _context30.t5);
              case 35:
                return _context30.abrupt("return", !is_empty);
              case 36:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30, this);
      }));
      function processTop(_x26, _x27) {
        return _processTop.apply(this, arguments);
      }
      return processTop;
    }()
  }, {
    key: "processLangTop",
    value: function () {
      var _processLangTop = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee32(top, e) {
        var _this7 = this;
        var ars, ltops, _iterator3, _step3, ar, langs;
        return regenerator_default().wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                ars = top.articles;
                ltops = new Map(ars.filter(function (idx) {
                  return idx.page_id.length === 1;
                }).map(function (idx) {
                  return [idx.page_id[0], {
                    self: idx,
                    articles: []
                  }];
                }));
                _iterator3 = treeview_createForOfIteratorHelper(ars);
                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    ar = _step3.value;
                    if (ar.page_id.length >= 2) {
                      ltops.get(ar.page_id[0]).articles.push(ar);
                    }
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
                ltops = Array.from(ltops).sort(function (_ref12, _ref13) {
                  var _ref14 = (0,slicedToArray/* default */.A)(_ref12, 2),
                    aid = _ref14[0],
                    _ref14$ = _ref14[1],
                    aself = _ref14$.aself,
                    aarticles = _ref14$.aarticles;
                  var _ref15 = (0,slicedToArray/* default */.A)(_ref13, 2),
                    bid = _ref15[0],
                    _ref15$ = _ref15[1],
                    bself = _ref15$.bself,
                    barticles = _ref15$.barticles;
                  return aid < bid ? 1 : -1;
                });
                langs = treeview_$('<ul>', {
                  class: 'langs'
                }).appendTo(e);
                _context32.t0 = langs;
                _context32.next = 9;
                return Promise.all(ltops.map(/*#__PURE__*/function () {
                  var _ref16 = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee31(_ref17) {
                    var _ref18, id, t;
                    return regenerator_default().wrap(function _callee31$(_context31) {
                      while (1) {
                        switch (_context31.prev = _context31.next) {
                          case 0:
                            _ref18 = (0,slicedToArray/* default */.A)(_ref17, 2), id = _ref18[0], t = _ref18[1];
                            _context31.next = 3;
                            return _this7.dom.makeLang(t);
                          case 3:
                            return _context31.abrupt("return", _context31.sent);
                          case 4:
                          case "end":
                            return _context31.stop();
                        }
                      }
                    }, _callee31);
                  }));
                  return function (_x32) {
                    return _ref16.apply(this, arguments);
                  };
                }()));
              case 9:
                _context32.t1 = _context32.sent;
                _context32.t0.append.call(_context32.t0, _context32.t1);
                return _context32.abrupt("return", true);
              case 12:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32);
      }));
      function processLangTop(_x30, _x31) {
        return _processLangTop.apply(this, arguments);
      }
      return processLangTop;
    }()
  }]);
  return Treeview;
}();

;// ./kunai/ui/sidebar.js
/* provided dependency */ var sidebar_$ = __webpack_require__(5616);






var Sidebar = /*#__PURE__*/function () {
  function Sidebar(log) {
    (0,classCallCheck/* default */.A)(this, Sidebar);
    this.log = log.makeContext('Sidebar');
    this.log.info('initializing...');
    this.kc = new crsearch/* KC.Config */.KC.TS({
      'article.md': (__webpack_require__(6059)/* ["default"] */ .A),
      'cpp.json': __webpack_require__(2841)
    });
    this.e = null;
    {
      var maybe_sidebar = sidebar_$('#sidebar');
      if (maybe_sidebar.length) {
        this.legacy = false;
        this.e = maybe_sidebar;
        this.e.addClass('kunai-sidebar');
      } else {
        this.legacy = true;
        this.e = sidebar_$('main[role="main"] div:not([itemtype="http://schema.org/Article"]) .tree').parent().addClass('kunai-sidebar');
      }
    }
    this.status = sidebar_$('<div>').addClass('status').appendTo(this.e);
    this.e.addClass('loading');
    this.log.debug("legacy?: ".concat(this.legacy));
    if (this.legacy) {
      this.e.addClass('legacy');
    }
    this.treeview = this.initTreeview();
  }
  (0,createClass/* default */.A)(Sidebar, [{
    key: "onDatabase",
    value: function () {
      var _onDatabase = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee(db) {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                this.log.info("onDatabase", db);
                this.db = db;
                _context.next = 5;
                return this.treeview.onData(db);
              case 5:
                _context.prev = 5;
                this.e.removeClass('loading');
                return _context.finish(5);
              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0,, 5, 8]]);
      }));
      function onDatabase(_x) {
        return _onDatabase.apply(this, arguments);
      }
      return onDatabase;
    }()
  }, {
    key: "initTreeview",
    value: function initTreeview() {
      var e = null;
      if (this.legacy) {
        e = this.e.children('.tree').addClass('kunai-tree');
      } else {
        e = sidebar_$('<div>').addClass('kunai-tree').addClass('v2').appendTo(this.e);
      }
      return new Treeview(this.log, this.kc, this.e, {
        legacy: this.legacy
      });
    }
  }]);
  return Sidebar;
}();

;// ./kunai/ui/navbar.js
/* provided dependency */ var navbar_$ = __webpack_require__(5616);


var Navbar = /*#__PURE__*/function () {
  function Navbar(log) {
    (0,classCallCheck/* default */.A)(this, Navbar);
    this.log = log.makeContext('Navbar');
    this.log.debug('initializing...');
    this.btn = navbar_$('nav.navbar button.navbar-toggle');
    this.target = navbar_$(this.btn.attr('data-target'));
    this.btn.on('click', this.onNavbarToggle.bind(this));
  }
  (0,createClass/* default */.A)(Navbar, [{
    key: "onNavbarToggle",
    value: function onNavbarToggle(e) {
      // this.log.debug('onNavbarToggle', e)
      e.preventDefault();
      this.btn.toggleClass('collapsed');
      this.target.toggleClass('collapse');
    }
  }]);
  return Navbar;
}();

;// ./kunai/ui.js





;// ./kunai/error.js




function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var error_KunaiError = function KunaiError(reason) {
  (0,classCallCheck/* default */.A)(this, KunaiError);
  // super(reason, ...args)
  this.reason = reason;
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  this.args = args;
};
var ParseError = /*#__PURE__*/(/* unused pure expression or super */ null && (function (_KunaiError) {
  _inherits(ParseError, _KunaiError);
  var _super = _createSuper(ParseError);
  function ParseError() {
    _classCallCheck(this, ParseError);
    return _super.apply(this, arguments);
  }
  return ParseError;
}(error_KunaiError)));
var error_NetworkError = /*#__PURE__*/(/* unused pure expression or super */ null && (function (_KunaiError2) {
  _inherits(NetworkError, _KunaiError2);
  var _super2 = _createSuper(NetworkError);
  function NetworkError() {
    _classCallCheck(this, NetworkError);
    return _super2.apply(this, arguments);
  }
  return NetworkError;
}(error_KunaiError)));

;// ./kunai/meta/page-key.js
var PageKey = {
  main: 'main',
  article: 'article',
  articleBody: 'articleBody',
  codes: 'codes'
};

;// ./kunai/net/content-type.js



var ContentType = /*#__PURE__*/function () {
  function ContentType() {
    (0,classCallCheck/* default */.A)(this, ContentType);
  }
  (0,createClass/* default */.A)(ContentType, null, [{
    key: "parse",
    value: function parse(url) {
      var ext = url.pathname.match(/(?:\.[^.]+)+$/);
      var type = ContentType.UNKNOWN;
      switch (String(ext)) {
        case '.md':
          type = ContentType.MARKDOWN;
          break;
      }
      return type;
    }
  }]);
  return ContentType;
}();
(0,defineProperty/* default */.A)(ContentType, "UNKNOWN", 'unknown');
(0,defineProperty/* default */.A)(ContentType, "MARKDOWN", 'markdown');

;// ./kunai/net.js

;// ./kunai/code/id.js






function id_createSuper(Derived) { var hasNativeReflectConstruct = id_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function id_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var NonExistentIDError = /*#__PURE__*/(/* unused pure expression or super */ null && (function (_KunaiError) {
  _inherits(NonExistentIDError, _KunaiError);
  var _super = id_createSuper(NonExistentIDError);
  function NonExistentIDError() {
    _classCallCheck(this, NonExistentIDError);
    return _super.apply(this, arguments);
  }
  return NonExistentIDError;
}(KunaiError)));
var ID = /*#__PURE__*/function () {
  function ID(key) {
    (0,classCallCheck/* default */.A)(this, ID);
    this.key = key;
  }
  (0,createClass/* default */.A)(ID, [{
    key: "equals",
    value: function equals(rhs) {
      if (!(rhs instanceof ID)) {
        throw new Error("rhs must be instanceof ID", rhs);
      }
      return this.key === rhs.key;
    }
  }, {
    key: "toString",
    value: function toString() {
      return "#".concat(this.key);
    }
  }, {
    key: "serialize",
    value: function serialize() {
      return "".concat(this.key);
    }
  }, {
    key: "makeSelector",
    value: function makeSelector() {
      return this.toString();
    }
  }]);
  return ID;
}();
(0,defineProperty/* default */.A)(ID, "DataAttr", 'data-kunai-yata-id');
(0,defineProperty/* default */.A)(ID, "R", /([a-zA-Z][a-zA-Z0-9_]+)-(\d+)/);

;// ./kunai/code/pool.js




var Pool = /*#__PURE__*/function () {
  function Pool(log) {
    (0,classCallCheck/* default */.A)(this, Pool);
    this.log = log.makeContext('Pool');
    this.langs = new Map();
  }
  (0,createClass/* default */.A)(Pool, [{
    key: "add",
    value: function add(code) {
      if (!this.langs.has(code.id.lang)) {
        this.langs.set(code.id.lang, new Map());
      }
      this.langs.get(code.id.lang).set(code.id.key, code);
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      if (!this.has(id)) {
        throw new Error("[BUG] attempt to remove a non existent code (".concat(id, ")"));
      }
      this.langs.get(id.lang).delete(id.key);
    }
  }, {
    key: "get",
    value: function get(id) {
      if (!this.has(id)) {
        throw new Error("[BUG] attempt to retrieve a non existent code (".concat(id, ")"));
      }
      return this.langs.get(id.lang).get(id.key);
    }
  }, {
    key: "has",
    value: function has(id) {
      if (!this.langs.has(id.lang)) {
        return false;
      }
      return this.langs.get(id.lang).has(id.key);
    }
  }]);
  return Pool;
}(); // Pool

;// ./kunai/code/cpp.js



function cpp_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = cpp_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function cpp_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return cpp_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return cpp_arrayLikeToArray(o, minLen); }
function cpp_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var CPP = /*#__PURE__*/function () {
  function CPP(log, id, buf, hints) {
    (0,classCallCheck/* default */.A)(this, CPP);
    this.id = id;
    this.log = log.makeContext("CPP #".concat(this.id.key));
    this.buf = buf;
    this.parse(hints);
  }
  (0,createClass/* default */.A)(CPP, [{
    key: "parse",
    value: function parse(hints) {
      this.headers = [];
      var _iterator = cpp_createForOfIteratorHelper(this.buf.split(/\n/)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var line = _step.value;
          var trimmed = line.trim();
          var matched = trimmed.match(/^#include\s*<([^>]+)>/);
          if (matched) {
            var _matched = (0,slicedToArray/* default */.A)(matched, 2),
              _ = _matched[0],
              header = _matched[1];
            this.log.debug("got C++ header '".concat(header, "' in code"));
            this.headers.push(header);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (hints.headers) {
        var _iterator2 = cpp_createForOfIteratorHelper(hints.headers),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var h = _step2.value;
            if (!this.headers.includes(h)) {
              this.log.warn("already found header '".concat(h, "' in meta tag, but it was not written in this code snippet"));
              this.prepend_header(h);
              this.headers.push(h);
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      this.log.info('parse ok', this);
    }
  }, {
    key: "prepend_header",
    value: function prepend_header(h) {
      this.buf = "#include <".concat(h, ">\n") + this.buf;
    }
  }]);
  return CPP;
}();

;// ./kunai/code.js



// EXTERNAL MODULE: ../node_modules/url-parse/index.js
var url_parse = __webpack_require__(8428);
var url_parse_default = /*#__PURE__*/__webpack_require__.n(url_parse);
// EXTERNAL MODULE: ../node_modules/commonmark/lib/index.js + 8 modules
var lib = __webpack_require__(645);
;// ./kunai/meta/meta.js



function meta_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = meta_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function meta_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return meta_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return meta_arrayLikeToArray(o, minLen); }
function meta_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







var Meta = /*#__PURE__*/function () {
  function Meta(log, config, mdinfo, onCodeFound) {
    (0,classCallCheck/* default */.A)(this, Meta);
    this.log = log.makeContext("Meta");
    this.config = config;
    this.codes = new Pool(this.log);
    var _iterator = meta_createForOfIteratorHelper(mdinfo.sources),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var source = _step.value;
        var id = new ID(source.id);
        this.codes.add(new CPP(this.log, id, source.source, {}));
        onCodeFound(this, id);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    this.page_id = mdinfo.page_id;
    this.andareMetaInfo = mdinfo.meta;
  }
  (0,createClass/* default */.A)(Meta, [{
    key: "getCode",
    value: function getCode(id) {
      if (!this.codes.has(id)) {
        throw new error_KunaiError("code ".concat(id, " not found in Meta data"));
      }
      return this.codes.get(id);
    }
  }]);
  return Meta;
}();
(0,defineProperty/* default */.A)(Meta, "PageKey", PageKey);

;// ./kunai/meta.js


// EXTERNAL MODULE: ../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(4300);
// EXTERNAL MODULE: ../node_modules/numeral/numeral.js
var numeral = __webpack_require__(4951);
var numeral_default = /*#__PURE__*/__webpack_require__.n(numeral);
;// ./kunai/wand.js
/* provided dependency */ var wand_$ = __webpack_require__(5616);









function wand_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = wand_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function wand_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return wand_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return wand_arrayLikeToArray(o, minLen); }
function wand_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function wand_createSuper(Derived) { var hasNativeReflectConstruct = wand_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function wand_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var APIError = /*#__PURE__*/(/* unused pure expression or super */ null && (function (_NetworkError) {
  _inherits(APIError, _NetworkError);
  var _super = wand_createSuper(APIError);
  function APIError() {
    _classCallCheck(this, APIError);
    return _super.apply(this, arguments);
  }
  return APIError;
}(NetworkError)));
var Method = {
  get: 'GET',
  post: 'POST'
};
var API = /*#__PURE__*/function () {
  function API() {
    (0,classCallCheck/* default */.A)(this, API);
  }
  (0,createClass/* default */.A)(API, null, [{
    key: "compile",
    value: function compile(id, opts, code, s, f) {
      return API.request(id, Method.post, new (url_parse_default())('compile.json', API.Home), opts, code, s, f);
    }
  }, {
    key: "request",
    value: function request(id, method, url, opts, data, onSuccess, onFailure) {
      var reqid = JSON.stringify({
        method: method,
        url: String(url),
        id: id
      });
      // console.time(reqid)
      // const stopTimer = () => {
      // console.timeEnd(reqid)
      // }
      var prevNow = Date.now();
      var makeExtraInfo = function makeExtraInfo() {
        return {
          id: id,
          elapsed: Date.now() - prevNow
        };
      };
      var s = function s(e) {
        // stopTimer()
        return onSuccess(e, makeExtraInfo());
      };
      var f = function f(e) {
        // stopTimer()
        return onFailure(e, makeExtraInfo());
      };
      var common = {
        dataType: 'json',
        crossDomain: true,
        cache: false
      };
      try {
        switch (method) {
          case Method.get:
            {
              return wand_$.ajax(String(url), (0,esm_extends/* default */.A)({}, common, {
                type: 'GET',
                data: API.make_request_json(opts, data)
              })).done(s).fail(f);
            }
          case Method.post:
            {
              return wand_$.ajax(String(url), (0,esm_extends/* default */.A)({}, common, {
                type: 'POST',
                data: API.make_request_json(opts, data)
              })).done(s).fail(f);
            }
        }
      } catch (e) {
        console.timeEnd(reqid);
        throw e;
        // this.log.error(e.name, e.message)
      } finally {}
    }
  }, {
    key: "make_request_json",
    value: function make_request_json(opts, code) {
      var kv = {};
      var _iterator = wand_createForOfIteratorHelper(opts),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = (0,slicedToArray/* default */.A)(_step.value, 2),
            k = _step$value[0],
            v = _step$value[1];
          switch (k) {
            case 'compiler':
              {
                kv[k] = v;
                break;
              }
            case 'options':
              {
                kv[k] = v.join(',');
                break;
              }
            case 'compiler-option-raw':
              {
                kv[k] = v.join("\n");
                break;
              }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      kv['code'] = code;
      return JSON.stringify(kv);
    }
  }]);
  return API;
}();
(0,defineProperty/* default */.A)(API, "Home", new (url_parse_default())('https://wandbox.org/api/'));
var Wand = /*#__PURE__*/function () {
  function Wand(log) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Map();
    (0,classCallCheck/* default */.A)(this, Wand);
    this.log = log.makeContext('Wand');
    this.opts = new Map([].concat((0,toConsumableArray/* default */.A)(Wand.defaults), (0,toConsumableArray/* default */.A)(opts)));
    this.log.info('三へ( へ՞ਊ ՞)へ ﾊｯﾊｯ');
  }
  (0,createClass/* default */.A)(Wand, [{
    key: "compile",
    value: function compile(code, onSuccess, onFailure) {
      var _this = this;
      var id = "#".concat(Date.now());
      // console.time(id)
      this.log.info("compiling: ".concat(id), code);
      return API.compile(id, this.opts, code, function (r, e) {
        // console.timeEnd(id)
        _this.log.info("success: ".concat(id, " (took ").concat(Wand.elapsed(e.elapsed), ")"), r, e);
        return onSuccess(r, e);
      }, function (r, e) {
        // console.timeEnd(id)
        _this.log.error("failed: ".concat(id, " (took ").concat(Wand.elapsed(e.elapsed), ")"), r, e);
        return onFailure(r, e);
      });
    }
  }], [{
    key: "elapsed",
    value: function elapsed(msec) {
      return "".concat(numeral_default()(msec / 1000.).format('0.0'), " sec");
    }
  }]);
  return Wand;
}();
(0,defineProperty/* default */.A)(Wand, "defaults", new Map([['compiler', 'clang-head'], ['options', ['warning', 'cpp-pedantic-errors']], ['compiler-option-raw', ['-std=c++2c', '-Wall', '-Wextra' /*'-Werror'*/]]]));

// EXTERNAL MODULE: ./kunai/mirror/theme.js
var mirror_theme = __webpack_require__(9346);
var theme_default = /*#__PURE__*/__webpack_require__.n(mirror_theme);
;// ./kunai/mirror/default-options.js
var DefaultOptions = {
  mode: 'clike',
  theme: 'paraiso-dark',
  autofocus: true,
  // inputStyle: 'contenteditable',
  lineNumbers: true,
  tabSize: 2,
  indentUnit: 2,
  indentWithTabs: false,
  smartIndent: true,
  fixedGutter: true,
  styleActiveLine: true,
  gutters: ['CodeMirror-linenumbers', 'breakpoints']
};

;// ./kunai/mirror.js


// EXTERNAL MODULE: ../node_modules/codemirror/lib/codemirror.js
var codemirror = __webpack_require__(4257);
var codemirror_default = /*#__PURE__*/__webpack_require__.n(codemirror);
// EXTERNAL MODULE: ../node_modules/codemirror/mode/clike/clike.js
var clike = __webpack_require__(9212);
// EXTERNAL MODULE: ../node_modules/anser/lib/index.js
var anser_lib = __webpack_require__(2644);
var lib_default = /*#__PURE__*/__webpack_require__.n(anser_lib);
;// ./kunai/yata.js
/* provided dependency */ var yata_$ = __webpack_require__(5616);






function yata_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = yata_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function yata_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return yata_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return yata_arrayLikeToArray(o, minLen); }
function yata_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





var ToolID = {
  play: 'play',
  compile: 'compile',
  theme: 'theme'
};
var RefreshTimerInfo = function RefreshTimerInfo(id) {
  (0,classCallCheck/* default */.A)(this, RefreshTimerInfo);
  this.id = id;
  this.realID = null;
  this.count = 0;
};
var Yata = /*#__PURE__*/function () {
  function Yata(log, wand, code) {
    var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    (0,classCallCheck/* default */.A)(this, Yata);
    this.wand = wand;
    this.code = code;
    this.console = null;
    this.cmRefreshTimers = new Map();
    this.log = log.makeContext("Yata ".concat(this.code.id));
    this.opts = (0,esm_extends/* default */.A)({}, DefaultOptions, opts);
    this.tools = new Map();
    this.themes = new Map();
    this.currentTheme = DefaultOptions.theme;
    this.loadTheme(this.currentTheme);
    this.initElem();
    this.initMirror();

    // this.isDragging = false
  }
  (0,createClass/* default */.A)(Yata, [{
    key: "initElem",
    value: function initElem() {
      this.orig_code = yata_$(this.code.id.makeSelector()).children();
      if (!this.orig_code.length) {
        throw new error_KunaiError("original code element with id ".concat(this.code.id, " not found"));
      }
      var elem = yata_$('<div>');
      elem.addClass('yata-toolbar');
      this.log.info("creating Yata toolbar for code snippet", elem);
      var tools_all = yata_$('<div>').addClass('tools-all');
      var tooltip = yata_$('<div class="tooltip-wrapper"><div class="tooltip"></div></div>');
      var tool = yata_$('<li>').addClass('tool');
      var btn_proto = yata_$("<button>").prop('disabled', true);
      tooltip.clone().appendTo(btn_proto);
      {
        var tb = yata_$('<ul />').addClass('tools left');
        {
          var li = tool.clone().addClass('play');
          this.tools.set(ToolID.play, li);
          var btn = btn_proto.clone().prop('disabled', false);
          yata_$('<i>').addClass('fa fa-fw fa-magic').appendTo(btn);
          btn.on('click', this.onEnable.bind(this));
          btn.appendTo(li);
          li.appendTo(tb);
        }
        {
          var _li = tool.clone().addClass('compile');
          this.tools.set(ToolID.compile, _li);
          var _btn = btn_proto.clone();
          yata_$('<i>').addClass('fa fa-fw fa-play').appendTo(_btn);
          _btn.on('click', this.onCompile.bind(this));
          _btn.appendTo(_li);
          _li.appendTo(tb);
        }
        tb.appendTo(tools_all);
      }
      {
        var _tb = yata_$('<ul />').addClass('tools right');
        {
          var _li2 = tool.clone().addClass('theme');
          this.tools.set(ToolID.theme, _li2);
          var _btn2 = yata_$('<div>').addClass('not-a-button');
          yata_$('<i>').addClass('fa fa-fw fa-adjust').appendTo(_btn2);
          tooltip.clone().appendTo(_btn2);
          _btn2.appendTo(_li2);
          var sel = yata_$('<select>');
          var _iterator = yata_createForOfIteratorHelper((theme_default())),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var theme = _step.value;
              yata_$('<option>').val(theme).text(theme).appendTo(sel);
            }

            // i.e. default theme
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          sel.val(this.currentTheme);
          sel.on('change', this.onThemeChange.bind(this));
          sel.appendTo(_li2);
          _li2.appendTo(_tb);
        }
        _tb.appendTo(tools_all);
      }
      tools_all.appendTo(elem);
      this.orig_code.before(elem);
    } // initElem
  }, {
    key: "initMirror",
    value: function initMirror(code) {
      var _this = this;
      this.buf = this.orig_code.next('.mirror');
      this.log.info('creating textarea buffer...');
      this.buf = yata_$('<textarea>').addClass('mirror');

      // the code
      this.buf.text(this.code.buf);
      this.orig_code.after(this.buf);
      this.log.info("initializing mirror data...", this.buf);
      this.log.info("creating CodeMirror element...");
      this.cm = codemirror_default().fromTextArea(this.buf.get(0), (0,esm_extends/* default */.A)({}, this.opts, {
        theme: this.currentTheme
      }));
      this.cm.on('gutterClick', function (cm, n) {
        var info = cm.lineInfo(n);
        cm.setGutterMarker(n, 'breakpoints', info.gutterMarkers ? null : _this.makeMarker());
      });
      this.cm.on('scroll', function (cm) {
        var info = cm.getScrollInfo();
        var eps = 2;
        // this.log.debug('scroll', info, cm)

        var we = yata_$(cm.getWrapperElement());
        if (info.left > eps) {
          we.addClass('scrolling-x');
        } else {
          we.removeClass('scrolling-x');
        }
        if (info.top > eps) {
          we.addClass('scrolling-y');
        } else {
          we.removeClass('scrolling-y');
        }
      });

      // this.resizer = this.code.id.serializeInDOM($('<div>').addClass('yata-resizer'))

      // this.resizer.on('mouseup', ::this.onResize)
      // this.resizer.on('mousedown', ::this.onResize)
      // this.resizer.on('mousemove', ::this.onResize)

      // $(this.cm.getWrapperElement()).after(this.resizer)

      this.cm.setSize(null, '380px');
      this.log.info('CodeMirror element created', this.cm);

      // this.cm.focus()
      // this.cm.refresh()

      this.autoRefresh();
      this.console = yata_$('<div>').addClass('yata-console');
      yata_$(this.cm.getWrapperElement()).after(this.console);
    } // initMirror
  }, {
    key: "autoRefresh",
    value: function () {
      var _autoRefresh = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee() {
        var _this2 = this;
        var id, i, info, timerId;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // OMG...............
                // CodeMirrorのクソ仕様をよく分かっていないので
                // 生成されてからしばらく経ってから強制再描画しないと
                // 何も表示されない
                // †最大の闇†
                id = 0; // より安全なID生成方法に変更
                i = 0;
              case 2:
                if (!(i <= this.cmRefreshTimers.size + 1)) {
                  _context.next = 9;
                  break;
                }
                if (this.cmRefreshTimers.has(i)) {
                  _context.next = 6;
                  break;
                }
                id = i;
                return _context.abrupt("break", 9);
              case 6:
                i++;
                _context.next = 2;
                break;
              case 9:
                info = new RefreshTimerInfo(id);
                this.log.debug("autoRefresh engaged (id: #".concat(id, ")"));
                this.cmRefreshTimers.set(id, info);
                timerId = setInterval(function () {
                  // infoがまだ存在するか確認
                  if (!_this2.cmRefreshTimers.has(id)) {
                    clearInterval(timerId);
                    return;
                  }
                  ++info.count;

                  // CodeMirrorインスタンスが有効か確認
                  if (_this2.cm && typeof _this2.cm.refresh === 'function') {
                    try {
                      _this2.cm.refresh();
                    } catch (e) {
                      _this2.log.error("Failed to refresh CodeMirror: ".concat(e));
                      clearInterval(timerId);
                      _this2.cmRefreshTimers.delete(id);
                      return;
                    }
                  }
                  if (info.count > 10) {
                    _this2.log.debug("removing autoRefresh timer (id: #".concat(id, ", realID: #").concat(timerId, ")"));
                    clearInterval(timerId);
                    _this2.cmRefreshTimers.delete(id);
                  }
                }, 200); // タイマーIDを保存
                info.realID = timerId;
              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function autoRefresh() {
        return _autoRefresh.apply(this, arguments);
      }
      return autoRefresh;
    }()
  }, {
    key: "onResize",
    value: function onResize(e) {
      e.stopPropagation();
      this.log.info("dragged ".concat(e.offsetY), e);
      if (e.type === 'mousedown') {
        this.isDragging = false;
        return false;
      } else if (e.type === 'mousemove') {
        this.isDragging = true;
        return false;
      }
      if (this.isDragging) {
        this.log.info("dragged ".concat(e.offsetY), e);
      }
    } // onResize
  }, {
    key: "makeMarker",
    value: function makeMarker() {
      return yata_$('<div>').text('●').css(Yata.Style.Marker).get(0);
    }
  }, {
    key: "loadTheme",
    value: function () {
      var _loadTheme = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee2(id) {
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.themes.has(id)) {
                  this.log.info("initial theme load for '".concat(id, "'"));
                  this.themes.set(id, true);
                  // this.themes.set(id, require(`codemirror/theme/${id}.css`))
                }
              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function loadTheme(_x) {
        return _loadTheme.apply(this, arguments);
      }
      return loadTheme;
    }()
  }, {
    key: "findRaw",
    value: function findRaw() {
      return yata_$("".concat(this.code.id.makeSelector(), " .CodeMirror"));
    }
  }, {
    key: "onCompile",
    value: function onCompile(e) {
      // this.log.debug(`onCompile`, e)
      this.tools.get(ToolID.compile).addClass('compiling');

      // save to textarea
      this.cm.save();
      this.wand.compile(this.cm.getTextArea().value, this.onCompileSuccess.bind(this), this.onCompileFailure.bind(this));
    }
  }, {
    key: "onCompileSuccess",
    value: function () {
      var _onCompileSuccess = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee3(ret, extra) {
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.onCompilePostPre(true, ret, extra);
                return _context3.abrupt("return", this.onCompilePostPost(ret, extra));
              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function onCompileSuccess(_x2, _x3) {
        return _onCompileSuccess.apply(this, arguments);
      }
      return onCompileSuccess;
    }()
  }, {
    key: "onCompileFailure",
    value: function () {
      var _onCompileFailure = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee4(e, extra) {
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.onCompilePostPre(false, e, extra);
                return _context4.abrupt("return", this.onCompilePostPost(e, extra));
              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function onCompileFailure(_x4, _x5) {
        return _onCompileFailure.apply(this, arguments);
      }
      return onCompileFailure;
    }()
  }, {
    key: "onCompilePostPre",
    value: function onCompilePostPre(isSuccess, e, extra) {
      // this.log.info(`${isSuccess ? 'success' : 'failed'}: ${extra.id}`)
    }
  }, {
    key: "onCompilePostPost",
    value: function () {
      var _onCompilePostPost = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee5(e, extra) {
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.tools.get(ToolID.compile).removeClass('compiling');
                this.console.html([].concat(Yata.processConsole(e.compiler_message)).concat(Yata.processConsole(e.program_message)));
              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function onCompilePostPost(_x6, _x7) {
        return _onCompilePostPost.apply(this, arguments);
      }
      return onCompilePostPost;
    }()
  }, {
    key: "onThemeChange",
    value: function onThemeChange(e) {
      var theme_id = e.target.value;
      this.log.info("onThemeChange (--> '".concat(theme_id, "')"), e);
      this.loadTheme(theme_id);
      this.currentTheme = theme_id;
      this.applyRawThemeChange();
    }
  }, {
    key: "applyRawThemeChange",
    value: function () {
      var _applyRawThemeChange = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee6() {
        var raw;
        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                raw = this.findRaw();
                if (raw.length) {
                  this.log.info('mirror found, dynamically changing theme...', raw);
                  raw.get(0).className = raw.get(0).className.split(/\s+/).filter(function (e) {
                    return !e.match(/^cm-s-/);
                  }).concat("cm-s-".concat(this.currentTheme)).join(' ');
                }
              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function applyRawThemeChange() {
        return _applyRawThemeChange.apply(this, arguments);
      }
      return applyRawThemeChange;
    }()
  }, {
    key: "onEnable",
    value: function onEnable(e) {
      var btn = yata_$(e.srcElement || e.originalTarget || e.target);
      var yata = btn.closest('.yata-toolbar');

      // this.log.debug(`onEnable`, e, btn.get(0))

      var orig_code = yata_$(yata.nextAll("".concat(this.code.id.makeSelector(), " .codehilite")));
      if (yata.hasClass('enabled')) {
        this.log.info("disabling Yata mode");
        {
          var mirror = orig_code.next('.mirror');
          if (mirror.length) {
            mirror.removeClass('enabled');
          }
        }

        // disable all tools, except for the 'Enable' button
        {
          var tools = yata.find('.tools-all .tool');
          var _iterator2 = yata_createForOfIteratorHelper(tools),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var tool_r = _step2.value;
              var tool = yata_$(tool_r);
              if (tool.hasClass('play')) {
                continue;
              }
              tool.find('button').prop('disabled', true);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
        yata.removeClass('enabled');
        return;
      }
      yata.addClass('enabled');
      this.log.info("enabling Yata mode");

      // remove all 'disabled' props
      {
        var _tools = yata.find('.tools-all .tool');
        var _iterator3 = yata_createForOfIteratorHelper(_tools),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var _tool_r = _step3.value;
            var _tool = yata_$(_tool_r);
            var _btn3 = _tool.find('button');
            if (_btn3.length) {
              _btn3.prop('disabled', false);
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
      this.buf.addClass('enabled');
      this.autoRefresh();
      this.cm.focus();
    } // onEnable
  }], [{
    key: "processConsole",
    value: function processConsole(raw) {
      if (!raw) return [];
      return yata_$('<span />').text(raw).html().split(/\n/).map(function (l) {
        return yata_$('<p>').addClass('yata-console-line').html(lib_default().ansiToHtml(l, {
          use_classes: true
        }));
      });
    }
  }]);
  return Yata;
}();
(0,defineProperty/* default */.A)(Yata, "ToolID", ToolID);
(0,defineProperty/* default */.A)(Yata, "Style", {
  Marker: {
    color: '#ff2727'
  }
});

// EXTERNAL MODULE: ./codemirror-themes.js
var codemirror_themes = __webpack_require__(1239);
;// ./kunai.js
/* provided dependency */ var kunai_$ = __webpack_require__(5616);















var DefaultLogger = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  function DefaultLogger() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "kunai_top";
    _classCallCheck(this, DefaultLogger);
    this.context = context;
  }
  _createClass(DefaultLogger, [{
    key: "debug",
    value: function debug() {
      var _console;
      (_console = console).debug.apply(_console, ["[".concat(this.context, "]")].concat(Array.prototype.slice.call(arguments)));
    }
  }, {
    key: "info",
    value: function info() {
      var _console2;
      (_console2 = console).info.apply(_console2, ["[".concat(this.context, "]")].concat(Array.prototype.slice.call(arguments)));
    }
  }, {
    key: "warn",
    value: function warn() {
      var _console3;
      (_console3 = console).warn.apply(_console3, ["[".concat(this.context, "]")].concat(Array.prototype.slice.call(arguments)));
    }
  }, {
    key: "error",
    value: function error() {
      var _console4;
      (_console4 = console).error.apply(_console4, ["[".concat(this.context, "]")].concat(Array.prototype.slice.call(arguments)));
    }
  }, {
    key: "makeContext",
    value: function makeContext(context) {
      return new DefaultLogger(context);
    }
  }]);
  return DefaultLogger;
}()));
;
var ErrorLogger = /*#__PURE__*/function () {
  function ErrorLogger() {
    var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "kunai_top";
    (0,classCallCheck/* default */.A)(this, ErrorLogger);
    this.context = context;
  }
  (0,createClass/* default */.A)(ErrorLogger, [{
    key: "debug",
    value: function debug() {}
  }, {
    key: "info",
    value: function info() {}
  }, {
    key: "warn",
    value: function warn() {}
  }, {
    key: "error",
    value: function error() {
      var _console5;
      (_console5 = console).error.apply(_console5, ["[".concat(this.context, "]")].concat(Array.prototype.slice.call(arguments)));
    }
  }, {
    key: "makeContext",
    value: function makeContext(context) {
      return new ErrorLogger(context);
    }
  }]);
  return ErrorLogger;
}();
;
var Kunai = /*#__PURE__*/function () {
  function Kunai() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0,classCallCheck/* default */.A)(this, Kunai);
    // fastest
    // $('body').addClass('js').removeClass('no-js')

    this.opts = (0,esm_extends/* default */.A)({}, Kunai.defaultOptions, opts);
    //this.log = new DefaultLogger()
    this.log = new ErrorLogger();
    console.log("version ".concat({"version":"3.0.9","bugs_url":"https://github.com/cpprefjp/kunai/issues"}.version, " (https://github.com/cpprefjp/kunai/tree/v").concat({"version":"3.0.9","bugs_url":"https://github.com/cpprefjp/kunai/issues"}.version, ")"));
    console.log("please report frontend bugs to: ".concat({"version":"3.0.9","bugs_url":"https://github.com/cpprefjp/kunai/issues"}.bugs_url));
    this.ui = {
      navbar: null,
      sidebar: null,
      content: null
    };
    this.initUI();
    this.wand = new Wand(this.log);
    this.yatas = new Map();
  }
  (0,createClass/* default */.A)(Kunai, [{
    key: "cpprefjp",
    value: function () {
      var _cpprefjp = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee() {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.load_impl(['cpprefjp', 'site']);
                this.crs = this.initCRSearch(true);
              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function cpprefjp() {
        return _cpprefjp.apply(this, arguments);
      }
      return cpprefjp;
    }()
  }, {
    key: "boostjp",
    value: function () {
      var _boostjp = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee2() {
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.load_impl(['boostjp', 'site']);
                this.crs = this.initCRSearch(false);
              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function boostjp() {
        return _boostjp.apply(this, arguments);
      }
      return boostjp;
    }()
  }, {
    key: "load_impl",
    value: function load_impl(config) {
      if (this.opts.compat) {
        this.compat = new Compat(this.log, config);
      }
      var desc = config.join('/');
      this.log.info("loading (".concat(desc, ")"));
      kunai_$('body').addClass('kunai');
      var mdinfo = JSON.parse(kunai_$('header').attr('data-kunai-mdinfo'));
      this.log.info("data-kunai-mdinfo", mdinfo);
      this.meta = new Meta(this.log, config, mdinfo, this.onCodeFound.bind(this));
      kunai_$('.yata > .codehilite').addClass('kunai-code');
      this.log.info("loaded (".concat(desc, ")"));
    }
  }, {
    key: "onCodeFound",
    value: function onCodeFound(meta, id) {
      this.yatas.set(id, new Yata(this.log, this.wand, meta.getCode(id)));
    }
  }, {
    key: "initSidebar",
    value: function () {
      var _initSidebar = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee3() {
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.ui.sidebar = new Sidebar(this.log);
                return _context3.abrupt("return", this.ui.sidebar);
              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function initSidebar() {
        return _initSidebar.apply(this, arguments);
      }
      return initSidebar;
    }()
  }, {
    key: "initUI",
    value: function () {
      var _initUI = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee4() {
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.ui.navbar = new Navbar(this.log);
                this.ui.content = new Content(this.log);
              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function initUI() {
        return _initUI.apply(this, arguments);
      }
      return initUI;
    }()
  }, {
    key: "onDatabase",
    value: function () {
      var _onDatabase = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee5(db) {
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // this.log.debug(`onDatabase`, db)
                badge_onDatabase(db);
                _context5.next = 3;
                return this.ui.sidebar.onDatabase(db);
              case 3:
                _context5.next = 5;
                return this.ui.sidebar.treeview.onPageID(this.meta.page_id);
              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function onDatabase(_x) {
        return _onDatabase.apply(this, arguments);
      }
      return onDatabase;
    }()
  }, {
    key: "initCRSearch",
    value: function () {
      var _initCRSearch = (0,asyncToGenerator/* default */.A)(/*#__PURE__*/regenerator_default().mark(function _callee6(isEnabled) {
        var _this = this;
        var dynamic_base_url, online_base_url, database_url, crs, e;
        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (isEnabled) {
                  _context6.next = 2;
                  break;
                }
                return _context6.abrupt("return", null);
              case 2:
                _context6.next = 4;
                return this.initSidebar();
              case 4:
                // Dynamically set the base_url
                dynamic_base_url = function () {
                  // Determine the location of the website base
                  var current_script = document.currentScript || document.querySelector('script[src*="static/kunai/js/kunai.js"]');
                  if (current_script) {
                    // Try to determine the base_url based on the location of this script
                    // ({base_url}/static/kunai/js/kunai.js).
                    var url_kunai = current_script.getAttribute("src");
                    var url = url_kunai.replace(/\bstatic\/kunai\/js\/kunai\.js([?#].*)?$/, "");
                    if (url != url_kunai) return url == "" ? "/" : url;
                  }
                  // Fallback case assuming that the website is hosted at the top level
                  return "/";
                }(); // Determine the project website URL, which is assumed to be stored in
                // <meta name="twietter:url" content="..." /> or in <meta property="og:url"
                // content="..." />.
                online_base_url = function () {
                  var meta = document.querySelector('meta[name="twitter:url"]') || document.querySelector('meta[property="og:url"]');
                  if (meta && meta.content) {
                    var m = meta.content.toString().match(/^https?:\/\/[^/]*\//);
                    if (m) return m[0];
                  }
                  return null;
                }();
                database_url = function () {
                  // Determine the location of the database file "crsearch.json".
                  var current_script = document.currentScript || document.querySelector('script[src*="kunai/js/kunai.js"]');
                  if (current_script) {
                    // A special care is needed for local HTML files (file://...).  When a
                    // HTML in a local file system is directly opened in a Web browser,
                    // "static/crsearch/crsearch.json" cannot be read using XHR due to the
                    // CORS (cross-origin resource sharing) policy for the local files.
                    try {
                      if (/^file:\/\//.test(current_script.src)) {
                        var _url_kunai = current_script.getAttribute("src");

                        // When the current script file (kunai.js) is located in an expected
                        // path in the tree, we try to load the local database file
                        // "crsearch/crsearch.js" in JSONP format.
                        var _url = _url_kunai.replace(/\bkunai\/js\/kunai\.js([?#].*)?$/, "crsearch/crsearch.js");
                        if (_url != _url_kunai) return _url;

                        // Try to download "crsearch.json" from the project website.
                        if (online_base_url) return online_base_url + "static/crsearch/crsearch.json";
                      }
                    } catch (e) {
                      _this.log.warn('Failed to handle file:// protocol:', e);
                      // フォールバックとして通常のURLを使用
                    }

                    // Try to determine the position of crsearch.json
                    // ({base_url}/static/crsearch/crsearch.json) based on the location of
                    // this script ({base_url}/static/kunai/js/kunai.js).
                    var url_kunai = current_script.getAttribute("src");
                    var url = url_kunai.replace(/\bkunai\/js\/kunai\.js([?#].*)?$/, "crsearch/crsearch.json");
                    if (url != url_kunai) return url;
                  }

                  // Fallback case assuming that the website is hosted at the top level
                  return "/static/crsearch/crsearch.json";
                }();
                crs = new crsearch/* CRSearch */.KG({
                  onDatabase: this.onDatabase.bind(this),
                  base_url: dynamic_base_url,
                  online_base_url: online_base_url
                });
                crs.database(database_url);
                e = kunai_$('.crsearch');
                _context6.next = 12;
                return crs.searchbox(e);
              case 12:
                e.addClass('loaded');
                return _context6.abrupt("return", crs);
              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function initCRSearch(_x2) {
        return _initCRSearch.apply(this, arguments);
      }
      return initCRSearch;
    }()
  }]);
  return Kunai;
}();
(0,defineProperty/* default */.A)(Kunai, "defaultOptions", {
  compat: true
});


/***/ }),

/***/ 9346:
/***/ (function(module) {

var Theme = ['3024-day', '3024-night', 'abcdef', 'ambiance-mobile', 'ambiance', 'base16-dark', 'base16-light', 'bespin', 'blackboard', 'cobalt', 'colorforth', 'dracula', 'duotone-dark', 'duotone-light', 'eclipse', 'elegant', 'erlang-dark', 'hopscotch', 'icecoder', 'isotope', 'lesser-dark', 'liquibyte', 'material', 'mbo', 'mdn-like', 'midnight', 'monokai', 'neat', 'neo', 'night', 'panda-syntax', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'railscasts', 'rubyblue', 'seti', 'solarized', 'the-matrix', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'ttcn', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light', 'yeti', 'zenburn'];

// NB: this is intended obsolete export for Webpack metadata
module.exports = Theme;

/***/ }),

/***/ 1792:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./3024-day.css": 654,
	"./3024-night.css": 7354,
	"./abbott.css": 3764,
	"./abcdef.css": 729,
	"./ambiance-mobile.css": 3933,
	"./ambiance.css": 2496,
	"./ayu-dark.css": 5536,
	"./ayu-mirage.css": 7581,
	"./base16-dark.css": 9409,
	"./base16-light.css": 5569,
	"./bespin.css": 9827,
	"./blackboard.css": 999,
	"./cobalt.css": 3537,
	"./colorforth.css": 5302,
	"./darcula.css": 2122,
	"./dracula.css": 6228,
	"./duotone-dark.css": 8165,
	"./duotone-light.css": 9885,
	"./eclipse.css": 4957,
	"./elegant.css": 5564,
	"./erlang-dark.css": 7924,
	"./gruvbox-dark.css": 5674,
	"./hopscotch.css": 8005,
	"./icecoder.css": 8500,
	"./idea.css": 4313,
	"./isotope.css": 6575,
	"./juejin.css": 9271,
	"./lesser-dark.css": 8041,
	"./liquibyte.css": 6888,
	"./lucario.css": 419,
	"./material-darker.css": 6703,
	"./material-ocean.css": 382,
	"./material-palenight.css": 4410,
	"./material.css": 4059,
	"./mbo.css": 9494,
	"./mdn-like.css": 7641,
	"./midnight.css": 6960,
	"./monokai.css": 4284,
	"./moxer.css": 8279,
	"./neat.css": 7576,
	"./neo.css": 4056,
	"./night.css": 3264,
	"./nord.css": 639,
	"./oceanic-next.css": 6988,
	"./panda-syntax.css": 2140,
	"./paraiso-dark.css": 6674,
	"./paraiso-light.css": 7152,
	"./pastel-on-dark.css": 1584,
	"./railscasts.css": 737,
	"./rubyblue.css": 4420,
	"./seti.css": 1821,
	"./shadowfox.css": 2513,
	"./solarized.css": 6119,
	"./ssms.css": 2542,
	"./the-matrix.css": 7237,
	"./tomorrow-night-bright.css": 5287,
	"./tomorrow-night-eighties.css": 7157,
	"./ttcn.css": 4399,
	"./twilight.css": 7384,
	"./vibrant-ink.css": 4935,
	"./xq-dark.css": 4876,
	"./xq-light.css": 7866,
	"./yeti.css": 1407,
	"./yonce.css": 316,
	"./zenburn.css": 4078
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 1792;

/***/ }),

/***/ 6059:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
/* harmony default export */ __webpack_exports__.A = ("## TOPLEVEL_CATEGORY\n\n* cpprefjp[index]\n* リファレンス[reference]\n* モジュール[module]\n* 言語機能[lang]\n* 処理系[implementation]\n* コンパイラの実装状況[implementation-status]\n* C++国際標準規格[international-standard]\n* 標準規格と処理系[implementation-compliance]\n* 外部ライブラリ[third_party_library]\n* テーマ別解説[article]\n* コミュニティリスト[mailing-lists]\n* スタイル[working_style]\n* はじめてのコントリビュート[start_editing]\n* 編集方針[edit_policy]\n\n\n## GLOBAL_QUALIFY_LIST\n\n* implementation-defined[italic]\n* SFINAE[link /lang/cpp11/sfinae_expressions.md]\n* thread_local[link /lang/cpp11/thread_local_storage.md]\n* decltype(auto)[link /lang/cpp14/decltype_auto.md]\n* <algorithm>[link /reference/algorithm.md]\n    * std::copy[link /reference/algorithm/copy.md]\n    * std::for_each[link /reference/algorithm/for_each.md]\n    * std::sort[link /reference/algorithm/sort.md]\n* <array>[link /reference/array.md]\n    * std::array[link /reference/array.md]\n* <atomic>[link /reference/atomic.md]\n    * std::atomic[link /reference/atomic/atomic.md]\n    * std::memory_order_acq_rel[link /reference/atomic/memory_order.md]\n    * std::memory_order_acquire[link /reference/atomic/memory_order.md]\n    * std::memory_order_consume[link /reference/atomic/memory_order.md]\n    * std::memory_order_relaxed[link /reference/atomic/memory_order.md]\n    * std::memory_order_release[link /reference/atomic/memory_order.md]\n    * std::memory_order_seq_cst[link /reference/atomic/memory_order.md]\n* <bitset>[link /reference/bitset.md]\n    * std::bitset[link /reference/bitset.md]\n* <cassert>[link /reference/cassert.md]\n    * assert[link /reference/cassert/assert.md]\n* <cerrno>[link /reference/cerrno.md]\n* <cfenv>[link /reference/cfenv.md]\n* <cfloat>[link /reference/cfloat.md]\n* <chrono>[link /reference/chrono.md]\n* <climits>[link /reference/climits.md]\n* <cmath>[link /reference/cmath.md]\n* <codecvt>[link /reference/codecvt.md]\n* <complex>[link /reference/complex.md]\n* <condition_variable>[link /reference/condition_variable.md]\n    * std::condition_variable[link /reference/condition_variable/condition_variable.md]\n* <cstddef>[link /reference/cstddef.md]\n    * std::size_t[link /reference/cstddef/size_t.md]\n* <cstdint>[link /reference/cstdint.md]\n    * std::uint8_t[link /reference/cstdint/uint8_t.md]\n* <cstdlib>[link /reference/cstdlib.md]\n* <deque>[link /reference/deque.md]\n    * std::deque[link /reference/deque.md]\n* <exception>[link /reference/exception.md]\n* <forward_list>[link /reference/forward_list.md]\n    * std::forward_list[link /reference/forward_list.md]\n* <fstream>[link /reference/fstream.md]\n* <functional>[link /reference/functional.md]\n* <future>[link /reference/future.md]\n* <initializer_list>[link /reference/initializer_list.md]\n    * std::initializer_list[link /reference/initializer_list.md]\n* <iomanip>[link /reference/iomanip.md]\n* <ios>[link /reference/ios.md]\n    * std::boolalpha[link /reference/ios/boolalpha.md]\n* <iostream>[link /reference/iostream.md]\n    * std::cout[link /reference/iostream/cout.md]\n* <istream>[link /reference/istream.md]\n* <iterator>[link /reference/iterator.md]\n    * std::back_inserter[link /reference/iterator/back_inserter.md]\n    * std::begin[link /reference/iterator/begin.md]\n    * std::distance[link /reference/iterator/distance.md]\n    * std::end[link /reference/iterator/end.md]\n    * std::ostream_iterator[link /reference/iterator/ostream_iterator.md]\n* <limits>[link /reference/limits.md]\n    * std::numeric_limits[link /reference/limits/numeric_limits.md]\n* <list>[link /reference/list.md]\n    * std::list[link /reference/list.md]\n* <locale>[link /reference/locale.md]\n* <map>[link /reference/map.md]\n    * std::map[link /reference/map/map.md]\n* <memory>[link /reference/memory.md]\n    * std::allocator[link /reference/memory/allocator.md]\n    * std::shared_ptr[link /reference/memory/shared_ptr.md]\n    * std::unique_ptr[link /reference/memory/unique_ptr.md]\n* <mutex>[link /reference/mutex.md]\n    * std::lock_guard[link /reference/mutex/lock_guard.md]\n    * std::unique_lock[link /reference/mutex/unique_lock.md]\n    * std::mutex[link /reference/mutex/mutex.md]\n* <new>[link /reference/new.md]\n* <numeric>[link /reference/numeric.md]\n    * std::accumulate[link /reference/numeric/accumulate.md]\n    * std::iota[link /reference/numeric/iota.md]\n* <optional>[link /reference/optional.md]\n    * std::optional[link /reference/optional/optional.md]\n* <ostream>[link /reference/ostream.md]\n    * std::endl[link /reference/ostream/endl.md]\n* <queue>[link /reference/queue.md]\n* <random>[link /reference/random.md]\n* <ratio>[link /reference/ratio.md]\n* <regex>[link /reference/regex.md]\n* <scoped_allocator>[link /reference/scoped_allocator.md]\n* <set>[link /reference/set.md]\n    * std::set[link /reference/set/set.md]\n* <shared_mutex>[link /reference/shared_mutex.md]\n* <sstream>[link /reference/sstream.md]\n* <stack>[link /reference/stack.md]\n* <stdexcept>[link /reference/stdexcept.md]\n* <streambuf>[link /reference/streambuf.md]\n* <string>[link /reference/string.md]\n    * std::basic_string[link /reference/string/basic_string.md]\n    * std::char_traits[link /reference/string/char_traits.md]\n    * std::string[link /reference/string/basic_string.md]\n    * std::u16string[link /reference/string/basic_string.md]\n    * std::u32string[link /reference/string/basic_string.md]\n    * std::wstring[link /reference/string/basic_string.md]\n* <system_error>[link /reference/system_error.md]\n* <thread>[link /reference/thread.md]\n    * std::thread[link /reference/thread/thread.md]\n    * t.join()[link /reference/thread/thread/join.md]\n    * t1.join()[link /reference/thread/thread/join.md]\n    * t2.join()[link /reference/thread/thread/join.md]\n    * t3.join()[link /reference/thread/thread/join.md]\n* <tuple>[link /reference/tuple.md]\n* <type_traits>[link /reference/type_traits.md]\n    * std::false_type[link /reference/type_traits/false_type.md]\n    * std::is_same[link /reference/type_traits/is_same.md]\n    * std::is_same_v[link /reference/type_traits/is_same.md]\n    * std::true_type[link /reference/type_traits/true_type.md]\n* <typeindex>[link /reference/typeindex.md]\n* <typeinfo>[link /reference/typeinfo.md]\n* <unordered_map>[link /reference/unordered_map.md]\n    * std::unordered_map[link /reference/unordered_map/unordered_map.md]\n* <unordered_set>[link /reference/unordered_set.md]\n    * std::unordered_set[link /reference/unordered_set/unordered_set.md]\n* <utility>[link /reference/utility.md]\n    * std::make_pair[link /reference/utility/make_pair.md]\n    * std::pair[link /reference/utility/pair.md]\n* <valarray>[link /reference/valarray.md]\n    * std::valarray[link /reference/valarray/valarray.md]\n* <vector>[link /reference/vector.md]\n    * std::vector[link /reference/vector.md]\n    * v.begin()[link /reference/vector/begin.md]\n    * v.end()[link /reference/vector/end.md]\n    * v.size()[link /reference/vector/size.md]\n    * v1.begin()[link /reference/vector/begin.md]\n    * v1.end()[link /reference/vector/end.md]\n    * v1.size()[link /reference/vector/size.md]\n    * v2.begin()[link /reference/vector/begin.md]\n    * v2.end()[link /reference/vector/end.md]\n    * v2.size()[link /reference/vector/size.md]\n    * v3.begin()[link /reference/vector/begin.md]\n    * v3.end()[link /reference/vector/end.md]\n    * v3.size()[link /reference/vector/size.md]\n\n");

/***/ }),

/***/ 2841:
/***/ (function(module) {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"order_priority":[["op_deduction_guide","推論補助"],["op_initializer","初期化仕様"],["op_constructor","コンストラクタ"],["op_destructor","デストラクタ"],["__functions__","通常の関数や非メンバ関数(op_でもtype-でもないもの)"],["__types__","メンバ型（頭にtype-が付いているもの）"],["__converter__","変換演算子(ここに列挙した以外で頭にop_が付いているもの)"],["op_ostream","operator<<(os, b)"],["op_istream","operator>>(is, b)"],["op_at","operator[]"],["op_call","operator()"],["op_deref","operator*"],["op_arrow","operator->"],["op_assign","operator="],["op_plus_assign","operator+="],["op_minus_assign","operator-="],["op_multiply_assign","operator*="],["op_divide_assign","operator/="],["op_modulo_assign","operator%="],["op_and_assign","operator&="],["op_or_assign","operator|="],["op_xor_assign","operator^="],["op_left_shift_assign","operator<<="],["op_right_shift_assign","operator>>="],["op_logical_and","operator&&(a, b)"],["op_logical_or","operator||(a, b)"],["op_bool","operator bool"],["op_not","operator!"],["op_flip","operator~"],["op_equal","operator==(a, b)"],["op_not_equal","operator!=(a, b)"],["op_less","operator<(a, b)"],["op_less_equal","operator<=(a, b)"],["op_greater","operator>(a, b)"],["op_greater_equal","operator>=(a, b)"],["op_compare_3way","operator<=>(a, b)"],["op_increment","operator++"],["op_decrement","operator--"],["op_unary_plus","operator+"],["op_unary_minus","operator-"],["op_plus","operator+(a, b)"],["op_minus","operator-(a, b)"],["op_multiply","operator*(a, b)"],["op_divide","operator/(a, b)"],["op_modulo","operator%(a, b)"],["op_and","operator&(a, b)"],["op_or","operator|(a, b)"],["op_xor","operator^(a, b)"],["op_left_shift","operator<<(a, b)"],["op_right_shift","operator>>(a, b)"]]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			257: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkKunai"] = self["webpackChunkKunai"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [88], function() { return __webpack_require__(9066); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	window.Kunai = __webpack_exports__.Kunai;
/******/ 	
/******/ })()
;