'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing simple Emitter.
 */

var Emitter = function () {

  /**
   * Creates simple Emitter.
   */

  function Emitter() {
    _classCallCheck(this, Emitter);

    this._listeners = {};
  }

  /**
   * Adds event listener. If listener is identical to existing one, it will be moved to the end of the queue.
   * @param {string} id - Name of the event to be listened to.
   * @param {Function} fn - Function to be called when event is fired.
   * @param {*} [context] - Context in which function will be fired.
   */


  _createClass(Emitter, [{
    key: 'add',
    value: function add(id, fn, context) {
      this._add(id, fn, context, false);
    }

    /**
     * Adds event listener that will fire only once.
     * @param {string} id - Name of the event to be listened to.
     * @param {Function} fn - Function to be called when event is fired.
     * @param {*} [context] - Context in which function will be fired.
     */

  }, {
    key: 'once',
    value: function once(id, fn, context) {
      this._add(id, fn, context, true);
    }

    /**
     * Removes event listener. Does not hing if such listener does not exist.
     * @param {string} id - Name of the event to be listened to.
     * @param {Function} fn - Function to be called when event is fired.
     */

  }, {
    key: 'remove',
    value: function remove(id, fn) {
      if (validateId(id) && validateFunction(fn)) {
        var found_index = -1;
        var category = this._getCategory(id);

        category.forEach(function (item, i) {
          if (item.fn === fn) {
            found_index = i;
          }
        });

        if (found_index !== -1) {
          category.splice(found_index, 1);
        }
      }
    }

    /**
     * Fires all event listeners with given ID.
     * @param {string} id - Name of the event to be fired.
     * @param {Array} [params] - List of parameters to be passed to functions.
     */

  }, {
    key: 'fire',
    value: function fire(id) {
      var _this = this;

      var params = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      if (validateId(id)) {
        (function () {
          var once_functions = [];
          var category = _this._getCategory(id);

          category.forEach(function (item) {
            if (item.once === true) {
              once_functions.push(item.fn);
            }
            item.fn.apply(item.context, params);
          });

          once_functions.forEach(function (fn) {
            _this.remove(id, fn);
          });
        })();
      }
    }
  }, {
    key: '_getCategory',
    value: function _getCategory(id) {
      if (typeof this._listeners[id] === 'undefined') {
        this._listeners[id] = [];
      }
      return this._listeners[id];
    }
  }, {
    key: '_add',
    value: function _add(id, fn) {
      var context = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
      var once = arguments[3];

      if (validateId(id) && validateFunction(fn)) {

        // this will cause duplicate listener to be moved to the end of queue
        this.remove(id, fn);

        this._getCategory(id).push({
          fn: fn,
          context: context,
          once: once
        });
      }
    }
  }]);

  return Emitter;
}();

exports.default = Emitter;


function validateId(id) {
  return validateInput(id, 'string', 'Invalid ID.');
}

function validateFunction(fn) {
  return validateInput(fn, 'function', 'Invalid function.');
}

function validateInput(input, expected_type, message) {
  if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== expected_type) {
    throw new Error('Emitter: ' + message);
  }
  return true;
}