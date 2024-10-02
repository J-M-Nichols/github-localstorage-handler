// test/GitHubStorageHandlers.test.js
import { expect } from 'chai';
import GitHubStorageHandlers from '../GitHubStorageHandlers.js';
import GitHubStorageHandler from '../GitHubStorageHandler.js';

describe('GitHubStorageHandlers', function() {
  let handlers;
  const testPath1 = 'testPath1';
  const testPath2 = 'testPath2';

  beforeEach(function() {
    handlers = new GitHubStorageHandlers(testPath1, testPath2);
    localStorage.clear();
  });

  it('should initialize with the correct number of handlers', function() {
    expect(handlers.pathObjects).to.have.lengthOf(2);
  });

  it('should return an existing handler for a known path', function() {
    const handler = handlers.getHandler(testPath1);
    expect(handler).to.be.instanceOf(GitHubStorageHandler);
  });

  it('should create a new handler for an unknown path', function() {
    const newPath = 'newPath';
    const handler = handlers.getHandler(newPath);
    expect(handler).to.be.instanceOf(GitHubStorageHandler);
    expect(handlers.pathObjects).to.have.lengthOf(3);
  });

  it('should set and get a string item', function() {
    handlers.setItem(testPath1, 'testValue');
    expect(handlers.getItem(testPath1)).to.equal('testValue');
  });

  it('should set and get an object', function() {
    const obj = { key: 'value' };
    handlers.setObject(testPath1, obj);
    expect(handlers.getObject(testPath1, {})).to.deep.equal(obj);
  });

  it('should return expected object if none is set', function() {
    const expected = { default: 'value' };
    expect(handlers.getObject(testPath1, expected)).to.deep.equal(expected);
  });

  it('should set and get a number', function() {
    handlers.setItem(testPath1, 42);
    expect(handlers.getNumber(testPath1, 0)).to.equal(42);
  });

  it('should return expected number if none is set', function() {
    expect(handlers.getNumber(testPath1, 10)).to.equal(10);
  });

  it('should set and get a boolean', function() {
    handlers.setItem(testPath1, true);
    expect(handlers.getBoolean(testPath1, false)).to.equal(true);
  });
  it('should return expected boolean if none is set', function() {
    expect(handlers.getBoolean(testPath1, true)).to.equal(true);
  });

  it('should set and get a string', function() {
    handlers.setItem(testPath1, 'hello');
    expect(handlers.getString(testPath1, 'default')).to.equal('hello');
  });

  it('should return expected string if none is set', function() {
    expect(handlers.getString(testPath1, 'default')).to.equal('default');
  });

  it('should throw an error if getHandler is called with a non-string path', function() {
    expect(() => handlers.getHandler(123)).to.throw();
  });

  it('should throw an error if setObject is not given an object', function() {
    expect(() => handlers.setObject(testPath1, 'notAnObject')).to.throw('Expected value must be of type object!');
  });

  it('should throw an error if getObject is not given an object', function() {
    expect(() => handlers.getObject(testPath1, 'notAnObject')).to.throw('Expected value must be of type object!');
  });

  it('should throw an error if getNumber is not given a number', function() {
    expect(() => handlers.getNumber(testPath1, 'notANumber')).to.throw('Expected value must be of type number!');
  });

  it('should throw an error if getBoolean is not given a boolean', function() {
    expect(() => handlers.getBoolean(testPath1, 'notABoolean')).to.throw('Expected value must be of type boolean!');
  });

  it('should throw an error if getString is not given a string', function() {
    expect(() => handlers.getString(testPath1, 123)).to.throw('Expected value must be of type string!');
  });
});
