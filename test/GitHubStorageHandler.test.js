// test/GitHubStorageHandler.test.js
import { expect } from 'chai';
import {JSDOM} from 'jsdom'
import GitHubStorageHandler from '../GitHubStorageHandler.js';

const {window} = new JSDOM('', {url:'http://localhost'});
global.window = window;
global.localStorage = window.localStorage;

describe('GitHubStorageHandler', function() {
  let handler;
  const testPath = 'testPath';
  const storagePrefix = window.location.pathname;

  beforeEach(function() {
    handler = new GitHubStorageHandler(testPath);
    localStorage.clear();
  });

  it('should initialize with the correct path', function() {
    expect(handler.path).to.equal(`${storagePrefix}/${testPath}`);
    expect(handler.basePath).to.equal(testPath);
  });

  it('should set and get a string item', function() {
    handler.setItem('testValue');
    expect(handler.getItem()).to.equal('testValue');
  });

  it('should set and get an object', function() {
    const obj = { key: 'value' };
    handler.setObject(obj);
    expect(handler.getObject({})).to.deep.equal(obj);
  });

  it('should return expected object if none is set', function() {
    const expected = { default: 'value' };
    expect(handler.getObject(expected)).to.deep.equal(expected);
  });

  it('should set and get a number', function() {
    handler.setItem(42);
    expect(handler.getNumber(0)).to.equal(42);
  });

  it('should return expected number if none is set', function() {
    expect(handler.getNumber(10)).to.equal(10);
  });

  it('should set and get a boolean', function() {
    handler.setItem(true);
    expect(handler.getBoolean(false)).to.equal(true);
  });

  it('should return expected boolean if none is set', function() {
    expect(handler.getBoolean(true)).to.equal(true);
  });

  it('should set and get a string', function() {
    handler.setItem('hello');
    expect(handler.getString('default')).to.equal('hello');
  });

  it('should return expected string if none is set', function() {
    expect(handler.getString('default')).to.equal('default');
  });

  it('should throw an error if path is not a string', function() {
    expect(() => new GitHubStorageHandler(123)).to.throw('The path must be of type string!');
  });

  it('should throw an error if setObject is not given an object', function() {
    expect(() => handler.setObject('notAnObject')).to.throw('Expected value must be of type object!');
  });
  it('should throw an error if getObject is not given an object', function() {
    expect(() => handler.getObject('notAnObject')).to.throw('Expected value must be of type object!');
  });

  it('should throw an error if getNumber is not given a number', function() {
    expect(() => handler.getNumber('notANumber')).to.throw('Expected value must be of type number!');
  });

  it('should throw an error if getBoolean is not given a boolean', function() {
    expect(() => handler.getBoolean('notABoolean')).to.throw('Expected value must be of type boolean!');
  });

  it('should throw an error if getString is not given a string', function() {
    expect(() => handler.getString(123)).to.throw('Expected value must be of type string!');
  });
});
