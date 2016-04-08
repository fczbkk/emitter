# Emitter

Simple JavaScript event emitter.

## Documentation

### Emitter

Class representing simple Emitter.

#### add

Adds event listener. If listener is identical to existing one, it will be moved to the end of the queue.

**Parameters**

-   `id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of the event to be listened to.
-   `fn` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to be called when event is fired.
-   `context` **Any** Context in which function will be fired.

#### constructor

Creates simple Emitter.

#### fire

Fires all event listeners with given ID.

**Parameters**

-   `id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of the event to be fired.
-   `params` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)=(default \[])** List of parameters to be passed to functions.

#### once

Adds event listener that will fire only once.

**Parameters**

-   `id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of the event to be listened to.
-   `fn` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to be called when event is fired.
-   `context` **Any** Context in which function will be fired.

#### remove

Removes event listener. Does not hing if such listener does not exist.

**Parameters**

-   `id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Name of the event to be listened to.
-   `fn` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to be called when event is fired.

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/fczbkk/emitter/issues) or send me an e-mail at <a href="mailto:riki@fczbkk.com">riki@fczbkk.com</a>.

## License

Emitter is published under the [MIT license](https://github.com/fczbkk/emitter/blob/master/LICENSE).
