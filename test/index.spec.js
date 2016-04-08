import Emitter from './../src/';


describe('Emitter', function () {

  let x, fn1, fn2, fn3;

  beforeEach(function () {
    x = new Emitter();
    fn1 = jasmine.createSpy('fn1');
    fn2 = jasmine.createSpy('fn2');
    fn3 = jasmine.createSpy('fn3');
  });

  describe('add', function () {

    it('should remember all added listeners, in order', function () {
      x.add('aaa', fn1);
      x.add('aaa', fn2);
      x.add('bbb', fn3);
      expect(x._listeners['aaa'][0].fn).toEqual(fn1);
      expect(x._listeners['aaa'][1].fn).toEqual(fn2);
      expect(x._listeners['bbb'][0].fn).toEqual(fn3);
    });

    it('should add only unique listeners', function () {
      x.add('aaa', fn1);
      x.add('aaa', fn1);
      expect(x._listeners['aaa'].length).toEqual(1);
    });

    it('should move identical listener to end of queue', function () {
      x.add('aaa', fn1);
      x.add('aaa', fn2);
      x.add('aaa', fn1);
      expect(x._listeners['aaa'].length).toEqual(2);
      expect(x._listeners['aaa'][0].fn).toEqual(fn2);
      expect(x._listeners['aaa'][1].fn).toEqual(fn1);
    });

    it('should remember context', function () {
      const obj = {};
      x.add('aaa', fn1, obj);
      expect(x._listeners['aaa'][0].context).toEqual(obj);
    });

    it('should throw if no ID is provided', function () {
      const add_function = function() {
        x.add();
      };
      expect(add_function).toThrow();
    });

    it('should throw if no function is provided', function () {
      const add_function = function() {
        x.add('aaa');
      };
      expect(add_function).toThrow();
    });

    it('should throw if non-function is provided', function () {
      const add_function = function() {
        x.add('aaa', 'xxx');
      };
      expect(add_function).toThrow();
    });

  });

  describe('remove', function () {

    beforeEach(function () {
      x.add('aaa', fn1);
    });

    it('should remove existing listener', function () {
      x.remove('aaa', fn1);
      expect(x._listeners['aaa'][0]).not.toBeDefined();
    });

    it('should do nothing if id does not exist', function () {
      x.remove('xxx', fn1);
      expect(x._listeners['aaa'][0].fn).toEqual(fn1);
    });

    it('should do nothing if listener does not exist', function () {
      x.remove('aaa', fn2);
      expect(x._listeners['aaa'][0].fn).toEqual(fn1);
    });

    it('should throw if no ID is provided', function () {
      const remove_function = function() {
        x.remove();
      };
      expect(remove_function).toThrow();
    });

    it('should throw if no function is provided', function () {
      const remove_function = function() {
        x.remove('aaa');
      };
      expect(remove_function).toThrow();
    });

    it('should throw if non-function is provided', function () {
      const remove_function = function() {
        x.remove('aaa', 'xxx');
      };
      expect(remove_function).toThrow();
    });

  });

  describe('once', function () {

    it('should add as listener', function () {
      x.once('aaa', fn1);
      expect(x._listeners['aaa'][0].fn).toEqual(fn1);
      expect(x._listeners['aaa'][0].once).toEqual(true);
    });

    it('should remove after first call', function () {
      x.once('aaa', fn1);
      x.fire('aaa');
      expect(x._listeners['aaa'][0]).not.toBeDefined();
    });

  });

  describe('fire', function () {

    it('should call all matching listeners', function () {
      x.add('aaa', fn1);
      x.add('aaa', fn2);
      x.fire('aaa');
      expect(fn1).toHaveBeenCalled();
      expect(fn2).toHaveBeenCalled();
    });

    it('should not call non-matching listeners', function () {
      x.add('aaa', fn1);
      x.add('bbb', fn2);
      x.fire('aaa');
      expect(fn1).toHaveBeenCalled();
      expect(fn2).not.toHaveBeenCalled();
    });

    it('should send params to listeners', function () {
      x.add('aaa', fn1);
      x.fire('aaa', ['bbb', 'ccc']);
      expect(fn1).toHaveBeenCalledWith('bbb', 'ccc');
    });

    it('should fire in proper order', function () {
      const result = [];
      x.add('aaa', function () {result.push(1)});
      x.add('aaa', function () {result.push(2)});
      x.fire('aaa');
      expect(result).toEqual([1, 2]);
    });

    it('should fire with proper context', function (done) {
      const obj = {};
      const fn = function () {
        expect(this).toEqual(obj);
        done();
      };
      x.add('aaa', fn, obj);
      x.fire('aaa');
    });

  });

});
