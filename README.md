# Emitter

Simple JavaScript event emitter.

## Documentation

### Listener

Object returned when adding new listener. Has a `remove()` method, which is handy for working with anonymous functions.

**Properties**

-   `remove` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** When called, the listener will be removed from Emitter.

**Examples**

```javascript
// add anonymous function
var my_listener = my_emitter.add('aaa', function () {...});
// remove the listener without the need to reference the anonymous function
my_listener.remove();
```

### index

Class representing simple Emitter.

### constructor

Creates simple Emitter.

### add

Adds event listener. If listener is identical to existing one, it will be moved to the end of the queue.

**Parameters**

-   `id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of the event to be listened to.
-   `fn` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to be called when event is fired.
-   `context` **\[Any]** Context in which function will be fired.

Returns **[Listener](#listener)** 

### once

Adds event listener that will fire only once.

**Parameters**

-   `id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of the event to be listened to.
-   `fn` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to be called when event is fired.
-   `context` **\[Any]** Context in which function will be fired.

Returns **[Listener](#listener)** 

### remove

Removes event listener. Does nothing if such listener does not exist.

**Parameters**

-   `id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of the event to be listened to.
-   `fn` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to be called when event is fired.

### fire

Fires all event listeners with given ID.

**Parameters**

-   `id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of the event to be fired.
-   `params` **\[[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)]** List of parameters to be passed to functions.

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/fczbkk/emitter/issues) or send me an e-mail at <a href="mailto:riki@fczbkk.com">riki@fczbkk.com</a>.

## License

Emitter is published under the [MIT license](https://github.com/fczbkk/emitter/blob/master/LICENSE).
