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

  //#region paths
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

  it('should throw an error if getHandler is called with a non-string path', () => {
    expect(() => handlers.getHandler(123)).to.throw();
  })
  //#endregion

  //#region clear
  it('should clear the value from the path', ()=>{
    handlers.setNumber(testPath1, 42)
    expect(handlers.getNumber(testPath1, 0)).to.equal(42)

    handlers.clearPath(testPath1)
    expect(handlers.getItem(testPath1)).to.be.null
  })

  it('should clear the value from all paths', () => {
    handlers.setNumber(testPath1, 42)
    handlers.setBoolean(testPath2, true)
    expect(handlers.getNumber(testPath1, 0)).to.equal(42)
    expect(handlers.getBoolean(testPath2, false)).to.equal(true)

    handlers.clearAllPaths()
    expect(handlers.getItem(testPath1)).to.be.null
    expect(handlers.getItem(testPath2)).to.be.null
  })
  //#endregion

  //#region item
  it('should set and get a string item', () => {
    handlers.setItem(testPath1, 'testValue');
    expect(handlers.getItem(testPath1)).to.equal('testValue');
  });

  it('should set and get a string item with getExpectedItem', () => {
    handlers.setItem(testPath1, 'testValue');
    expect(handlers.getExpectedItem(testPath1, '')).to.equal('testValue');
  });

  it('should get a null item when none is set', () => {
    expect(handlers.getItem(testPath1)).to.be.null;
  });
  //#endregion

  //#region bigint
  it('should set and get a bigint', () => {
    handlers.setBigInt(testPath1, 42n)
    expect(handlers.getBigInt(testPath1, 0n)).to.equal(42n)
  })
  
  it('should set and get a bigint with setItem', () => {
    handlers.setItem(testPath1, 42n)
    expect(handlers.getBigInt(testPath1, 0n)).to.equal(42n)
  })
  
  it('should set and get a bigint with getExpectedItem', () => {
    handlers.setItem(testPath1, 42n)
    expect(handlers.getExpectedItem(testPath1, 0n)).to.equal(42n)
  })

  it('should return expected bigint if none is set', () => {
    expect(handlers.getBigInt(testPath1, 10n)).to.equal(10n)
  })

  it('should return expected bigint if none is set with getExpectedItem', () => {
    expect(handlers.getExpectedItem(testPath1, 10n)).to.equal(10n)
  })

  it('should throw an error if getBigInt is not given a bigint', () => {
    expect(() => handlers.getBigInt(testPath1, 'notANumber')).to.throw('Expected value must be of type bigint!');
  })

  it('should throw an error if setBigInt is not given a bigint', () => {
    expect(() => handlers.setBigInt(testPath1, 'notANumber')).to.throw('Expected value must be of type bigint!');
  })
  //#endregion

  //#region function
  it('should set and get a function', () => {
    const func = (a, b)=>{return a+b}
    handlers.setFunction(testPath1, func);
    expect(handlers.getFunction(testPath1, ()=>{})(5,7)).to.equal(func(5,7));
  })
  
  it('should set and get a function with setItem', () => {
    const func = (a, b)=>{return a+b}
    handlers.setItem(testPath1, func);
    expect(handlers.getFunction(testPath1, ()=>{})(5,7)).to.equal(func(5,7));
  })
  
  it('should set and get a function with getExpectedItem', () => {
    const func = (a, b)=>{return a+b}
    handlers.setItem(testPath1, func);
    expect(handlers.getExpectedItem(testPath1, ()=>{})(5,7)).to.equal(func(5,7));
  })

  it('should return expected function if none is set', () => {
    const func = (a, b)=>{return a+b}
    expect(handlers.getFunction(testPath1, func)(5,7)).to.equal(func(5,7));
  })

  it('should return expected function if none is set with getExpectedItem', () => {
    const func = (a, b)=>{return a+b}
    expect(handlers.getExpectedItem(testPath1, func)(5,7)).to.equal(func(5,7));
  })

  it('should throw an error if getFunction is not given a function', () => {
    expect(() => handlers.getFunction(testPath1, 'notANumber')).to.throw('Expected value must be of type function!');
  })

  it('should throw an error if setFunction is not given a function', () => {
    expect(() => handlers.setFunction(testPath1, 'notANumber')).to.throw('Expected value must be of type function!');
  })
  //#endregion

  //#region symbol
  it('should set and get a symbol', () => {
    const key = 'value'
    const sym = Symbol(key)
    handlers.setSymbol(testPath1, sym);
    expect(handlers.getSymbol(testPath1, Symbol('wrong key')).description).to.equal(key);
  })
  
  it('should set and get a symbol with setItem', () => {
    const key = 'value'
    const sym = Symbol(key)
    handlers.setItem(testPath1, sym);
    expect(handlers.getSymbol(testPath1, Symbol('wrong key')).description).to.equal(key);
  })
  
  it('should set and get a symbol with getExpectedItem', () => {
    const key = 'value'
    const sym = Symbol(key)
    handlers.setItem(testPath1, sym);
    expect(handlers.getExpectedItem(testPath1, Symbol('wrong key')).description).to.equal(key);
  })

  it('should return expected symbol if none is set', () => {
    const key = 'value'
    const sym = Symbol(key)
    expect(handlers.getSymbol(testPath1, sym).description).to.equal(key);
  })

  it('should return expected symbol if none is set with getExpectedItem', () => {
    const key = 'value'
    const sym = Symbol(key)
    expect(handlers.getExpectedItem(testPath1, sym).description).to.equal(key);
  })

  it('should throw an error if getSymbol is not given a symbol', () => {
    expect(() => handlers.getSymbol(testPath1, 'notANumber')).to.throw('Expected value must be of type symbol!');
  })

  it('should throw an error if setSymbol is not given a symbol', () => {
    expect(() => handlers.setSymbol(testPath1, 'notANumber')).to.throw('Expected value must be of type symbol!');
  })
  //#endregion

  //#region object
  it('should set and get an object', () => {
    const obj = { key: 'value' };
    handlers.setObject(testPath1, obj);
    expect(handlers.getObject(testPath1, {})).to.deep.equal(obj);
  });
  
  it('should set and get an object with setItem', () => {
    const obj = { key: 'value' };
    handlers.setItem(testPath1, obj);
    expect(handlers.getObject(testPath1, {})).to.deep.equal(obj);
  });
  
  it('should set and get an object with getExpectedItem', () => {
    const obj = { key: 'value' };
    handlers.setItem(testPath1, obj);
    expect(handlers.getExpectedItem(testPath1, {})).to.deep.equal(obj);
  });

  it('should return expected object if none is set', () => {
    const expected = { default: 'value' };
    expect(handlers.getObject(testPath1, expected)).to.deep.equal(expected);
  });

  it('should return expected object if none is set with getExpectedItem', () => {
    const expected = { default: 'value' };
    expect(handlers.getExpectedItem(testPath1, expected)).to.deep.equal(expected);
  });

  it('should throw an error if setObject is not given an object', () => {
    expect(() => handlers.setObject(testPath1, 'notAnObject')).to.throw('Expected value must be of type object!');
  });

  it('should throw an error if getObject is not given an object', () => {
    expect(() => handlers.getObject(testPath1, 'notAnObject')).to.throw('Expected value must be of type object!');
  });
  //#endregion

  //#region number
  it('should set and get a number', () => {
    handlers.setNumber(testPath1, 42);
    expect(handlers.getNumber(testPath1, 0)).to.equal(42);
  })
  
  it('should set and get a number with setItem', () => {
    handlers.setItem(testPath1, 42);
    expect(handlers.getNumber(testPath1, 0)).to.equal(42);
  })
  
  it('should set and get a number with getExpectedItem', () => {
    handlers.setItem(testPath1, 42);
    expect(handlers.getExpectedItem(testPath1, 0)).to.equal(42);
  })

  it('should return expected number if none is set', () => {
    expect(handlers.getNumber(testPath1, 10)).to.equal(10);
  })

  it('should return expected number if none is set with getExpectedItem', () => {
    expect(handlers.getExpectedItem(testPath1, 10)).to.equal(10);
  })

  it('should throw an error if getNumber is not given a number', () => {
    expect(() => handlers.getNumber(testPath1, 'notANumber')).to.throw('Expected value must be of type number!');
  })

  it('should throw an error if setNumber is not given a number', () => {
    expect(() => handlers.setNumber(testPath1, 'notANumber')).to.throw('Expected value must be of type number!');
  })
  //#endregion

  //#region boolean
  it('should set and get a boolean', () => {
    handlers.setBoolean(testPath1, true);
    expect(handlers.getBoolean(testPath1, false)).to.equal(true);
  })
  
  it('should set and get a boolean with setItem', () => {
    handlers.setItem(testPath1, true);
    expect(handlers.getBoolean(testPath1, false)).to.equal(true);
  })
  
  it('should set and get a boolean with getExpectedItem', () => {
    handlers.setItem(testPath1, true);
    expect(handlers.getExpectedItem(testPath1, false)).to.equal(true);
  })

  it('should return expected boolean if none is set', () => {
    expect(handlers.getBoolean(testPath1, true)).to.equal(true);
  })

  it('should return expected boolean if none is set with getExpectedItem', () => {
    expect(handlers.getExpectedItem(testPath1, true)).to.equal(true);
  })

  it('should throw an error if getBoolean is not given a boolean', () => {
    expect(() => handlers.getBoolean(testPath1, 'notABoolean')).to.throw('Expected value must be of type boolean!');
  })

  it('should throw an error if setBoolean is not given a boolean', () => {
    expect(() => handlers.setBoolean(testPath1, 'notABoolean')).to.throw('Expected value must be of type boolean!');
  })
  //#endregion

  //#region string
  it('should set and get a string item with setItem', () => {
    handlers.setItem(testPath1, 'testValue');
    expect(handlers.getString(testPath1, '')).to.equal('testValue');
  })

  it('should set and get a string', () => {
    handlers.setString(testPath1, 'hello');
    expect(handlers.getString(testPath1, 'default')).to.equal('hello');
  })

  it('should set and get a string with getExpectedItem', () => {
    handlers.setItem(testPath1, 'hello');
    expect(handlers.getExpectedItem(testPath1, 'default')).to.equal('hello');
  })

  it('should return expected string if none is set', () => {
    expect(handlers.getString(testPath1, 'default')).to.equal('default');
  })

  it('should return expected string if none is set with getExpectedItem', () => {
    expect(handlers.getExpectedItem(testPath1, 'default')).to.equal('default');
  })
  
  it('should throw an error if getString is not given a string', function() {
    expect(() => handlers.getString(testPath1, 123)).to.throw('Expected value must be of type string!');
  });

  it('should throw an error if setString is not given a string', function() {
    expect(() => handlers.setString(testPath1, 123)).to.throw('Expected value must be of type string!');
  });
  //#endregion
})
