// test/GitHubStorageHandler.test.js
import { expect } from 'chai';
import {JSDOM} from 'jsdom'
import GitHubStorageHandler from '../GitHubStorageHandler.js';

const {window} = new JSDOM('', {url:'http://localhost'});
global.window = window;
global.localStorage = window.localStorage;

describe('GitHubStorageHandler', () => {
  let handler;
  const testPath = 'testPath';
  const storagePrefix = window.location.pathname;

  beforeEach(() => {
    handler = new GitHubStorageHandler(testPath);
    localStorage.clear();
  });

  //#region path
  it('should initialize with the correct path', () => {
    expect(handler.path).to.equal(`${storagePrefix}/${testPath}`);
    expect(handler.basePath).to.equal(testPath);
  });

  it('should throw an error if path is not a string', () => {
    expect(() => new GitHubStorageHandler(123)).to.throw('The path must be of type string!');
  });
  //#endregion

  //#region clear
  it('should clear the value from the path', ()=>{
    handler.setNumber(42)
    expect(handler.getNumber(0)).to.equal(42)

    handler.clear()
    expect(handler.getItem()).to.be.null
  })
  //#endregion

  //#region item
  it('should set and get a string item with getItem', () => {
    handler.setItem('testValue');
    expect(handler.getItem()).to.equal('testValue');
  });

  it('should set and get a string item with getExpectedItem', () => {
    handler.setItem('testValue');
    expect(handler.getExpectedItem('')).to.equal('testValue');
  });

  it('should get a null item when none is set', () => {
    expect(handler.getItem()).to.be.null
  });
  //#endregion

  //#region bigint
  it('should set and get a bigint item', ()=>{
    const item = 42n
    handler.setBigInt(item)
    expect(handler.getBigInt(0n)).to.equal(item)
  })

  it('should set and get a bigint item with setItem', ()=>{
    const item = 42n
    handler.setItem(item)
    expect(handler.getBigInt(0n)).to.equal(item)
  })

  it('should set and get a bigint item with setItem', ()=>{
    const item = 42n
    handler.setItem(item)
    expect(handler.getExpectedItem(0n)).to.equal(item)
  })

  it('should get a bigint item when none is set', ()=>{
    expect(handler.getBigInt(42n)).to.equal(42n)
  })

  it('should get a bigint item with getExpectedItem when none is set', ()=>{
    expect(handler.getExpectedItem(42n)).to.equal(42n)
  })

  it('should throw an error if getBigInt is not given a bigint', () => {
    expect(() => handler.getBigInt('notABoolean')).to.throw('Expected value must be of type bigint!');
  })

  it('should throw an error if setBigInt is not given a bigint', () => {
    expect(() => handler.setBigInt('notABoolean')).to.throw('Expected value must be of type bigint!');
  })
  //#endregion

  //#region function
  it('should set and get a Function item', ()=>{
    const func = (a,b)=>{return a+b}
    handler.setFunction(func)
    expect(handler.getFunction(()=>{})(2, 5)).to.equal(func(2, 5))
  })
  
  it('should set and get a Function item with setItem', ()=>{
    const func = (a,b)=>{return a+b}
    handler.setItem(func)
    expect(handler.getFunction(()=>{})(2, 5)).to.equal(func(2, 5))
  })

  it('should set and get a Function with getExpectedItem', ()=>{
    const func = (a,b)=>{return a+b}
    handler.setItem(func)
    expect(handler.getExpectedItem(()=>{})(2, 5)).to.equal(func(2, 5))
  })

  it('should get a Function item when none is set', ()=>{
    const func = (a, b)=>{return a+b}
    expect(handler.getFunction(func)(2, 5)).to.equal(func(2, 5))
  })

  it('should get a Function item with getExpectedItem when none is set', ()=>{
    const func = (a, b)=>{return a+b}
    expect(handler.getExpectedItem(func)(2, 5)).to.equal(func(2, 5))
  })

  it('should throw an error if getFunction is not given a function', () => {
    expect(() => handler.getFunction('notABoolean')).to.throw('Expected value must be of type function!');
  })

  it('should throw an error if setFunction is not given a function', () => {
    expect(() => handler.setFunction('notABoolean')).to.throw('Expected value must be of type function!');
  })
  //#endregion

  //#region symbol
  it('should set and get a Symbol item', ()=>{
    const key = 'value'
    const symb = Symbol(key)
    handler.setSymbol(symb)
    expect(handler.getSymbol(Symbol('wrong key')).description).to.equal(key)
  })

  it('should set and get a Symbol with setItem', ()=>{
    const key = 'value'
    const symb = Symbol(key)
    handler.setItem(symb)
    expect(handler.getSymbol(Symbol('wrong key')).description).to.equal(key)
  })

  it('should set and get a Symbol with getExpectedItem', ()=>{
    const key = 'value'
    const symb = Symbol(key)
    handler.setItem(symb)
    expect(handler.getExpectedItem(Symbol('wrong key')).description).to.equal(key)
  })

  it('should get a Symbol item when none is set', ()=>{
    const key = 'value'
    const symb = Symbol(key)
    expect(handler.getSymbol(symb).description).to.equal(key)
  })

  it('should get a Symbol item with getExpectedItem when none is set', ()=>{
    const key = 'value'
    const symb = Symbol(key)
    expect(handler.getExpectedItem(symb).description).to.equal(key)
  })

  it('should throw an error if getSymbol is not given a symbol', () => {
    expect(() => handler.getSymbol('notABoolean')).to.throw('Expected value must be of type symbol!');
  })

  it('should throw an error if setSymbol is not given a symbol', () => {
    expect(() => handler.setSymbol('notABoolean')).to.throw('Expected value must be of type symbol!');
  })
  //#endregion

  //#region object
  it('should set and get an object', () => {
    const obj = { key: 'value' };
    handler.setObject(obj);
    expect(handler.getObject({})).to.deep.equal(obj);
  })
  
  it('should set and get an object with setItem', () => {
    const obj = { key: 'value' };
    handler.setItem(obj);
    expect(handler.getObject({})).to.deep.equal(obj);
  })
  
  it('should set and get an object with getExpectedItem', () => {
    const obj = { key: 'value' };
    handler.setItem(obj);
    expect(handler.getExpectedItem({})).to.deep.equal(obj);
  })

  it('should get an object item when none is set', ()=>{
    const obj = { key: 'value' };
    expect(handler.getObject(obj)).to.deep.equal(obj)
  })

  it('should get a object item with getExpectedItem when none is set', ()=>{
    const obj = { key: 'value' };
    expect(handler.getExpectedItem(obj)).to.deep.equal(obj)
  })

  it('should throw an error if setObject is not given an object', () => {
    expect(() => handler.setObject('notAnObject')).to.throw('Expected value must be of type object!');
  })

  it('should throw an error if getObject is not given an object', () => {
    expect(() => handler.getObject('notAnObject')).to.throw('Expected value must be of type object!');
  })
  //#endregion

  //#region number
  it('should set and get a number', () => {
    handler.setNumber(42);
    expect(handler.getNumber(0)).to.equal(42);
  });
  
  it('should set and get a number with setItem', () => {
    handler.setItem(42);
    expect(handler.getNumber(0)).to.equal(42);
  });
  
  it('should set and get a number with getExpectedItem', () => {
    handler.setItem(42);
    expect(handler.getExpectedItem(0)).to.equal(42);
  });

  it('should return expected number if none is set', () => {
    expect(handler.getNumber(10)).to.equal(10);
  });

  it('should get a number item with getExpectedItem when none is set', ()=>{
    expect(handler.getExpectedItem(42)).to.equal(42)
  })

  it('should throw an error if getNumber is not given a number', () => {
    expect(() => handler.getNumber('notANumber')).to.throw('Expected value must be of type number!');
  });

  it('should throw an error if setNumber is not given a number', () => {
    expect(() => handler.setNumber('notANumber')).to.throw('Expected value must be of type number!');
  });
  //#endregion

  //#region boolean
  it('should set and get a boolean', () => {
    handler.setBoolean(true);
    expect(handler.getBoolean(false)).to.equal(true);
  });

  it('should set and get a boolean with setItem', () => {
    handler.setItem(true);
    expect(handler.getBoolean(false)).to.equal(true);
  });

  it('should set and get a boolean with getExpectedItem', () => {
    handler.setItem(true);
    expect(handler.getExpectedItem(false)).to.equal(true);
  });

  it('should return expected boolean if none is set', () => {
    expect(handler.getBoolean(true)).to.equal(true);
    expect(handler.getBoolean(false)).to.equal(false);
  });

  it('should return expected boolean if none is set with getExpectedItem', () => {
    expect(handler.getExpectedItem(true)).to.equal(true);
    expect(handler.getExpectedItem(false)).to.equal(false);
  });

  it('should throw an error if getBoolean is not given a boolean', () => {
    expect(() => handler.getBoolean('notABoolean')).to.throw('Expected value must be of type boolean!');
  });

  it('should throw an error if setBoolean is not given a boolean', () => {
    expect(() => handler.setBoolean('notABoolean')).to.throw('Expected value must be of type boolean!');
  });
  //#endregion

  //#region string
  it('should set and get a string', () => {
    handler.setString('hello');
    expect(handler.getString('default')).to.equal('hello');
  })
  
  it('should set and get a string with setItem', () => {
    handler.setItem('hello');
    expect(handler.getString('default')).to.equal('hello');
  })

  it('should set and get a string with getExpectedItem', () => {
    handler.setItem('hello');
    expect(handler.getExpectedItem('default')).to.equal('hello');
  })

  it('should set and get a string', () => {
    handler.setItem('hello');
    expect(handler.getString('default')).to.equal('hello');
  })

  it('should return expected string if none is set', () => {
    expect(handler.getString('default')).to.equal('default');
  })

  it('should return expected string if none is set with getExpectedItem', () => {
    expect(handler.getExpectedItem('default')).to.equal('default');
  })

  it('should throw an error if getString is not given a string', () => {
    expect(() => handler.getString(123)).to.throw('Expected value must be of type string!');
  })

  it('should throw an error if setString is not given a string', () => {
    expect(() => handler.setString(123)).to.throw('Expected value must be of type string!');
  })
  //#endregion
});
