/**
 * A typical GitHubStorageHandler attempts to solve the issue of using localStorage within multiple GitHub websites.
 * 
 * Works great with Redux slice.
 */
export default class GitHubStorageHandler {
    path
    basePath

    /**
     * Creates a new GitHubStorageHandler with the GitHub pathname as a prefix to path. 
     * @param {string} path 
     */
    constructor(path){
        if(typeof path !== 'string') throw new Error('The path must be of type string!')
        const storagePrefix = window.location.pathname
        this.path=`${storagePrefix}/${path}`
        this.basePath = path
    }

    /**
     * Clears the saved value in localStorage at this path
     */
    clear = () => {
        localStorage.removeItem(this.path)
    }

    //#region setters
    /**
     * Sets the item of localStorage at this path to value
     * @param {*} value 
     */
    setItem = value => {
        switch(typeof value){
            case "string":
                this.setString(value)
                break
            case "number":
                this.setNumber(value)
                break
            case "bigint":
                this.setBigInt(value)
                break
            case "boolean":
                this.setBoolean(value)
                break
            case "function":
                this.setFunction(value)
                break
            case "undefined":
                this.setToPath(value)
                break
            case "symbol":
                this.setSymbol(value)
                break
            case "object":
                this.setObject(value)
                break
            default:
                throw new Error(`Type ${typeof value} is not covered. Convert to a string first.`)
        }
    }

    /**
     * Sets the item of localStorage at this path to the value
     * @param {string} value 
     */
    setString = value => {
        if(typeof value !== 'string') throw new Error('Expected value must be of type string!')
        localStorage.setItem(this.path, value)
    }

    /**
     * Sets the item of localStorage at this path to the value
     * @param {number} value 
     */
    setNumber = value => {
        if(typeof value !== 'number') throw new Error('Expected value must be of type number!')
        localStorage.setItem(this.path, value)
    }

    /**
     * Sets the item of localStorage at this path to the value
     * @param {bigint} value 
     */
    setBigInt = value => {
        if(typeof value !== 'bigint') throw new Error('Expected value must be of type bigint!')
        localStorage.setItem(this.path, value)
    }

    /**
     * Sets the item of localStorage at this path to the value
     * @param {boolean} value 
     */
    setBoolean = value => {
        if(typeof value !== 'boolean') throw new Error('Expected value must be of type boolean!')
        localStorage.setItem(this.path, value)
    }

    /**
     * Sets the item of localStorage at this path to the value
     * @param {function} value 
     */
    setFunction = value => {
        if(typeof value !== 'function') throw new Error('Expected value must be of type function!')
        localStorage.setItem(this.path, String(value))
    }

    /**
     * Sets the item of localStorage at this path to the value
     * @param {string} value 
     */
    setString = value => {
        if(typeof value !== 'string') throw new Error('Expected value must be of type string!')
        localStorage.setItem(this.path, value)
    }

    /**
     * Sets the item of localStorage at this path to the value
     * @param {symbol} value 
     */
    setSymbol = value => {
        if(typeof value !== 'symbol') throw new Error('Expected value must be of type symbol!')
        localStorage.setItem(this.path, value.description)
    }

    /**
     * Sets the item of localStorage at this path to the stringified JSON value
     * @param {object} value 
     */
    setObject = value => {
        if(typeof value !== 'object') throw new Error('Expected value must be of type object!')
        localStorage.setItem(this.path, JSON.stringify(value))
    }
    //#endregion

    //#region getters
    /**
     *  Gets the item stored in localStorage at this path
     * @returns string || null
     */
    getItem = _ => {
        return localStorage.getItem(this.path)
    }

    /**
     *  Gets the item stored in localStorage at this path
     * @param {any} expected 
     * @returns any
     */
    getExpectedItem = expected => {
        switch(typeof expected){
            case "string":
                return this.getString(expected)
            case "number":
                return this.getNumber(expected)
            case "bigint":
                return this.getBigInt(expected)
            case "boolean":
                return this.getBoolean(expected)
            case "function":
                return this.getFunction(expected)
            case "symbol":
                return this.getSymbol(expected)
            case "object":
                return this.getObject(expected)
            default:
                return this.getItem() | expected
        }
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {symbol} expected 
     * @returns symbol
     */
    getSymbol = expected => {
        if(typeof expected !== 'symbol') throw new Error('Expected value must be of type symbol!')
        const val = this.getItem()
        return val? Symbol(val) : expected
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {function} expected 
     * @returns function
     */
    getFunction = expected => {
        if(typeof expected !== 'function') throw new Error('Expected value must be of type function!')
        const val = this.getItem()
        return val? eval(val) : expected
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {bigint} expected 
     * @returns bigint
     */
    getBigInt = expected => {
        if(typeof expected !== 'bigint') throw new Error('Expected value must be of type bigint!')
        const val = this.getItem()
        return val? BigInt(val) : expected
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {object} expected 
     * @returns object
     */
    getObject = expected => {
        if(typeof expected !== 'object') throw new Error('Expected value must be of type object!')
        const val = this.getItem()
        return val ? JSON.parse(val) : expected
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {number} expected 
     * @returns number
     */
    getNumber = expected => {
        if(typeof expected !== 'number') throw new Error('Expected value must be of type number!')
        const val = this.getItem()
        return val ? Number(val) : expected
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {boolean} expected 
     * @returns boolean
     */
    getBoolean = expected => {
        if(typeof expected !== 'boolean') throw new Error('Expected value must be of type boolean!')
        const val = this.getItem()
        return val ? val==='true' : expected
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {string} expected 
     * @returns string
     */
    getString = expected => {
        if(typeof expected !== 'string') throw new Error('Expected value must be of type string!')
        return this.getItem() || expected
    }
    //#endregion
}