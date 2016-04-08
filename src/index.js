/**
 * Class representing simple Emitter.
 */
export default class Emitter {

  /**
   * Creates simple Emitter.
   */
  constructor () {
    this._listeners = {};
  }

  /**
   * Adds event listener. If listener is identical to existing one, it will be moved to the end of the queue.
   * @param {string} id - Name of the event to be listened to.
   * @param {Function} fn - Function to be called when event is fired.
   * @param {*} context - Context in which function will be fired.
   */
  add (id, fn, context) {
    this._add(id, fn, context, false);
  }

  /**
   * Adds event listener that will fire only once.
   * @param {string} id - Name of the event to be listened to.
   * @param {Function} fn - Function to be called when event is fired.
   * @param {*} context - Context in which function will be fired.
   */
  once (id, fn, context) {
    this._add(id, fn, context, true);
  }

  /**
   * Removes event listener. Does not hing if such listener does not exist.
   * @param {string} id - Name of the event to be listened to.
   * @param {Function} fn - Function to be called when event is fired.
   */
  remove (id, fn) {
    if (validateId(id) && validateFunction(fn)) {
      let found_index = -1;
      const category = this._getCategory(id);

      category.forEach((item, i) => {
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
   * @param {Array} params - List of parameters to be passed to functions.
   */
  fire (id, params = []) {
    if (validateId(id)) {
      const once_functions = [];
      const category = this._getCategory(id);

      category.forEach((item) => {
        if (item.once === true) {
          once_functions.push(item.fn);
        }
        item.fn.apply(item.context, params);
      });

      once_functions.forEach((fn) => {
        this.remove(id, fn);
      });
    }
  }

  _getCategory (id) {
    if (typeof this._listeners[id] === 'undefined') {
      this._listeners[id] = [];
    }
    return this._listeners[id];
  }

  _add (id, fn, context = null, once) {
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

}


function validateId (id, message) {
  return validateInput(id, 'string', 'Invalid function.');
}

function validateFunction (fn, message) {
  return validateInput(fn, 'function', 'Invalid function.');
}

function validateInput (input, expected_type, message) {
  if (typeof input !== expected_type) {
    throw new Error('Emitter: ' + message);
  }
  return true;
}
