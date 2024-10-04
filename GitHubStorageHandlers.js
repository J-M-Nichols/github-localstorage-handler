import GitHubStorageHandler from "./GitHubStorageHandler.js"

/**
 * A typical GitHubStorageHandlers attempts to solve the issue of using localStorage within multiple GitHub websites by handling multiple instances of GitHubStorageHandler.
 * 
 * Works great with React Context/Provider.
 */
export default class GitHubStorageHandlers {
    pathObjects=[]

    /**
     * Creates a new GitHubStorageHandlers with the GitHub pathname as a prefix to each path
     * @param  {...string} paths 
     */
    constructor(...paths){
        paths.forEach(path=>{
            const handler = new GitHubStorageHandler(path)
            this.pathObjects.push({
                handler,
                path,
            })
        })
    }

    /**
     * Gets a current or creates a new GitHubStorageHandler located at the path. 
     * @param {string} path 
     * @returns GitHubStorageHandler
     */
    getHandler = path => {
        let handler = this.pathObjects.find(pathObject => path === pathObject.path)?.handler;

        if(handler) {
            return handler
        }

        handler = new GitHubStorageHandler(path)
        
        this.pathObjects.push({
            handler,
            path
        })

        return handler
    }

    /**
     * Cears all paths tracked
     */
    clearAllPaths = () => {
        this.pathObjects.forEach(({handler})=>handler.clear())
    }

    /**
     * Clears the saved value from the given path
     * @param {string} path 
     */
    clearPath = (path) => {
        this.getHandler(path).clear()
    }

    //#region setters
    /**
     * Sets the item of localStorage at this path to value
     * @param {string} path 
     * @param {*} value 
     */
    setItem = (path, value) => {
        switch(typeof value){
            case "string":
                this.setString(path, value)
                break
            case "number":
                this.setNumber(path, value)
                break
            case "bigint":
                this.setBigInt(path, value)
                break
            case "boolean":
                this.setBoolean(path, value)
                break
            case "function":
                this.setFunction(path, value)
                break
            case "undefined":
                this.setUndefined(path, value)
                break
            case "symbol":
                this.setSymbol(path, value)
                break
            case "object":
                this.setObject(path, value)
                break
            default:
                throw new Error(`Type ${typeof value} is not covered. Convert to a string first.`)
        }
    }

    /**
     * Sets the item of localStorage at this path to the value
     * @param {string} path 
     * @param {string} value 
     */
    setString = (path, value) => {
        this.getHandler(path).setString(value)
    }

    /**
     * Sets the item of localStorage at this path to the value
     * @param {string} path 
     * @param {number} value 
     */
    setNumber = (path, value) => {
        this.getHandler(path).setNumber(value)
    }
    
    /**
     * Sets the item of localStorage at this path to the value
     * @param {string} path 
     * @param {bigint} value 
     */
    setBigInt = (path, value) => {
        this.getHandler(path).setBigInt(value)
    }

    /**
     * Sets the item of localStorage at this path to the value
     * @param {string} path 
     * @param {boolean} value 
     */
    setBoolean = (path, value) => {
        this.getHandler(path).setBoolean(value)
    }

    /**
     * Sets the item of localStorage at this path to the value
     * @param {string} path 
     * @param {function} value 
     */
    setFunction = (path, value) => {
        this.getHandler(path).setFunction(value)
    }

    /**
     * Sets the item of localStorage at this path to the value
     * @param {string} path 
     * @param {undefined} value 
     */
    setUndefined = (path, value) => {
        this.getHandler(path).setItem(value)
    }

    /**
     * Sets the item of localStorage at this path to the value
     * @param {string} path 
     * @param {symbol} value 
     */
    setSymbol = (path, value) => {
        this.getHandler(path).setSymbol(value)
    }

    /**
     * Sets the item of localStorage at this path to the stringified JSON value
     * @param {string} path 
     * @param {object} value 
     */
    setObject = (path, value) => {
        this.getHandler(path).setObject(value)
    }
    //#endregion

    //#region getters
    /**
     * Gets the item stored in localStorage at this path
     * @param {string} path 
     * @returns string || null
     */
    getItem = path => {
        return this.getHandler(path).getItem()
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {string} path 
     * @param {any} expected 
     * @returns any
     */
    getExpectedItem = (path, expected) => {
        switch(typeof expected){
            case "string":
                return this.getString(path, expected)
            case "number":
                return this.getNumber(path, expected)
            case "bigint":
                return this.getBigInt(path, expected)
            case "boolean":
                return this.getBoolean(path, expected)
            case "function":
                return this.getFunction(path, expected)
            case "symbol":
                return this.getSymbol(path, expected)
            case "object":
                return this.getObject(path, expected)
            default:
                return this.getItem(path) | expected
        }
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {string} path 
     * @param {bgint} expected 
     * @returns bigint
     */
    getBigInt = (path, expected) => {
        return this.getHandler(path).getBigInt(expected)
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {string} path 
     * @param {function} expected 
     * @returns function
     */
    getFunction = (path, expected) => {
        return this.getHandler(path).getFunction(expected)
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {string} path 
     * @param {symbol} expected 
     * @returns symbol
     */
    getSymbol = (path, expected) => {
        return this.getHandler(path).getSymbol(expected)
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {string} path 
     * @param {object} expected 
     * @returns object
     */
    getObject = (path, expected) => {
        return this.getHandler(path).getObject(expected)
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {string} path 
     * @param {number} expected 
     * @returns number
     */
    getNumber = (path, expected) => {
        return this.getHandler(path).getNumber(expected)
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {string} path 
     * @param {boolean} expected 
     * @returns boolean
     */
    getBoolean = (path, expected) => {
        return this.getHandler(path).getBoolean(expected)
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param {string} path 
     * @param {string} expected 
     * @returns string
     */
    getString = (path, expected) => {
        return this.getHandler(path).getString(expected)
    }   
    //#endregion 
}